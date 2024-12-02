const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        light: {
          background: '#f8fafc',
          text: '#1f2937',
        },
        dark: {
          background: '#1f2937',
          text: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
};
