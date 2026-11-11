import type { Config } from 'tailwindcss';

// Tokens from the Tally Connect app's default "Aurora" look
// (prototype app_styles.css .ps-aurora / lib/core/design/tc_palette.dart).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        acc: { DEFAULT: '#8C1D3F', 2: '#A42A52', 3: '#6E1531' },
        navy: { DEFAULT: '#1B2D5B', 2: '#2A4584', 3: '#172A55' },
        ink: { DEFAULT: '#0E1B33', 2: '#3F4B68', 3: '#58647F' },
        pos: '#0F7B55',
        neg: '#B4233F',
        warn: '#A5470E',
        mist: '#E9EDF7',
      },
      fontFamily: {
        sans: ['Figtree', '-apple-system', 'system-ui', 'sans-serif'],
      },
      borderRadius: { glass: '22px', hero: '26px' },
      boxShadow: {
        glass:
          'inset 0 1px 0 rgba(255,255,255,.95), inset 0 -1px 0 rgba(27,45,91,.05), 0 14px 34px -16px rgba(27,45,91,.24), 0 2px 6px rgba(27,45,91,.05)',
        btnp: 'inset 0 1px 0 rgba(255,255,255,.28), 0 14px 26px -12px rgba(23,42,85,.7)',
        btna: 'inset 0 1px 0 rgba(255,255,255,.28), 0 14px 26px -12px rgba(110,21,49,.65)',
      },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
} satisfies Config;
