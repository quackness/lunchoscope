/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/restaurant/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },

  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    utils: true
  }

}

