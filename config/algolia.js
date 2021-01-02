export default {
  index: process.env.ALGOLIA_INDEX || 'blog',
  appId: process.env.ALGOLIA_APP_ID,
  searchOnlyApiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY,
}
