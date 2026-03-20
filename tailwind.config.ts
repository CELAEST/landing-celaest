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
          gray: '#0a0a0a',
          slate: '#1a1a1a',
          'slate-medium': '#333333',
          'slate-light': '#888888',
          neon: '#22d3ee', // Cyan
          'neon-blue': '#38bdf8', // Light Blue
          ice: '#f8fafc',
          soft: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['"Geist Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [],
};
export default config;
