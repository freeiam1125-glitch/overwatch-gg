/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          purple:  '#7C3AED',
          cyan:    '#06B6D4',
          pink:    '#EC4899',
          bg:      '#080810',
          surface: '#0D0D1A',
          card:    '#12121F',
          border:  '#1E1E35',
          muted:   '#6B7280',
          text:    '#C4C4D4',
        }
      },
    },
  },
  plugins: [],
}

