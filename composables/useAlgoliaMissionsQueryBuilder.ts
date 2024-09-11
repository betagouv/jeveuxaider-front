import { useAlgoliaSearchStore } from '@/store/algoliaSearch'
import dayjs from 'dayjs'

export const useAlgoliaMissionsQueryBuilder = () => {
  const {
    search,
    searchForFacetValues,
    addFilter,
    deleteFilter,
    deleteAllFilters,
    isActiveFilter,
    onNavigatorGeolocation,
    onNavigatorGeolocationError,
    hasActiveFilters,
  } = useAlgoliaQueryBuilder()
  const algoliaSearchStore = useAlgoliaSearchStore()

  return {
    search: async () => {
      algoliaSearchStore.searchParameters = getSearchParameters()
      algoliaSearchStore.activeFacets = getActiveFacets()
      // @todo: possible de recompute filter ici une seule fois au lieu de 2 (setup et watch) ?
      await search()
    },
    onNavigatorGeolocation: async (data: any) => {
      await onNavigatorGeolocation(data)
      algoliaSearchStore.searchParameters = getSearchParameters()
      algoliaSearchStore.activeFacets = getActiveFacets()
      await search()
    },
    onNavigatorGeolocationError: (data: any) => onNavigatorGeolocationError(data),
    getNbMobileSecondaryFilters: () => getNbMobileSecondaryFilters(),
    getSearchParameters: () => getSearchParameters(),
    getActiveFacets: () => getActiveFacets(),
    searchForFacetValues: (facetName: string, facetQuery: any) =>
      searchForFacetValues(facetName, facetQuery),
    addFilter: (filterName: string, filterValue: any, multiple?: boolean) =>
      addFilter(filterName, filterValue, multiple),
    deleteFilter: (filterName: string, filterValue?: any, multiple?: boolean) =>
      deleteFilter(filterName, filterValue, multiple),
    deleteAllFilters: () => deleteAllFilters(),
    isActiveFilter: (name: string, value: any) => isActiveFilter(name, value),
    hasActiveFilters: () => hasActiveFilters(),
    recomputeFilters: (query?: any) => recomputeFilters(query),
  }
}

const getAroundLatLng = () => {
  const route = useRouter().currentRoute.value
  const algoliaSearchStore = useAlgoliaSearchStore()

  if (route.query.type == 'Mission à distance') {
    return ''
  }

  if (algoliaSearchStore.aroundLatLng) {
    return algoliaSearchStore.aroundLatLng
  }

  if (route.query.aroundLatLng) {
    return route.query.aroundLatLng
  }

  if (algoliaSearchStore.navigatorGeolocation) {
    return `${algoliaSearchStore.navigatorGeolocation.coords.latitude}, ${algoliaSearchStore.navigatorGeolocation.coords.longitude}`
  }

  return ''
}

const getSearchParameters = () => {
  const route = useRouter().currentRoute.value
  const algoliaSearchStore = useAlgoliaSearchStore()

  return {
    aroundLatLngViaIP: route.query.type != 'Mission à distance' && !getAroundLatLng(),
    aroundLatLng: getAroundLatLng(),
    aroundRadius: route.query.aroundLatLng ? 35000 : 'all',
    aroundPrecision: 2000,
    query: route.query.search || '',
    page: route.query.page ? Number(route.query.page) - 1 : 0,
    facetFilters: getActiveFacets(),
    facets: ['*'],
    filters: algoliaSearchStore.filters,
    numericFilters: getActiveNumericFilters(),
    hitsPerPage: algoliaSearchStore?.hitsPerPage ?? 18,
  }
}

const recomputeFilters = (query = null) => {
  const route = useRouter().currentRoute.value
  const algoliaSearchStore = useAlgoliaSearchStore()
  const queries = query || route.query

  if (queries?.start || queries?.end) {
    const dateFilters = getDateFilters(queries?.start, queries?.end)
    return algoliaSearchStore.initialFilters
      ? `${algoliaSearchStore.initialFilters} AND ${dateFilters}`
      : dateFilters
  }

  return algoliaSearchStore.initialFilters
}

const getActiveFacets = () => {
  const route = useRouter().currentRoute.value
  const algoliaSearchStore = useAlgoliaSearchStore()

  let activeFacets = algoliaSearchStore.availableFacets.filter(
    (facetName) => route.query[facetName]
  )

  activeFacets = activeFacets.map((facetName) => {
    if (route.query?.[facetName]) {
      const queryValue = route.query?.[facetName] as string
      return queryValue.split('|').map((facetValue: string) => {
        return `${facetName}:${facetValue}`
      })
    }
  })

  if (!route.query.type && route.name != 'activites-slug') {
    activeFacets.push(['type:Mission en présentiel'])
  }

  return activeFacets
}

const getActiveNumericFilters = () => {
  const route = useRouter().currentRoute.value
  const algoliaSearchStore = useAlgoliaSearchStore()

  let activeNumericFilters = algoliaSearchStore.availableNumericFilters.filter(
    (filterName) => route.query[filterName]
  )

  activeNumericFilters = activeNumericFilters.map((filterName) => {
    return `${filterName}${route.query[filterName]}`
  })

  return activeNumericFilters
}

const getNbMobileSecondaryFilters = () => {
  const route = useRouter().currentRoute.value
  const algoliaSearchStore = useAlgoliaSearchStore()

  const nbFacets = algoliaSearchStore.availableFacets.filter(
    (facetName) => route.query[facetName] && !['type'].includes(facetName)
  ).length
  const nbNumericFilters = getActiveNumericFilters().length
  let nbSecondaryFilters = nbFacets + nbNumericFilters
  if (getSearchParameters()?.query) {
    nbSecondaryFilters++
  }
  if (route.query.start) {
    nbSecondaryFilters++
  }
  return nbSecondaryFilters
}

const getDateFilters = (start: any, end: any) => {
  const startDate = dayjs(start).startOf('day')
  let endDate = end ? dayjs(end).startOf('day') : startDate

  const daysArray = []
  let dateType = 'ponctual'
  let day = dayjs(startDate)

  // if end date before startdate, set end date to start date
  if (endDate.isBefore(startDate)) {
    endDate = startDate
  }

  while (day.isBefore(endDate) || day.isSame(endDate)) {
    daysArray.push(day.unix())
    day = day.add(1, 'day')
  }

  // if start date and end date is more than 1 month
  if (startDate.isBefore(endDate) && endDate.diff(startDate, 'month') >= 1) {
    dateType = 'recurring'
  }

  return `date_type:"${dateType}" AND start_date<=${startDate.unix()} AND (end_date_no_creneaux>=${startDate.unix()} OR has_end_date=0 OR ${daysArray
    .map((day) => `dates.timestamp=${day}`)
    .join(' OR ')})`
}
