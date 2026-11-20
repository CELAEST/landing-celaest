# Lingua Groq-Only Enforcement & Onboarding/Auth Loop Elimination

## Commits & Deploys
- Backend (`celaest-english-back`): `03f5823`
- Frontend (`celaest-english-front`): `80b8af9`

## Architecture Invariants
1. **Groq-Only UI & Runtime Pool Default**:
   - `celaest-english-back/internal/settings/handler.go`: `providerCatalog` returns ONLY `groq` (`status: "active"`), exposing verified Groq models (`openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.8-27b`, `meta-llama/llama-4-scout-17b-16e-instruct`).
   - `celaest-english-front` exposes ONLY Groq in:
     - `src/features/settings/hooks/useAiProviders.ts` & `src/features/settings/components/SettingsAiProvidersSection.tsx`
     - `src/features/onboarding/hooks/useApiKeySetup.ts`, `OnboardingProviderGrid.tsx`, & `OnboardingApiKeyStep.tsx`
     - `src/features/workspace/components/LinguaByokRequiredModal.tsx`
     - `src/features/lab/components/AiInfrastructureRecoveryModal.tsx` & `AiEngineErrorsLuxuryStudio.tsx`
     - `src/shared/constants/errorScenarios.ts`, `src/shared/services/aiErrorClassifier.ts`, `src/features/pathway/services/PathwayQAService.ts`
   - `providerKeyVault.ts` (`CLOUD_BYOK_PROVIDERS = ["groq"]`): `hasAnyConfiguredKey()` requires Groq only; `resolveConfiguredProvider()` checks Groq keys first. `useAiProviders` saves to local encrypted vault directly without triggering remote auth rejections when configuring/activating Groq.

2. **Elimination of AI 401 Logout & Login <-> Level Picker Infinite Loop**:
   - **No AI 401 Ejection**: `aiErrorClassifier.ts` never classifies `AiInfrastructureError` / provider-sourced 401 errors as `jwt-expired-mid-interview` (`re-auth`), avoiding `celaest:unauthorized` logout triggers on key errors.
   - **Durable Onboarding State Across Passive Token Expiry**: `SupabaseAuthAdapter.clearDeadToken()` passes `{ preserveOnboarding: true }` to `StorageLifecycleService.purgeOnLogout()`, keeping `lingua_onboarding_completed_*` intact when a JWT passively expires (explicit `logout()` still clears everything cleanly).
   - **Backend Auto-Heal for Returning Beginners**: `celaest-english-back/internal/settings/repository.go` heals `onboarding_completed = true` on `GetByUserID` for returning users with calibrated `CEFRLevel != "B1"` as well as custom `Profession`.
   - **AuthCallback & Login Progress Preservation**: `AuthCallbackView.tsx` and `OnboardingView.tsx` recognize `profileHasProgress` (`onboardingCompleted || cefrLevel !== "B1" || custom profession`), and `AuthCallbackView` never deletes local per-user completion when `profile === null` (offline/timeout).
   - **Zero Loop on "Volver" in Onboarding**: `useOnboardingFlow.ts` (`prevStep`) never sends an already-authenticated user back to `step = "auth"` from `beginner-check` or `api-key`; `OnboardingView.tsx` omits `onPrev` on `beginner-check` for authenticated Cloud-entitled users (`isAuth && isCloudEntitled`).
