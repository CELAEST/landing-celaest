import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#050505',
          deep: '#020202',
          gray: '#0a0a0a',
          surface: '#09090b',
          'surface-alt': '#080808',
          slate: '#1a1a1a',
          'slate-medium': '#333333',
          'slate-light': '#888888',
          muted: '#71717a',
          accent: '#a1a1aa',
          subtle: '#8b8b98',
          neon: '#22d3ee',
          'neon-blue': '#38bdf8',
          emerald: '#10b981',
          ice: '#f8fafc',
          soft: '#e2e8f0',
          'soft-dim': '#e4e4e7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', '"Geist Sans"', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', '"Geist Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [],
};
export default config;
