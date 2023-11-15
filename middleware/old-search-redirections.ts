import qs from 'qs'

export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.fullPath ==
    '/missions-benevolat?tags=Collecte+Nationale+des+Banques+Alimentaires+2023&department_name=03+-+Paris&utm_source=sendinblue&utm_campaign=Collecte_BA++Dept+75&utm_medium=email'
  ) {
    return navigateTo(
      '/missions-benevolat?tags=Collecte+Nationale+des+Banques+Alimentaires+2023&utm_source=sendinblue&utm_campaign=Collecte_BA++Dept+75&utm_medium=email&department_name=75+-+Paris'
    )
  }

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
