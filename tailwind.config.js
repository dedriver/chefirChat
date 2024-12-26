/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fone: '#0f0f0f',
        castomGray : '#272727',
        castomGrayHover : '#3d3d3d',
      }, keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', visibility: 'visible' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', visibility: 'visible' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideInRight: 'slideInRight 1s both',
        slideInLeft: 'slideInLeft 1s both',
      },
    },
  },
  plugins: [],
}
