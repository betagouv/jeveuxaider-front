export default defineNuxtPlugin((nuxtApp) => {
  const cookiesOptions = {
    path: '/',
    secure: window.location.hostname !== 'localhost', // secure true does not work on http://localhost and safari
    maxAge: 60 * 60 * 24 * 10, // 10 jours
    // domain: '.jeveuxaider.gouv.fr'
  }

  const extractCookieValue = (value: any) => {
    if (Array.isArray(value)) {
      return value[0]
    }
    return value
  }

  const route = useRouter().currentRoute.value

  if (route.query.utm_source) {
    const utmSource = useCookie('utm_source', cookiesOptions)
    utmSource.value = extractCookieValue(route.query.utm_source)
  }
  if (route.query.utm_campaign) {
    const utmCampaign = useCookie('utm_campaign', cookiesOptions)
    utmCampaign.value = extractCookieValue(route.query.utm_campaign)
  }
  if (route.query.utm_medium) {
    const utmMedium = useCookie('utm_medium', cookiesOptions)
    utmMedium.value = extractCookieValue(route.query.utm_medium)
  }
})
