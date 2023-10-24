/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    zIndex: {
      'chat' : 1,
      'chatbutton' : 10,
      'overlay' : 800,
      'header' : 1000
    },
    extend: {},
  },
  plugins: [],
}

