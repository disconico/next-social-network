/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  plugins: [require('flowbite/plugin'), require('preline/plugin')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      backgroundImage: {
        'bg-light': 'url(/assets/svg/bg-light.svg)',
        'bg-dark': 'url(/assets/svg/bg-dark.svg)',
      },
      fontFamily: {
        neon: ['neon', 'sans-serif'],
        bungee: ['bungee', 'sans-serif'],
        nabla: ['nabla', 'sans-serif'],
      },
      animation: {
        text: 'text 10s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
};
