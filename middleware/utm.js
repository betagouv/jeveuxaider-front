export default async function ({ redirect, route, store, app }) {
  const cookiesOptions = {
    path: '/',
    secure: true,
    maxAge: 60 * 60 * 24 * 10 // 10 jours
    // domain: '.jeveuxaider.gouv.fr'
  }

  const extractCookieValue = (value) => {
    if (Array.isArray(value)) {
      return value[0]
    }
    return value
  }

  console.log('route.query', route.query)

  if (route.query.utm_source) {
    await app.$cookies.set('utm_source', extractCookieValue(route.query.utm_source), cookiesOptions)
  }
  if (route.query.utm_campaign) {
    await app.$cookies.set('utm_campaign', extractCookieValue(route.query.utm_campaign), cookiesOptions)
  }
  if (route.query.utm_medium) {
    await app.$cookies.set('utm_medium', extractCookieValue(route.query.utm_medium), cookiesOptions)
  }
}
