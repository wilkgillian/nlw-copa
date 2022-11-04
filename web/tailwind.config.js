/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      }
    },
    backgroundImage: {
      app: 'url(/BG-effects.png)'
    },
    colors: {
      gray: {
        100: '#E1E1E6',
        300: '#E1E1E6',
        600: '#323238',
        800: '#202024',
        900: '#121214'
      },
      white: '#FFFFFF',
      yellow: {
        700: '#E5CD3D',
        900: '#F7DD43'
      },
      green: '#129E57'
    }
  },
  plugins: []
};
