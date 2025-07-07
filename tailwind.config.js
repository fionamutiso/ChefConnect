/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        brand: {
          DEFAULT: "#0F5742",
          light: "#e6f4f1",
          dark: "#08432f",
        },
        'orange': {
          DEFAULT: '#FF7A1A',
          '50': '#FFEFE6',
          '100': '#FFEFE6',
          '200': '#FFD4B3',
          '300': '#FFB980',
          '400': '#FF9D4D',
          '500': '#FF7A1A',
          '600': '#E65C00',
          '700': '#B34700',
          '800': '#803300',
          '900': '#4D1F00',
          'light': '#FFEFE6',
          'dark': '#B34700',
        },
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
} 