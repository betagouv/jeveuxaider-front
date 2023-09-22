import { useAlgoliaSearchStore } from '@/store/algoliaSearch'

export const useAlgoliaOrganisationsQueryBuilder = () => {
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
      await onNavigatorGeolocation(data)
      algoliaSearchStore.searchParameters = getSearchParameters()
      algoliaSearchStore.activeFacets = getActiveFacets()
      await search()
    },
    onNavigatorGeolocationError: (data: any) => onNavigatorGeolocationError(data),
    getSearchParameters: () => getSearchParameters(),
    getNbMobileActiveFilters: () => getNbMobileActiveFilters(),

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
    aroundLatLngViaIP: !getAroundLatLng(),
    aroundLatLng: getAroundLatLng(),
    aroundRadius: route.query.aroundLatLng ? 35000 : 'all',
    aroundPrecision: 2000,
    query: route.query.search || '',
    page: route.query.page ? Number(route.query.page) - 1 : 0,
    facetFilters: getActiveFacets(),
    facets: ['*'],
    filters: algoliaSearchStore.initialFilters,
    hitsPerPage: 18,
  }
}

const getActiveFacets = () => {
  const route = useRoute()
  const algoliaSearchStore = useAlgoliaSearchStore()

  let activeFacets = algoliaSearchStore.availableFacets.filter(
    (facetName) => route.query[facetName]
  )

  activeFacets = activeFacets.map((facetName) => {
    const queryValue = route.query?.[facetName] as string
    return queryValue.split('|').map((facetValue: string) => {
      return `${facetName}:${facetValue}`
    })
  })

  return activeFacets
}

const getNbMobileActiveFilters = () => {
  const route = useRoute()
  const algoliaSearchStore = useAlgoliaSearchStore()

  let nbFacets = algoliaSearchStore.availableFacets.filter(
    (facetName) => route.query[facetName]
  ).length
  if (getSearchParameters()?.query) {
    nbFacets++
  }
  return nbFacets
}
