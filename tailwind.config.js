// tailwind.config.js
module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
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
  purge: {
    content: [
      './pages/**/*.vue',
      './components/**/*.vue',
      './layouts/**/*.vue',
    ],
    options: {
      whitelist: [
        'text-blue-800',
        'text-red-800',
        'text-yellow-800',
        'text-green-800',
        'text-indigo-800',
        'text-purple-800',
        'text-pink-800',
        'text-gray-800',

        'text-blue-600',
        'text-red-600',
        'text-yellow-600',
        'text-green-600',
        'text-indigo-600',
        'text-purple-600',
        'text-pink-600',
        'text-gray-600',

        'bg-blue-100',
        'bg-red-100',
        'bg-yellow-100',
        'bg-green-100',
        'bg-indigo-100',
        'bg-purple-100',
        'bg-pink-100',
        'bg-gray-100',

        'border-blue-200',
        'border-red-200',
        'border-yellow-200',
        'border-green-200',
        'border-indigo-200',
        'border-purple-200',
        'border-pink-200',
        'border-gray-200',
      ],
    },
  },
  important: true,
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
