/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0f141f',
          DEFAULT: '#161a25',
          light: '#2a3143',
        },
        accent: {
          DEFAULT: '#d97706',
          hover: '#b45309',
          light: '#fbbf24',
        },
        surface: '#1f2430',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in-fast': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
