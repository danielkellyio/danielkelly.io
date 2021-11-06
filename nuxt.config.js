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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/style.css', 'instantsearch.css/themes/algolia-min.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/Components', '~/plugins/Algolia.client'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [{ path: '~/components/global', global: true }],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    'nuxt-content-algolia',
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
    // https://cloudinary.nuxtjs.org/
    '@nuxtjs/cloudinary',
  ],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    algolia: require('./config/algolia').default,
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
      solid: [
        'faNewspaper',
        'faHome',
        'faSearch',
        'faTags',
        'faBars',
        'faComment',
        'faChalkboardTeacher',
      ],
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
  nuxtContentAlgolia: {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    paths: [
      {
        name: 'blog',
        index: process.env.ALGOLIA_INDEX || 'blog',
        fields: ['title', 'description', 'bodyPlainText', 'tags'],
      },
    ],
  },
  cloudinary: require('./config/cloudinary.private'),
}
