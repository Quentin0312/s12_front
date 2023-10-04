/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    zIndex: {
      'overlay' : 800,
      'header' : 1000
    },
    extend: {},
  },
  plugins: [],
}

