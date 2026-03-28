/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#15919B',
        'primary-dark': '#00666e',
        secondary: '#ADD8DC',
        surface: '#F6FAFA',
        'surface-card': '#FFFFFF',
        'text-main': '#181C1D',
        info: '#7FA5A8',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
