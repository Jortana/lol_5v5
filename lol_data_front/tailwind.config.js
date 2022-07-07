/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bright-text': '#fef5e0',
        subtext: '#7e807d'
      }
    }
  },
  plugins: [require('tailwind-gradient-mask-image'), require('daisyui')]
}
