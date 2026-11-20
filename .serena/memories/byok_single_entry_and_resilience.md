# BYOK Single-Entry Modal Coordination & Provider Resilience

- Root cause of double API key prompt on `/` / `/pathway` for promo/coupon users (`isByokMode === true`):
  `WorkspaceDashboardView` and child `PathwayStudioView` both independently mounted `LinguaByokRequiredModal` portals on `isByokMode && !hasAnyConfiguredKey()`. Saving the key closed only the top portal, leaving the second portal stacked directly behind it.
- Contract enforced:
  1. When `activeTab === "pathway"` or `"settings"`, `WorkspaceDashboardView` defers BYOK prompting cleanly so only `PathwayStudioView`'s `AiUseCaseModalsHost` (tied to `hasBlockingOverlay` so Liam waits while the modal is open) renders.
  2. `providerKeyVault` emits `PROVIDER_KEYS_CHANGED_EVENT` (`src/shared/constants/storageEvents.ts` — kept in a leaf constants module so partial `vi.mock(..., providerKeyVault)` in unit tests remain intact) on save/add/remove/migrate; both `useAiUseCaseModals` and `WorkspaceDashboardView` subscribe to close automatically on external key saves.
  3. `LinguaByokRequiredModal` auto-aligns provider on unambiguous key prefixes (`gsk_` -> `groq`, `AIza` -> `gemini`).
  4. `providerConnectivity.ts` uses `?key=` on Gemini `/models` discovery fallback; `directClientAiService.ts` cascades Gemini 404/429/503 to `gemini-2.5-flash` / `gemini-2.0-flash` / `gemini-1.5-flash` and sets Groq short-prompt min tokens to 1024 so reasoning models finish in 1 request.
