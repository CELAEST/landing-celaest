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
        // Design System: Midnight Emerald & Slate
        brand: {
          deep: '#0F172A',      // Deep Charcoal - backgrounds
          slate: '#334155',     // Slate Grey
          'slate-medium': '#475569',
          'slate-light': '#64748B',
          mint: '#10B981',      // Cyber Mint - primary accent
          'mint-dark': '#059669',
          ice: '#F8FAFC',       // Ice White
          soft: '#E2E8F0',      // Soft White
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' },
        },
      },
      backgroundImage: {
        'gradient-mint': 'linear-gradient(to right, #10B981, #059669)',
        'gradient-dark': 'linear-gradient(to bottom, #0F172A, #1E293B)',
      },
    },
  },
  plugins: [],
};

export default config;
