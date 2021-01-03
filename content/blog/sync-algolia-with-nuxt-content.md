---
title: Build a Nuxt Module to Sync Algolia with Nuxt Content
description: Automatically sync content stored in your project with nuxt content to an Algolia index. This allows you to manage your content in your repo while providing powerful search capabilities to your site users.
publishDate: 2021-01-02 12:00:00
github: null
tags:
- Vue
- Javascript
- Nuxt
---

## TLDR
I published the results of this tutorial to npm as a package. If you're looking to just grab and go, you can [install the module via npm](https://www.npmjs.com/package/nuxt-content-algolia). Note this package only handles syncing the data to Algolia, it does nothing about rendering a search UI for your Nuxt website. You can read more about implementing the UI in [Algolia's official docs for Vue Instant Search](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/vue/)

## Why Sync Content to Algolia?
Using Nuxt as a static site generator is a great developer experience and makes for a fast site. Storing the content in static files alone however doesn't make search simple. Algolia not only makes search simple (can start out with simple text search) but scales tremendously with the ability to provide all kind of filtering and weights to your search data. You can read more about the features of Algolia [here](https://www.algolia.com/products/search/).

## Creating the Module
In order to sync our content to Algolia, we're going to be building a Nuxt module. According to [Nuxt's official docs](https://nuxtjs.org/docs/2.x/directory-structure/modules/) "modules can easily register hooks for certain entry points..." and that's exactly what we want to do. We want to hook into the generation process and at the end of it read our content and insert it into Algolia via the [Algolia Javascript SDK](https://www.npmjs.com/package/algoliasearch). 

### Module "interface"
We will interact with the module by configuring it in nuxt.config.js
```javascript
// nuxt.config.js
export default{
  buildModules: [
    '~/modules/nuxt-content-algolia',
    // ...
  ],
  nuxtContentAlgolia: {
    appId: process.env.ALGOLIA_APP_ID,
    // !IMPORTANT secret key should always be an environment variable
    // this is not your search only key but the key that grants access to modify the index
    apiKey: process.env.ALGOLIA_API_KEY,

    // relative to content directory
    // each path get's its own index
    paths: [
      {
        name: 'blog',
        // optional (will use name if index not specified)
        index: process.env.ALGOLIA_INDEX || 'blog',
        fields: ['title', 'description', 'bodyPlainText', 'tags'],
      },
    ],
  },
}
```

### Accepting module options
Our actual module can live in a file at `modules/nuxt-content-algolia` (notice this is where we told nuxt config to look for the "build module"). First thing we should do in our file is to allow our module to accept the configuration options from the nuxt.config.js and merge those options with the some defaults.
```javascript
// modules/nuxt-content-algolia

export default function algoliaModule(moduleOptions = {}) {
    this.options.nuxtAlgolia = this.options.nuxtContentAlgolia || {}
    const config = {
        hook: 'generate:done',
        ...this.options.nuxtAlgolia,
        ...moduleOptions,
    }
}
```

### Require Algolia app id and api key
The Algolia SDK requires us to provide an app id and a secret api key to interact with it. If those aren't provided we might as well not even attempt to sync things to algolia, so let's check for those up front. If they don't exist we'll report an error to the console and return from the module to let the build continue on its merry way.
```javascript
const consola = require('consola')
export default function algoliaModule(moduleOptions = {}) {
    // config...
    if (!config.appId || !config.apiKey) {
      consola.error(
        new Error('appId and apiKey are required for nuxt-algolia module')
      )
      return
    }
}
```

### Hook into Nuxt after generate
Nuxt provides several hooks to execute code at different times during the generate process. [See all of the generate hooks on Nuxt's website](https://nuxtjs.org/docs/2.x/internals-glossary/internals-generator/). I've made the hook configurable from the options with `generate:done` as the default. This works great for SSG but wanted to leave it customizable as I'm not as familiar with actually running Nuxt on a server.

```javascript
export default function algoliaModule(moduleOptions = {}) {
    // config...
    // requirements...
  
    // config.hook references the default "generate:done"
    this.nuxt.hook(config.hook, async (nuxt) => {
      // ... where the magic happens
    })
}
```

### Read content and sync to Algolia
```javascript
this.nuxt.hook(config.hook, async (nuxt) => {
  // require the nuxt content function
  const { $content } = require(`${nuxt.options.srcDir}/node_modules/@nuxt/content`)
  
  // loop through paths provided at config
  for (let i = 0; i < config.paths.length; i++) {
    const path = config.paths[i]
    const indexName = path.index || path.name
    
    // get the content from the file system
    let docs = await $content(path.name).fetch()

    // transform each "document" to only include the fields specified in the config 
    docs = docs.map((doc) => {
      const newDoc = {}
      path.fields.forEach((field) => (newDoc[field] = doc[field]))
      newDoc.objectID = doc.slug
      return newDoc
    })

    // initialize the algolia search package with our app info and index name
    const client = algoliasearch(config.appId, config.apiKey)
    const index = client.initIndex(indexName)

    // clear the index in case any documents were removed
    index.clearObjects()
    
    // Finally save the new documents and output a success message
    const { objectIDs } = await index.saveObjects(docs)
    consola.success(
      `Indexed ${objectIDs.length} records in Algolia for: ${indexName}`
    )
  }
})
```

## Conclusion
Nuxt modules are super powerful tools that allow you to hook into many different points of the Nuxt lifecycle. Nuxt modules provide the perfect avenue for taking content stored with Nuxt content in your file system and mirroring that content in a powerful search index like Algolia.

If you're interested in taking the next step with Nuxt + Algolia and actually implementing the search UI, [sign up for the newsletter](#newsletter) and so you don't miss the next post!
