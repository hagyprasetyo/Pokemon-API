/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        yellow: {
          500: '#ecc94b',
        },
        gray: {
          200: '#e2e8f0',
          800: '#2d3748',
          600: '#718096',
        },
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

