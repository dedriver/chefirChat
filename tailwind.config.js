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
      }
    },
  },
  plugins: [],
}
