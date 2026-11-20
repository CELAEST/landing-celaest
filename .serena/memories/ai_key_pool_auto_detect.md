# AI Key Pool & Provider Auto-Identification Contract

## Architecture
- **Single Source of Truth**: Supabase PostgreSQL `ai_providers` table (`id, organization_id, name, type, api_key, base_url, is_active, rate_limit, metadata, created_at, updated_at`).
- **celaest-back (`internal/ai/`)**:
  - `POST /api/v1/org/ai/pool/keys/identify`: Detects provider via `DetectKeyPrefix` (`gsk_`, `AIza`, `sk-ant-`, `xai-`, `sk-or-`, `sk-proj-`, ambiguous `sk-`) and probes lightweight `/models` or `/key` endpoints live (`LiveKeyDetector`) with zero inference token cost.
  - `POST /api/v1/org/ai/pool/keys` and `PUT /api/v1/org/ai/pool/keys/:id`: Auto-corrects mismatched prefixes, disambiguates `sk-` keys when `provider="auto"` or blank, defaults `Name` cleanly, optionally rejects bad keys (`422 INVALID_API_KEY`) when `verify=true`, persists to `ai_providers`, and syncs to `celaest-core`.
  - `GetPoolKeys`: Prioritizes DB rows from `ai_providers` (with safe 8-char prefix `COALESCE(LEFT(api_key, 8), '')`) so Dashboard CRUD UUIDs remain authoritative while enriching runtime usage from `celaest-core`.
- **celaest-english-back (`internal/shared/cloudpool/`)**:
  - `cloudpool.Init(db)` loads active keys from Supabase `ai_providers` (with 60s in-memory TTL cache + per-key 45s rate-limit / 5m auth cooldowns + env fallback).
  - Consumed directly by `internal/aigateway/service.go` (`executeServerCloudPool`), `internal/shared/llmcache/direct_cloud.go`, and `internal/interview/service.go` (`TranscribeAudio`), returning `layer: "cloud-pool:<provider>"` without Render-to-Render Cloudflare 429 hops.
- **celaest-dashboard (`src/features/ai/`)**:
  - `AIKeyModal.tsx` + `detectApiKeyProvider.ts`: Auto-detects key prefix on paste, auto-triggers debounced `/pool/keys/identify` live probe, shows verified model availability + latency, and passes `verify: true`.
