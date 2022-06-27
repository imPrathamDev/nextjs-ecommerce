/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Montserrat': ['"Montserrat"','sans-erif'],
        'Cinzel': ['"Cinzel"', 'serif'],
      },
      colors: {
        'primary': '#B09B71',
        'primary-dark': '#87805E',
        'primary-semi-light': '#D8CCA3',
        'primary-light': '#EDDFB3',
        'primary-white': '#FAFAFA',
        'primary-black': '#212121',
      },
    },
  },
  plugins: [],
}
