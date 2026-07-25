/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goride: {
          blue: '#1E3A8A',
          light: '#E0F2FE',
          dark: '#0F172A'
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
