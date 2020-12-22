const consola = require('consola')
const algoliasearch = require('algoliasearch')

export default function algoliaModule(moduleOptions = {}) {
  this.options.nuxtAlgolia = this.options.nuxtAlgolia || {}
  const config = {
    hook: 'generate:done',
    ...this.options.nuxtAlgolia,
    ...moduleOptions,
  }

  if (!config.appId || !config.apiKey) {
    consola.error(
      new Error('appId and apiKey are required for nuxt-algolia module')
    )
    return
  }

  this.nuxt.hook(config.hook, async (nuxt) => {
    const { $content } = require('@nuxt/content')
    for (let i = 0; i < config.paths.length; i++) {
      const path = config.paths[i]
      const indexName = path.index || path.name
      let docs = await $content(path.name).fetch()

      docs = docs.map((doc) => {
        const newDoc = {}
        path.fields.forEach((field) => (newDoc[field] = doc[field]))
        newDoc.objectID = doc.slug
        return newDoc
      })

      const client = algoliasearch(config.appId, config.apiKey)
      const index = client.initIndex(indexName)

      const { objectIDs } = await index.saveObjects(docs)
      consola.success(
        `Indexed ${objectIDs.length} records in Algolia for: ${indexName}`
      )
    }
  })
}