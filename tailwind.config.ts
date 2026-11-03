import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#06090F',
          900: '#0B101B',
          850: '#101726',
          800: '#151E32',
          700: '#1F2C47',
        },
        telemetry: {
          cyan: '#00E5FF',
          emerald: '#10B981',
          amber: '#F59E0B',
          crimson: '#EF4444',
        },
      },
      backgroundImage: {
        'grid-tactical':
          'linear-gradient(to right, rgba(30, 41, 59, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 41, 59, 0.35) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
