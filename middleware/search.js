import qs from 'qs'

export default function ({ redirect, route, store }) {
  let query = qs.parse(route.query)
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
    return redirect(`/missions-benevolat?${qs.stringify(query)}`)
  }
}
