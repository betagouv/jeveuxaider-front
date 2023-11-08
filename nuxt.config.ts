import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
import flareSourcemapUploader from '@flareapp/vite-plugin-sourcemap-uploader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    // enabled: true,
    // timeline: {
    //   enabled: true,
    // },
  },

  // experimental: {
  //   emitRouteChunkError: 'automatic',
  // },

  runtimeConfig: {
    strapi: {
      // on server
      token: process.env.STRAPI_TOKEN,
      url: process.env.STRAPI_URL,
    },

    public: {
      apiUrl: process.env.API_URL,
      appUrl: process.env.APP_URL,
      oauth: {
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
      },
      strapi: {
        // on client
        token: process.env.STRAPI_TOKEN,
        url: process.env.STRAPI_URL,
      },
      blog: {
        restApiUrl: process.env.BLOG_REST_API_URL,
        url: process.env.BLOG_URL,
      },
      google: {
        places: process.env.GOOGLE_PLACE_API_KEY,
      },
      gtm: {
        id: process.env.GTM_ID,
      },
      ai: {
        missionModerationUrl: process.env.API_AI_MISSION_MODERATION_URL,
        organisationModerationUrl: process.env.API_AI_ORGANISATION_MODERATION_URL,
      },
      apiEngagement: {
        key: process.env.APIENG_KEY,
        tracking_key: process.env.APIENG_TRACKING_KEY,
      },
      plausible: {
        site_id: process.env.PLAUSIBLE_SITE_ID,
        shared_link: process.env.PLAUSIBLE_SHARED_LINK,
        token: process.env.PLAUSIBLE_TOKEN,
      },
      algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        searchKey: process.env.ALGOLIA_SEARCH_KEY,
        termsIndex: process.env.ALGOLIA_TERMS_INDEX,
        missionsIndex: process.env.ALGOLIA_MISSIONS_INDEX,
        organisationsIndex: process.env.ALGOLIA_ORGANISATIONS_INDEX,
      },
      flare: {
        projectKey: process.env.FLARE_KEY,
      },
      usetiful: {
        enabled: process.env.USETIFUL_ENABLED,
        token: process.env.USETIFUL_TOKEN,
      },
      emailable: {
        enabled: process.env.EMAILABLE_ENABLED,
      },
    },
  },

  app: {
    head: {
      title: 'Devenez bénévole dans une association en quelques clics | JeVeuxAider.gouv.fr',
      htmlAttrs: {
        lang: 'fr',
      },
      bodyAttrs: {
        class: 'text-base leading-normal overflow-x-hidden',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'og:site_name', content: 'JeVeuxAider.gouv.fr' },
        { name: 'alternateName', content: 'JVA' },
        {
          hid: 'description',
          name: 'description',
          content:
            "Trouvez une mission de bénévolat dans une association, organisation publique ou une collectivité territoriale, sur le terrain ou à distance. Plus de 15 000 missions disponibles partout en France dans 10 domaines d'action : solidarité, insertion, éducation, environnement, santé, sport, culture ...",
        },
        { name: 'format-detection', content: 'telephone=no' },
        process.env.API_URL !== 'https://www.jeveuxaider.gouv.fr'
          ? { name: 'robots', content: 'noindex' }
          : {},
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        {
          rel: 'sitemap',
          type: 'application/xml',
          title: 'Sitemap',
          href: 'https://www.jeveuxaider.gouv.fr/sitemap.xml',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/strapi',
    'dayjs-nuxt',
    'floating-vue/nuxt',
    'nuxt-simple-sitemap',
    'nuxt-lodash',
    '@nuxt/image',
  ],

  // https://nuxt.com/docs/guide/directory-structure/plugins#plugin-registration-order
  plugins: ['~/plugins/stores.ts', '~/plugins/labels.ts', '~/plugins/filters.ts'],

  build: {
    transpile: ['vue-toastification', 'plausible-tracker'],
  },

  sourcemap: true,
  vite: {
    plugins: [
      ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
      flareSourcemapUploader({
        key: process.env.FLARE_KEY,
      }),
    ],
  },

  dayjs: {
    locales: ['fr'],
    plugins: ['relativeTime', 'customParseFormat', 'duration', 'utc', 'dayOfYear'],
    defaultLocale: 'fr',
  },

  hooks: {
    'app:resolve'(app) {
      const pluginExcludes = [
        'strapi.plugin.mjs', // strapi: no auto login
      ]

      app.plugins = app.plugins.filter(
        (p) => !pluginExcludes.some((pluginExclude) => p.src.includes(pluginExclude))
      )
    },
    'build:manifest'(manifest) {
      for (const key in manifest) {
        manifest[key].prefetch = false
        manifest[key].preload = false
      }
      // console.log('manifest', manifest)
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['swiper-slide', 'swiper-container'].includes(tag),
    },
  },

  sitemap: {
    sitemapName: 'sitemap.xml',
    xslTips: false,
    inferStaticPagesAsRoutes: false,
    sitemaps: {
      pages: {
        dynamicUrlsApiEndpoint: '/__sitemap_pages',
      },
      missions: {
        dynamicUrlsApiEndpoint: '/__sitemap_missions',
      },
      organisations: {
        dynamicUrlsApiEndpoint: '/__sitemap_organisations',
      },
      villes: {
        dynamicUrlsApiEndpoint: '/__sitemap_villes',
      },
      departements: {
        dynamicUrlsApiEndpoint: '/__sitemap_departements',
      },
      reseaux: {
        dynamicUrlsApiEndpoint: '/__sitemap_reseaux',
      },
      activites: {
        dynamicUrlsApiEndpoint: '/__sitemap_activites',
      },
    },
    cacheTtl: 1000 * 60 * 60 * 24, // 1 day
  },

  routeRules: {
    '/register/volontaire/**': { redirect: '/inscription/benevole' },
    '/register/responsable/**': { redirect: '/inscription/responsable' },
    '/user/settings': { redirect: '/profile/settings' },
    '/user/**': { redirect: '/profile' },
    '/dashboard/structure/**': { redirect: '/admin/organisations' },
    '/dashboard/mission/**': { redirect: '/admin/missions' },
    '/dashboard/participation/**': { redirect: '/admin/participations' },
    '/dashboard/profile/**': { redirect: '/admin/utilisateurs' },
    '/dashboard/reseaux/**': { redirect: '/admin/contenus/reseaux' },
    '/inscription/organisation': { redirect: '/inscription/responsable' },
    '/statistiques': { redirect: '/stats' },
    '/admin/**': { ssr: false },
    '/support/**': { ssr: false },
    '/stats/**': { ssr: false },
    '/dasboard/**': { ssr: false },
    '/profile/**': { ssr: false },
    '/messages/**': { ssr: false },
  },

  lodash: {
    prefix: '_',
    prefixSkip: false,
    upperAfterPrefix: false,
  },
})
