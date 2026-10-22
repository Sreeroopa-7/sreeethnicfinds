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
          50: '#FFF5F7',
          100: '#FFE6EC',
          200: '#FCD5DE',
          300: '#F7ADC0',
          400: '#EE7B99',
          500: '#D94B73',
          600: '#B82E56',
          700: '#961E42',
          800: '#751734',
          900: '#561026',
        },
        cream: {
          50: '#FFFEFA',
          100: '#FFFDF6',
          200: '#FBF7EE',
          300: '#F5EFE0',
          400: '#EAE1CC',
          500: '#DDD1B5',
        },
        rose: {
          tint: '#FDE8ED',
          dust: '#E8B4B8',
          accent: '#C75B7A',
          deep: '#892B42',
        },
        sand: {
          DEFAULT: '#F5EBE0',
          dark: '#D5BDAF',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(220, 150, 165, 0.12)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px rgba(238, 123, 153, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
