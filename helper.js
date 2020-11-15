export const prettyDate = (date) => {
  return new Date(date)
    .toDateString()
    .split(' ')
    .filter((part, index) => index !== 0)
    .map((part, index) => (index === 1 ? `${part},` : part))
    .join(' ')
    .trim()
}
