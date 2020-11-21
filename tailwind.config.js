// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  purge: ['./pages/**/*.vue', './components/**/*.vue', './layouts/**/*.vue'],
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
