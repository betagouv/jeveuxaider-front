import { SearchIndex } from 'algoliasearch'
import { useAlgoliaSearchStore } from '@/store/algoliaSearch'

export const useAlgoliaQueryBuilder = () => {
  return {
    hasActiveFilters,
    search,
    searchForFacetValues,
    addFilter,
    deleteFilter,
    deleteAllFilters,
    isActiveFilter,
    onNavigatorGeolocation,
    onNavigatorGeolocationError,
  }
}

const hasActiveFilters = () => {
  const route = useRoute()
  return Object.keys(route.query).some((q) => q !== 'page')
}

const search = async () => {
  const algoliaSearchStore = useAlgoliaSearchStore()
  const { $algolia, $stores } = useNuxtApp()

  const queries = [
    {
      indexName: algoliaSearchStore.indexName,
      params: $stores.algoliaSearch.searchParameters,
    },
  ] as any[]

  algoliaSearchStore.activeFacets.forEach((facetFilter: string[]) => {
    const facetName = facetFilter[0].split(':')[0]
    queries.push({
      indexName: algoliaSearchStore.indexName,
      params: {
        ...algoliaSearchStore.searchParameters,
        facetFilters: algoliaSearchStore.activeFacets.filter(
          (facetFilter: string[]) => facetFilter[0].split(':')[0] != facetName
        ),
        facets: [facetName],
        filters: algoliaSearchStore.filters,
      },
    })
  })

  const { results } = await $algolia.multipleQueries(queries)

  algoliaSearchStore.results = results[0]
  algoliaSearchStore.facetsResults = results.slice(1)
}

const searchForFacetValues = async (facetName: string, facetQuery: any) => {
  const algoliaSearchStore = useAlgoliaSearchStore()
  const { $algolia } = useNuxtApp()

  if (!algoliaSearchStore.indexKey) {
    return
  }

  const SearchIndex = $algolia[algoliaSearchStore.indexKey] as SearchIndex
  return await SearchIndex.searchForFacetValues(facetName, facetQuery, {
    ...algoliaSearchStore.searchParameters,
    facetFilters: algoliaSearchStore.searchParameters.facetFilters.filter(
      (facetFilter: any) => facetFilter[0].split(':')[0] != facetName
    ),
  })
}

const addFilter = (filterName: string, filterValue: any, multiple = false) => {
  const route = useRoute()
  const router = useRouter()

  let filterQueryValues = route.query[filterName]
    ? (route.query[filterName] as string).split('|')
    : []
  if (multiple) {
    filterQueryValues.push(filterValue)
  } else {
    filterQueryValues = [filterValue]
  }

  router.push({
    path: route.path,
    query: {
      ...route.query,
      [filterName]: filterQueryValues.join('|'),
      page: undefined,
    },
  })
}

const deleteFilter = (filterName: string, filterValue = null as any, multiple = false) => {
  const route = useRoute()
  const router = useRouter()

  let filterQueryValues = (
    route.query[filterName] ? (route.query[filterName] as string).split('|') : []
  ) as string[] | undefined

  if (multiple) {
    filterQueryValues = filterQueryValues?.filter((value) => value !== filterValue)
    if (filterQueryValues?.length === 0) {
      filterQueryValues = undefined
    }
  } else {
    filterQueryValues = undefined
  }

  router.push({
    path: route.path,
    query: {
      ...route.query,
      [filterName]: filterQueryValues ? filterQueryValues.join('|') : undefined,
      page: undefined,
    },
  })
}

const deleteAllFilters = () => {
  const route = useRoute()
  const router = useRouter()
  router.push({
    path: route.path,
  })
}

const isActiveFilter = (name: string, value: any) => {
  const route = useRoute()
  return !!(route.query[name] && (route.query[name] as string).split('|').includes(value))
}

const onNavigatorGeolocation = async (data: any) => {
  const algoliaSearchStore = useAlgoliaSearchStore()
  const { $plausible } = useNuxtApp()

  algoliaSearchStore.navigatorGeolocation = data
  algoliaSearchStore.loadingNavigatorGeolocation = false
  $plausible.trackEvent('Géolocalisation par navigateur - Acceptation')
}

const onNavigatorGeolocationError = (data: any) => {
  const algoliaSearchStore = useAlgoliaSearchStore()
  const { $plausible } = useNuxtApp()

  // console.log('ERROR', data)
  algoliaSearchStore.loadingNavigatorGeolocation = false
  $plausible.trackEvent('Géolocalisation par navigateur - Refus')
}
