import feed from './support/feed'
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    bodyAttrs: {
      class: 'overflow-x-hidden',
    },
    title: 'DanielKelly.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;300;700&display=swap" rel="stylesheet',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/style.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/Components'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '~/modules/algolia',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@aceforth/nuxt-netlify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/feed-module
    '@nuxtjs/feed',
  ],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    algoliaAppId: process.env.ALGOLIA_APP_ID,
  },
  privateRuntimeConfig: {
    algoliaApiKey: process.env.ALGOLIA_API_KEY,
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},
  feed,
  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        document.bodyPlainText = document.text
      }
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      config.node = config.node || {}
      config.node.fs = 'empty'
    },
  },
  fontawesome: {
    icons: {
      solid: ['faNewspaper', 'faHome'],
      brands: ['faGithub', 'faTwitter', 'faFacebookF', 'faLinkedinIn'],
    },
  },
  netlify: {
    mergeSecurityHeaders: true,
    redirects: [
      {
        from: '*',
        to: '404.html',
        status: 404,
      },
    ],
  },
  nuxtAlgolia: {
    appId: 'LK1CX5PNTW',
    apiKey: '1cfc88c8fd1851d5abda71e136e94ccf',
    paths: [
      {
        name: 'blog',
        fields: ['title', 'description', 'bodyPlainText', 'tags'],
      },
    ],
  },
}
