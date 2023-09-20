import Plausible from 'plausible-tracker'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const plausible = Plausible({
    domain: config.public.plausible.site_id,
    // trackLocalhost: true,
  })

  return {
    provide: {
      plausible,
    },
  }
})
