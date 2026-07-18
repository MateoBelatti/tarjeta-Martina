/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lila': '#C4B5E0',
      },
      fontFamily: {
        'serif': ['"EB Garamond"', 'serif'],
        'display': ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
