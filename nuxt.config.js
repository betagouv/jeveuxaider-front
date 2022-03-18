import axios from 'axios'
import FlareWebpackPluginSourcemap from '@flareapp/flare-webpack-plugin-sourcemap'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Devenez bénévole dans une association en quelques clics | JeVeuxAider.gouv.fr',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Trouvez une mission de bénévolat dans une association, organisation publique ou une commune, partout en France, sur le terrain ou à distance. 50 000 places disponibles dans 10 domaines d'action : solidarité, insertion, éducation, environnement, santé, sport, culture ..." },
      { name: 'format-detection', content: 'telephone=no' },
      process.env.API_URL !== 'https://www.jeveuxaider.gouv.fr'
        ? { name: 'robots', content: 'noindex' }
        : {}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'preconnect',
        href: 'https://gqlg3qh7po-dsn.algolia.net',
        crossorigin: 'anonymous'
      },
      {
        rel: 'preconnect',
        href: 'https://static.axept.io',
        crossorigin: 'anonymous'
      },
      {
        rel: 'preconnect',
        href: 'https://client.axept.io',
        crossorigin: 'anonymous'
      },
      {
        rel: 'preconnect',
        href: 'https://client.crisp.chat',
        crossorigin: 'anonymous'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/labels.js',
    '~/plugins/axios.js',
    '~/plugins/heroicons.js',
    '~/plugins/axeptio.client.js',
    '~/plugins/userback.client.js',
    '~/plugins/atinternet.client.js',
    '~/plugins/flare.client.js',
    '~/plugins/yup.js',
    '~/plugins/vue-filters.js',
    { src: '~/plugins/vue-libraries.js', mode: 'client' },
    '~/plugins/numeral.js',
    '~/plugins/marked.js',
    '~/plugins/api-algolia.js',
    '~/plugins/plausible.client.js',
    '~/plugins/apiengagement.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components/base' }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/redirect-module',
    '@nuxtjs/sitemap',
    '@nuxtjs/strapi',
    '@nuxtjs/dayjs',
    'nuxt-lazy-load',
    'vue-scrollto/nuxt',
    'cookie-universal-nuxt',
    'vue-toastification/nuxt',
    'portal-vue/nuxt',
    '@nuxtjs/gtm'
  ],

  privateRuntimeConfig: {
    axios: {
      baseURL: `${process.env.API_URL}/api`
    }
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    appUrl: process.env.APP_URL,
    app: {
    },
    axios: {
      browserBaseURL: `${process.env.API_URL}/api`
    },
    oauth: {
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET
    },
    strapi: {
      url: `${process.env.STRAPI_URL}`,
      token: process.env.STRAPI_TOKEN
    },
    blog: {
      restApiUrl: process.env.BLOG_REST_API_URL,
      url: process.env.BLOG_URL
    },
    google: {
      places: process.env.GOOGLE_PLACE_API_KEY
    },
    apiEngagement: {
      key: process.env.APIENG_KEY,
      tracking_key: process.env.APIENG_TRACKING_KEY
    },
    plausible: {
      site_id: process.env.PLAUSIBLE_SITE_ID,
      token: process.env.PLAUSIBLE_TOKEN
    },
    algolia: {
      termsIndex: process.env.ALGOLIA_TERMS_INDEX
    },
    flare: {
      projectKey: process.env.FLARE_KEY
    }
  },

  env: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      searchKey: process.env.ALGOLIA_SEARCH_KEY,
      missionsIndex: process.env.ALGOLIA_MISSIONS_INDEX
    }
  },

  router: {
    middleware: 'maintenance'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'tailwindcss/nesting': {}
      }
    },
    transpile: ['vue-instantsearch', 'instantsearch.js/es', 'numeral'],
    plugins: [
      new FlareWebpackPluginSourcemap({ key: process.env.FLARE_KEY })
    ]
  },

  redirect: [
    { from: '^/register/volontaire(.*)$', to: '/inscription/benevole$1', statusCode: 301 },
    { from: '^/register/responsable(.*)$', to: '/inscription/responsable$1', statusCode: 301 },
    { from: '^/user/settings', to: '/profile/settings', statusCode: 301 },
    { from: '^/user/(.*)$', to: '/profile', statusCode: 301 },
    { from: '^/dashboard/structures', to: '/admin/organisations', statusCode: 301 },
    { from: '^/dashboard/structure/(.*)$', to: '/admin/organisations/$1', statusCode: 301 },
    { from: '^/dashboard/mission/(.*)$', to: '/admin/missions/$1', statusCode: 301 },
    { from: '^/dashboard/participation/(.*)$', to: '/admin/participations', statusCode: 301 },
    { from: '^/dashboard/profiles', to: '/admin/utilisateurs', statusCode: 301 },
    { from: '^/dashboard/profile/(.*)$', to: '/admin/utilisateurs/$1', statusCode: 301 },
    { from: '^/dashboard/reseaux/(.*)$', to: '/admin/contenus/reseaux/$1', statusCode: 301 },
    { from: '^/dashboard/(.*)$', to: '/admin/$1', statusCode: 301 }
  ],

  // Plugins config
  dayjs: {
    locales: ['fr'],
    defaultLocale: 'fr',
    plugins: [
      'relativeTime',
      'customParseFormat'
    ]
  },

  toast: {
    timeout: 5000,
    draggable: true
  },

  gtm: {
    id: 'GTM-5S3DCV6',
    enabled: true
  },

  sitemap: () => {
    return {
      hostname: 'https://www.jeveuxaider.gouv.fr',
      gzip: true,
      exclude: ['/**'],
      routes: async () => {
        const { data } = await axios.get(`${process.env.API_URL}/api/sitemap`)
        return data
      }
    }
  }
}
