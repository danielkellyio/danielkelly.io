export default {
  name: 'danielkelly.io',
  url:
    process.NODE_ENV === 'production'
      ? 'https://danielkelly.io'
      : 'http://localhost:3000',
}
