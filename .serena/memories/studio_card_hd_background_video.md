# Studio Card HD Background Video & Frosted Play Icon (Hover-to-Play)

Implemented across `celaest-back` and `celaest-dashboard` so Studio 3D cards (both Marketplace and My Assets) display **only the clean centered frosted Play icon** at `50% / 50%` over the hero artwork and trigger silent crisp **HD background video playback on hover** behind `.sb4-hero-scrim`.

## Backend Contract (`celaest-back`)
- `internal/products/model.go`: Added `ProductYouTubeVideoID *string` (`json:"product_youtube_video_id,omitempty"`) on `CustomerAsset`.
- `internal/products/repository_assets.go`: Selected `p.youtube_video_id` across `GetCustomerAssets` (direct purchases and subscription plan grants branches), `GetCustomerAsset`, and `GetAssetByID`.
- Verified via `repository_regression_test.go` (`TestGetCustomerAssets_SelectsAndMapsYouTubeVideoID`, `TestGetCustomerAsset_SelectsAndMapsYouTubeVideoID`).

## Frontend Studio Card Architecture (`celaest-dashboard`)
- `src/features/shared/utils/youtube.ts`: `youtubeMaxResThumbnail` (`1280x720`), `youtubeBackgroundEmbedUrl` (`autoplay=1&mute=1&controls=0&vq=hd1080&enablejsapi=1&loop=1&playlist=ID`), and `isDirectVideoUrl` (`.mp4/.webm/.mov/.m4v/.ogv` or `data:video/`).
- `src/features/marketplace/components/studio-card/HeroBackgroundVideo.tsx`:
  - Accepts `active?: boolean` from hover state (`StudioCardShell` and `ProductCard`).
  - Does NOT mount YouTube iframes or play videos at rest; warms preconnect & mounts lazily on first hover (`hasActivated`), keeps element warm, plays when hovered (`is-ready` once buffered/`playerState === 1`), and immediately pauses + cross-fades out (`opacity: 0`) back to crisp studio artwork on mouse leave.
  - Uses `1280x720` virtual viewport scaled cleanly (`1.15x` overscan inside `overflow: hidden`) so YouTube ABR negotiates HD 720p/1080p and player chrome stays outside bounds.
- `StudioCardShell.tsx` & `StudioCatalogCard.css`:
  - Pure circular frosted obsidian Play icon `.sb-play-orb` (`48x48px`) centered at `top: 50%; left: 50%; transform: translate(-50%, -50%)` with zero visible `"Demo"` text label badge (`aria-label` preserves accessibility/test semantics).
- **Important Deployment Reminder**: `celaest-dashboard` is deployed manually to Cloudflare Workers via `npm run build` (`./out`) + `npx wrangler deploy` (using default Wrangler OAuth session, NOT GitHub push auto-deploy).
