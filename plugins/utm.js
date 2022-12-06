export default function ({ route, app }) {
  console.log('debug utm', document?.domain)
  // secure true does not work on http://localhost and safari
  const cookiesOptions = {
    path: '/',
    secure: true,
    // secure: document?.domain !== 'localhost',
    maxAge: 60 * 60 * 24 * 10 // 10 jours
    // domain: '.jeveuxaider.gouv.fr'
  }

  const extractCookieValue = (value) => {
    if (Array.isArray(value)) {
      return value[0]
    }
    return value
  }

  if (route.query.utm_source) {
    app.$cookies.set('utm_source', extractCookieValue(route.query.utm_source), cookiesOptions)
  }
  if (route.query.utm_campaign) {
    app.$cookies.set('utm_campaign', extractCookieValue(route.query.utm_campaign), cookiesOptions)
  }
  if (route.query.utm_medium) {
    app.$cookies.set('utm_medium', extractCookieValue(route.query.utm_medium), cookiesOptions)
  }
}
