export const state = () => ({
  setIndexKey: null,
  indexName: null,
  results: null,
  facetsResults: [],
  initialFilters: ''
})

export const mutations = {
  setIndexKey: (state, payload) => { state.indexKey = payload },
  setIndexName: (state, payload) => { state.indexName = payload },
  setResults: (state, payload) => { state.results = payload },
  setFacetsResults: (state, payload) => { state.facetsResults = payload },
  setInitialFilters: (state, payload) => { state.initialFilters = payload }
}

export const actions = {

}

export const getters = {
  facetResults: state => (facetName) => {
    return state.facetsResults.find(facetResults => !!facetResults.facets[facetName])?.facets[facetName] ??
    state.results?.facets[facetName] ?? {}
  }
}
