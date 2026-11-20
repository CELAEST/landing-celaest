# Session Persistence & Cross-App Auth Architecture

## Core Invariants
1. **Never Share Single-Use `refresh_token` Cross-App (`celaest-dashboard` -> `lingua`)**:
   - `celaest-dashboard/src/features/marketplace/utils/saasLauncher.ts` (`buildSaasLaunchUrl`, `launchSaasProduct`) passes ONLY `#access_token=...` to `lingua.celaest.com/auth/callback`.
   - Sharing Supabase's single-use `refresh_token` across separate browser origins causes reuse-detection revocation (`SIGNED_OUT` family invalidation) in both apps whenever either app rotates its token.
2. **Single-Flight 401 Recovery Before Logout**:
   - **Dashboard**: `celaest-dashboard/src/features/auth/lib/sessionRefresh.ts` (`recoverDashboardSession`) + `src/lib/api-client.ts` coalesce concurrent 401s into a single Supabase `refreshSession()` / `/api/v1/auth/refresh` attempt and retry the request once with the fresh Bearer token. Transient network/5xx errors return `transient_error` and preserve local sessions.
   - **Lingua**: `celaest-english-front/src/infrastructure/adapters/auth/SupabaseAuthAdapter.ts` preserves `lingua_refresh_token` + `lingua_auth_user` when `access_token` expires, deduplicates concurrent `refresh()` calls, supports both Supabase browser `refreshSession()` and backend `/auth/refresh`, and refreshes proactively on `visibilitychange`/`focus` within 5m of expiry. Both `HttpClient.ts` and `coreAiGatewayClient.ts` perform preflight/single-flight refresh+retry before emitting `celaest:unauthorized`.
3. **Session-Scoped Logout Isolation (`celaest-back` + Lingua)**:
   - Passive `celaest:unauthorized` in `celaest-english-front/src/routes/AppRoutes.tsx` ONLY clears dead local tokens (`clearDeadToken()`), NEVER calling `POST /auth/logout`.
   - `celaest-back/internal/auth/{middleware.go,handler.go,service.go}` cryptographically verifies JWT signatures on `/logout` via `jwt.WithoutClaimsValidation()` and calls `InvalidateSessionByID(ctx, userID, sessionID)` when `session_id`/`jti` is present so logging out of one app does not evict sibling sessions across Dashboard/Lingua, while `InvalidateSession(userID)` remains intact for account-wide password resets and `EmergencyLockout`.
