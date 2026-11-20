# Hero Editorial Cinema Stage + Cloudflare Worker HTTP 206 Streaming Standard

## Design & Architecture
- **Minimalist Editorial Integration (zero SaaS pill clutter)**:
  - `HeroIntentCopy.tsx` + `es.json` / `en.json`: Compact <=3-line hero descriptions (`115` chars ES, `114` chars EN) keeping `.intent-cta` (`CÓMO FUNCIONA` / `HOW IT WORKS`) clear above the mountain ridge; elevated `.intent-copy` to `z-index: 12` globally and across `1480px`/`760px` media queries so `.intent-robot-hitbox` (`z-index: 11`) never intercepts CTA clicks on mobile.
  - `HeroCinemaStage.tsx` + `hero-cinema.css` (MUST be imported directly in `HeroCinemaStage.tsx` so `next build` emits styles into CSS chunks):
    - **Desktop (`>= 768px`)**: Borderless `16:9` `<video>` inside `.intent-hero.is-cinema` (`z-index: 45`), custom `2px` violet hairline scrubber + minimal `Play/Pause`, `Mute`, `Fullscreen` HUD strictly below the video frame (zero native grey browser bar over subtitles), single hairline circular `(X) VOLVER` control matching Hero grammar. Clicking backdrop or pressing `Esc` returns smoothly.
    - **Mobile (`< 768px`)**: Pure `#020206/96` backdrop-blurred full-screen overlay (`z-index: 75`), single circular `44px` `X` close button in safe-area top-right, centered edge-to-edge `16:9` `<video controls playsInline>`, zero extra cards/chapters/text blocks.
  - `useHeroCinema.ts`: Syncs `isMobile` (`max-width: 767px`) for native mobile `controls` vs custom desktop hairline HUD, keyboard shortcuts (`Esc`, `Space`, `m`, `f`), `IntersectionObserver` desktop scroll pause, and synchronous `play()` inside click handler.

## Cloudflare Workers Static Assets HTTP 206 Range Fix
- Cloudflare Workers `env.ASSETS.fetch()` omits `Accept-Ranges: bytes` / `206 Partial Content` on `.mp4` assets, breaking Safari/iOS playback and instant scrubbing.
- `wrangler.jsonc`: `run_worker_first` excludes static images/JS/data/robot assets (`!/data/*`, `!/_next/static/*`, `!/images/*`, `!/robot_hero_*/*`) while keeping `/*` (including `/videos/*`) routed through `worker.js`.
- `worker.js`: `serveRangeAwareVideo` + `parseByteRange` + zero-copy `sliceByteStream` (`TransformStream`) slices exact byte ranges for `/videos/*`, returning `206 Partial Content`, `Content-Range`, `Accept-Ranges: bytes`, `Vary: Range`, and `416` on invalid ranges (`__tests__/worker-range.test.ts`).

## Production Verification (`https://celaest.com`, Worker Version `2cdc735b-8ea0-4a98-9adc-fa4081e4f6b2`)
- `curl -r 0-1023`: `206 Partial Content`, `Content-Range: bytes 0-1023/7112877`, `Accept-Ranges: bytes`.
- Playwright Live Perf (`1440x900` cold/warm, `1366x768`, `390x844`, `/es` & `/en`): `CLS: 0`, `TTFB` `85-95ms` warm (`290ms` cold), `FCP` `356-680ms`, `LCP` `356-728ms` ES, `510-539 KB` initial transfer, `0` MP4 requests prior to CTA click, scrubbing verified (`25.37-25.87s` via HTTP `206`), `0` console/HTTP/page errors.
