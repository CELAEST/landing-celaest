# AI Resilient Pool, Low-Effort Cascade & Use-Case Modals Standard

## Backend (`celaest-english-back`, commit `094a28d`)
1. **CloudPool Round-Robin & Per-Model/NotFound Isolation** (`internal/shared/cloudpool/pool.go`):
   - `RotatedKeysByProvider` / `RotatedKeysFor` distribute requests across all active PostgreSQL `ai_providers` keys via atomic round-robin counters (preserving deterministic `KeysByProvider` for legacy callers/tests).
   - `MarkModelRateLimited` applies <=15s per `(key, model)` cooldowns on HTTP 429 (parsing `Retry-After`) so hitting RPM/TPM on one model never locks healthy sibling models or sibling keys.
   - `MarkModelNotFound` suppresses HTTP 404 `model_not_found` for 10m.
   - `DefaultProviderModels["groq"]` order: `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.8-27b`, `meta-llama/llama-4-scout-17b-16e-instruct`, `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`.

2. **Direct Multi-Provider Cascade & Groq Token Optimization** (`internal/shared/llmcache/direct_cloud.go`, `internal/aigateway/byok_direct.go`, `service.go`):
   - Both Cloud Pool and BYOK pass `"reasoning_effort": "low"` for Groq `gpt-oss-*` models (~15x fewer reasoning tokens, avoiding TPM exhaustion on 8k TPM quotas) and strip `<think>...</think>` blocks on Qwen/reasoning outputs.
   - Added Anthropic (`x-api-key`) alongside OpenAI-compatible & Gemini cascades, plus a 1.2s burst-recovery second pass when keys hit simultaneous 429s before bubbling an error.
   - `llmcache.PostWithStatus` prioritizes `TryDirectChatOrBYOK` before falling back to `celaest-core.onrender.com`, avoiding Render-to-Render Cloudflare 429s.

3. **Unified Routing Across Endpoints**:
   - `internal/reading/service.go` (`GenerateArticle`, `GenerateQuiz`) and `internal/reading/translator_api.go` (`translateViaCoreAI`, `translateViaCoreLLMContextual`) now route through `s.llmCache.PostWithStatus` / `llmcache.TryDirectCloudChat` with 45s reading timeout instead of hitting `celaest-core` directly.
   - `internal/interview/service.go` (`GenerateQuestions`) prioritizes `s.llmCache.PostWithStatus` (using DB pool) before `os.Getenv("GROQ_API_KEY")`.

## Frontend (`celaest-english-front`, commit `29d6693`)
1. **Preserve Real Status/Code Semantics & Increase Timeout** (`src/features/reading/services/aiReadingArticleGenerator.ts`, `src/features/settings/services/directClientAiService.ts`):
   - Increased Reading timeout from `15000ms` -> `45000ms`; stopped rewriting `429` (`RATE_LIMIT_COOLDOWN`) and `504` into `503 CLUSTER_OUTAGE`.
   - Added `"reasoning_effort": "low"` on Groq `gpt-oss-*` and `qwen/qwen3.8-27b` + `meta-llama/llama-4-scout-17b-16e-instruct` in `GROQ_CANDIDATE_MODELS`.

2. **Customer-Safe Use-Case Modals & Silent Burst Retry** (`src/shared/services/aiUseCaseModalResolver.ts`, `src/shared/hooks/useAiUseCaseModals.ts`, `AiInfrastructureRecoveryModal.tsx`, `LinguaByokRequiredModal.tsx`):
   - `useAiUseCaseModals` performs 1 silent `1200ms` retry (20s debounce) for `cloudManaged` transient bursts before displaying any modal.
   - When `cloudManaged=true` (`aiCloudIncluded && !isByokMode`), `AiInfrastructureRecoveryModal` enters CELAEST Cloud automatic countdown/reconnect mode instead of telling paying subscribers to paste a Groq BYOK key (BYOK remains collapsed/optional).
   - Monthly limit errors (`AI_QUOTA_EXCEEDED` / `MONTHLY_QUOTA_EXCEEDED` / `quotaExhausted`) open `LinguaByokRequiredModal` in `mode="quota_exceeded"` offering plan upgrade or optional BYOK.
