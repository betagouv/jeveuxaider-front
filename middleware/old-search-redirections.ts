import qs from 'qs'

export default defineNuxtRouteMiddleware((to, from) => {
  let query = qs.parse(to.query)
  if (query.query || query.refinementList) {
    if (query.query) {
      query.search = query.query
      delete query.query
    }
    if (query.refinementList) {
      query = { ...query, ...query.refinementList }
      delete query.refinementList

      for (const [key, value] of Object.entries(query)) {
        query[key] = Array.isArray(value) ? value.join('|') : value
      }
    }
    return navigateTo(`/missions-benevolat?${qs.stringify(query)}`)
  }
})
