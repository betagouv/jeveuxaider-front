import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  if (!config.public.gtm.id) {
    return
  }

  nuxtApp.vueApp.use(
    createGtm({
      id: config.public.gtm.id,
      debug: false,
      vueRouter: useRouter(),
    })
  )
})
