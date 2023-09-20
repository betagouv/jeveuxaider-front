import { useAlgoliaSearchStore } from '~/store/algoliaSearch'

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
      await search()
    },
    onNavigatorGeolocation: async (data: any) => {
      await onNavigatorGeolocation(data, getActiveFacets(), getSearchParameters())
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
  }
}

const getAroundLatLng = () => {
  const route = useRoute()
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
  const route = useRoute()
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
    filters: algoliaSearchStore.initialFilters,
    numericFilters: getActiveNumericFilters(),
    hitsPerPage: algoliaSearchStore?.hitsPerPage ?? 18,
  }
}

const getActiveFacets = () => {
  const route = useRoute()
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
  const route = useRoute()
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
  const route = useRoute()
  const algoliaSearchStore = useAlgoliaSearchStore()

  const nbFacets = algoliaSearchStore.availableFacets.filter(
    (facetName) => route.query[facetName] && !['type'].includes(facetName)
  ).length
  const nbNumericFilters = getActiveNumericFilters().length
  let nbSecondaryFilters = nbFacets + nbNumericFilters
  if (getSearchParameters()?.query) {
    nbSecondaryFilters++
  }
  return nbSecondaryFilters
}
