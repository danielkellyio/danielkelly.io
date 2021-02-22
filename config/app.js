export default {
  name: 'danielkelly.io',
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://danielkelly.io'
      : 'http://localhost:3000',
}
