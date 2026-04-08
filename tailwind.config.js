/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#2e2e2e',
          200: '#272727',
          300: '#222222',
          400: '#1e1e1e',
          500: '#1a1a1a',
          600: '#161616',
        },
        accent: {
          green: '#4ade80',
          'green-dim': '#22c55e',
          'green-dark': '#16a34a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'glow': '0 0 20px rgba(74,222,128,0.2)',
      },
    },
  },
  plugins: [],
}
