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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/heroicons.js',
    '~/plugins/yup.js',
    '~/plugins/vue-filters.js',
    { src: '~/plugins/vue-libraries.js', mode: 'client' },
    '@/plugins/numeral.js'
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
    '@nuxtjs/dayjs',
    'nuxt-lazy-load',
    'vue-scrollto/nuxt',
    'cookie-universal-nuxt',
    'vue-toastification/nuxt'
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
      modeLight: process.env.MODE_LIGHT
    },
    axios: {
      browserBaseURL: `${process.env.API_URL}/api`
    },
    oauth: {
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET
    },
    blog: {
      restApiUrl: process.env.BLOG_REST_API_URL,
      url: process.env.BLOG_URL
    },
    google: {
      places: process.env.GOOGLE_PLACE_API_KEY
    },
    franceConnect: process.env.FRANCE_CONNECT,
    apiEngagement: {
      key: process.env.APIENG_KEY,
      tracking_key: process.env.APIENG_TRACKING_KEY
    }
  },

  env: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      searchKey: process.env.ALGOLIA_SEARCH_KEY,
      missionsIndex: process.env.ALGOLIA_MISSIONS_INDEX,
      skillsIndex: process.env.ALGOLIA_SKILLS_INDEX
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'tailwindcss/nesting': {}
      }
    },
    transpile: ['vue-instantsearch', 'instantsearch.js/es', 'numeral']
  },

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
  }
}
