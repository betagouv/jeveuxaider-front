export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jeveuxaider-front',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.js',
    '~/plugins/heroicons.js',
    { src: '@/plugins/v-click-outside', ssr: false },
    '~/plugins/vue-filters.js'
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
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  privateRuntimeConfig: {
    axios: {
      baseURL: `${process.env.API_URL}/api`
    }
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: `${process.env.API_URL}/api`
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
