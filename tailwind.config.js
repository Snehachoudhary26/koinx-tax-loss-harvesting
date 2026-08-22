/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B132B',
          cardDark: '#0D172A',
          cardBlue: '#0052FF',
          cardBlueLight: '#0062FF',
          accentGreen: '#00C076',
          accentRed: '#FF4D4F',
          muted: '#8A99AD',
          borderDark: '#1E293B',
          bgMain: '#F8FAFC',
        }
      }
    },
  },
  plugins: [],
}
