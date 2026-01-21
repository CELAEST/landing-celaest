# Celeast Landing Page - Next.js 15

Modern, SEO-optimized landing page built with Next.js 15, featuring:

- ⚡ **Next.js 15** with App Router and Turbopack
- 🌐 **Internationalization** (i18n) with next-intl (English/Spanish)
- 🎨 **Tailwind CSS** with custom design system
- 📱 **Fully Responsive** design
- 🚀 **Static Site Generation (SSG)** for optimal performance
- 🖼️ **Optimized Images** with next/image
- ♿ **Accessibility** best practices
- 🔍 **SEO Optimized** with proper metadata

## Quick Start

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   └── [locale]/          # Internationalized routes
│       ├── layout.tsx     # Root layout with fonts & metadata
│       └── page.tsx       # Landing page
├── components/
│   ├── landing/           # Landing page sections
│   │   ├── navigation.tsx
│   │   ├── hero-section.tsx
│   │   ├── products-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── reviews-section.tsx
│   │   ├── about-section.tsx
│   │   ├── faq-section.tsx
│   │   └── footer.tsx
│   └── ui/                # Reusable UI components
│       ├── button.tsx
│       └── logo.tsx
├── hooks/
│   └── use-scroll-reveal.ts
├── i18n/
│   ├── config.ts          # Locale configuration
│   ├── request.ts         # next-intl setup
│   └── messages/          # Translation files
│       ├── en.json
│       └── es.json
├── lib/
│   └── utils.ts           # Utility functions (cn)
├── styles/
│   └── globals.css        # Global styles & Tailwind
└── middleware.ts          # i18n routing middleware
```

## Design System

### Colors (Midnight Emerald & Slate)
- `brand-deep`: #0F172A (Deep Charcoal)
- `brand-mint`: #10B981 (Cyber Mint)
- `brand-mint-dark`: #059669
- `brand-ice`: #F8FAFC (Ice White)
- `brand-soft`: #E2E8F0

### Fonts
- **Inter** - Body text
- **Space Grotesk** - Display/Logo

## Key Features

### Static Site Generation
All pages are pre-rendered at build time for instant loading:

```typescript
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
```

### Scroll Animations
Custom hook for performant scroll-based animations using IntersectionObserver:

```typescript
const { ref, isVisible } = useScrollReveal();
```

### Internationalization
Full i18n support with URL-based routing:
- `/en` - English
- `/es` - Spanish

## Performance Optimizations

1. **Font Optimization**: Using `next/font` for zero layout shift
2. **Image Optimization**: `next/image` with lazy loading
3. **CSS Optimization**: Tailwind with purging unused styles
4. **Preconnect**: DNS prefetch for external resources
5. **Static Generation**: Pre-rendered HTML for all pages

## Adding a New Language

1. Add locale to `src/i18n/config.ts`:
```typescript
export const locales = ['en', 'es', 'fr'] as const;
```

2. Create translation file `src/i18n/messages/fr.json`

3. Update middleware matcher if needed

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Static Export
```bash
npm run build
# Output in .next/standalone or configure for static export
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## License

MIT
