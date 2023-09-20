import { defineStore } from 'pinia'

export const useAlgoliaSearchStore = defineStore({
  id: 'algoliaSearch',
  state: () => ({
    indexKey: null,
    indexName: null,
    results: null as any,
    facetsResults: [] as any,
    initialFilters: '',
    hitsPerPage: null,
    aroundLatLng: null,
    navigatorGeolocation: null as any,
    loadingNavigatorGeolocation: false,
    availableFacets: [] as any[],
    availableNumericFilters: [] as any[],
    searchParameters: {} as any,
    activeFacets: {} as any,
  }),
  getters: {
    facetResults: (state) => (facetName: string) => {
      return (
        state.facetsResults.find((facetResults: any) => !!facetResults.facets[facetName])?.facets[
          facetName
        ] ??
        state.results?.facets[facetName] ??
        {}
      )
    },
  },
  actions: {
    reset() {
      this.indexKey = null
      this.indexName = null
      this.results = null
      this.facetsResults = []
      this.initialFilters = ''
      this.hitsPerPage = null
      this.aroundLatLng = null
    },
  },
})
