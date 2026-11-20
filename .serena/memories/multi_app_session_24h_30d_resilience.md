# Multi-App Session Persistence (24h Access Token + 30-Day Rolling Refresh Token)

## Root Causes Solved
1. **Short 1-Hour Access Tokens & Fake/Missing Refresh Tokens (`celaest-back/internal/auth/handler.go`, `recovery_otp.go`)**:
   - Previously, `POST /api/v1/auth/login` returned Supabase's raw 1-hour (`3600s`) `access_token`, while `POST /api/v1/auth/otp/verify` (`IssueSessionToken`) generated a random 24-byte `refresh_token` that was never stored in PostgreSQL or memory and always failed with `401 INVALID_REFRESH_TOKEN` on `POST /api/v1/auth/refresh`.
   - Furthermore, Dashboard SSO handoff (`saasLauncher.ts` -> `/auth/callback#access_token=...`) passed only `access_token` without a `refresh_token`, so Lingua set `lingua_refresh_token = access_token`, causing `hasRecoverableRefreshSource()` to return `false` and logging the user out as soon as the 1h token expired.

2. **Cross-App Session Eviction Between Dashboard and Lingua (`useAuthSession.ts`, `useAuthActions.ts`, `AuthCallbackView.tsx`, `SupabaseAuthAdapter.ts`)**:
   - Supabase's single-use refresh tokens and `@supabase/supabase-js` background refresh caused rotating a token in Lingua to trigger `onAuthStateChange("SIGNED_OUT", null)` in Dashboard (and vice versa), which wiped Dashboard's Zustand store (`syncSession(null)`).
   - Both apps called `supabase.auth.signOut()` with default `{ scope: "global" }`, revoking all sessions across both apps.

## Enterprise Architecture Implemented
1. **24-Hour Access Token (`86400s`) + 30-Day Persisted Rolling Refresh Token (`crt_...`)**:
   - `celaest-back` persists refresh tokens in PostgreSQL table `auth_refresh_tokens` (and `memRefreshStore` fallback) for **30 days** (`30 * 24 * time.Hour`), issuing **24-hour (`86400s`) HS256 `access_token`s** on both `/api/v1/auth/login` and `/api/v1/auth/otp/verify`.
   - `POST /api/v1/auth/refresh` (`RefreshSession`) supports:
     - Non-destructive rolling 30-day refresh on `crt_...` / registered refresh tokens (concurrent refreshes from Dashboard and Lingua never invalidate each other).
     - Cryptographically verified JWT exchange (`sso:<jwt>` or signed JWT within a 7-day grace window), minting a fresh 24-hour `access_token` + 30-day `crt_...` `refresh_token`.
     - Supabase `RefreshToken` fallback upgraded into a 24h CELAEST session.
   - Password reset (`ConfirmPasswordReset`) and emergency lockout (`ExecuteEmergencyLockout`) revoke all `auth_refresh_tokens` for the user.
2. **Cross-App Isolation**:
   - `AuthCallbackView.tsx` assigns `sso:<access_token>` as `lingua_refresh_token` when only `#access_token` is provided via Dashboard SSO and skips `supabase.auth.setSession` on `sso:` tokens.
   - `useAuthSession.ts` in `celaest-dashboard` preserves active unexpired sessions in `celaest-auth-storage` when Supabase emits background `SIGNED_OUT` events, and proactively refreshes within 15 minutes of expiry on tab focus/visibility.
   - Both `celaest-dashboard` and `celaest-english-front` use `supabase.auth.signOut({ scope: "local" })`.
