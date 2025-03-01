/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0000DA',
        'light-gray': '#D9D9D9',
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        gengboy: ["Gengboy", "sans-serif"],
      }
    },
  },
  plugins: [],
}

