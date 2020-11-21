// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  purge: ['./pages/**/*.vue', './components/**/*.vue', './layouts/**/*.vue'],
  important: true,
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
