import config from '../config/app'
let posts = []

const constructFeedItem = (post, dir, hostname) => {
  const url = `${hostname}/${dir}/${post.slug}`
  return {
    title: post.title,
    id: url,
    link: url,
    description: post.description,
    content: post.bodyPlainText,
  }
}

const create = async (feed, args) => {
  const [filePath, ext] = args
  const hostname = config.url
  feed.options = {
    title: 'danielkelly.io blog',
    description: 'A web development blog about Vue, Nuxt, Laravel, and more!',
    link: `${hostname}/feed.${ext}`,
  }
  const { $content } = require('@nuxt/content')
  if (posts === null || posts.length === 0)
    posts = await $content(filePath).fetch()

  for (const post of posts) {
    const feedItem = await constructFeedItem(post, filePath, hostname)
    feed.addItem(feedItem)
  }
  return feed
}

export default [
  {
    path: '/feed.xml',
    create,
    cacheTime: 1000 * 60 * 15,
    type: 'rss2',
    data: ['blog', 'xml'],
  },
]
