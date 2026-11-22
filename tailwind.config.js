/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#E91E63', // Primary pink
          600: '#C2185B', // Secondary dark pink
          700: '#9C1147',
          800: '#831843',
          900: '#500724',
        },
        surface: {
          light: '#F8F8FA',
          card: '#FFFFFF',
          dark: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'float': '0 10px 25px -3px rgba(233, 30, 99, 0.18)',
      }
    },
  },
  plugins: [],
};
