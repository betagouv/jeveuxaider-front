export const state = () => ({
  indexKey: null,
  indexName: null,
  results: null,
  facetsResults: [],
  initialFilters: '',
  hitsPerPage: null,
  aroundLatLng: null,
  navigatorGeolocation: null,
  loadingNavigatorGeolocation: false,
  nbMissionsDistance: 0,
  availableFacets: [],
  availableNumericFilters: [],
  searchParameters: {}
})

export const mutations = {
  setIndexKey: (state, payload) => { state.indexKey = payload },
  setIndexName: (state, payload) => { state.indexName = payload },
  setResults: (state, payload) => { state.results = payload },
  setFacetsResults: (state, payload) => { state.facetsResults = payload },
  setInitialFilters: (state, payload) => { state.initialFilters = payload },
  setHitsPerPage: (state, payload) => { state.hitsPerPage = payload },
  setAroundLatLng: (state, payload) => { state.aroundLatLng = payload },
  setNavigatorGeolocation: (state, payload) => { state.navigatorGeolocation = payload },
  setLoadingNavigatorGeolocation: (state, payload) => { state.loadingNavigatorGeolocation = payload },
  setNbMissionsDistance: (state, payload) => { state.nbMissionsDistance = payload },
  setAvailableFacets: (state, payload) => { state.availableFacets = payload },
  setAvailableNumericFilters: (state, payload) => { state.availableNumericFilters = payload },
  setSearchParameters: (state, payload) => { state.searchParameters = payload }
}

export const actions = {
  reset ({ commit }) {
    commit('setIndexKey', null)
    commit('setIndexName', null)
    commit('setResults', null)
    commit('setFacetsResults', [])
    commit('setInitialFilters', '')
    commit('setHitsPerPage', null)
    commit('setAroundLatLng', null)
  }
}

export const getters = {
  facetResults: state => (facetName) => {
    return state.facetsResults.find(facetResults => !!facetResults.facets[facetName])?.facets[facetName] ??
    state.results?.facets[facetName] ?? {}
  },
  nbMissionsPresentiel: (state, getters) => {
    if (state.indexKey !== 'missionsIndex') {
      return 0
    }
    return getters.facetResults('type')?.['Mission en présentiel'] ?? 0
  }
}
