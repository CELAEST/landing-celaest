# Lingua Frontend Port Configuration Standard

## Context
Landing (`landing-celaest`) runs on Next.js default port `3000` (`http://localhost:3000`).
To allow running and developing both Landing and Lingua (`celaest-english-front`) simultaneously without port collisions:

## Contract
- **Lingua Dev Server**: Configured to port `3001` (`http://localhost:3001`) by default in `vite.config.ts`, with fallback support for `process.env.PORT`.
- **Lingua Preview Server**: Configured to port `3001` (`preview.port: Number(process.env.PORT) || 3001`).
- **Smoke Tests**: `scripts/e2e_live_smoke.mjs` targets `process.env.FRONTEND_URL || 'http://localhost:3001'`.
- **Landing Port**: Retains port `3000` without conflict.
