/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FEF5EA',
        ink: '#333333',
      },
      fontFamily: {
        serif: ['Apple Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};