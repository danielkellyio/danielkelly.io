// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#77a7dc',
          200: '#5d9ade',
          300: '#3f8bde',
          400: '#277fde',
          500: 'var(--blue)',
          600: '#0846be',
          700: '#062e81',
          800: '#02194c',
          900: '#02194C',
        },
        pink: {
          100: '#ffa6ed',
          200: '#ff86e6',
          300: '#ff5dde',
          400: '#fa3ed4',
          500: 'var(--pink)',
          600: '#ff20d2',
          700: '#fd01ca',
          800: '#fd016b',
          900: '#fd0154',
        },
      },
    },
  },
  purge: ['./pages/**/*.vue', './components/**/*.vue', './layouts/**/*.vue'],
  important: true,
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
