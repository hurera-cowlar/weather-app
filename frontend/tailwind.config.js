/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryRed: '#eb0914',
        secondaryRed: '#c11119',
        backgroundBlack: 'rgba(0,0,0,.93)'
      }
    }
  },
  plugins: [],
  darkMode: 'false' // Disable dark mode
}
