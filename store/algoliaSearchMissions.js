export const state = () => ({
  results: null,
  facetsResults: []
})

export const mutations = {
  setResults: (state, payload) => { state.results = payload },
  setFacetsResults: (state, payload) => { state.facetsResults = payload }
}

export const actions = {
  deleteAllFilters () {
    this.$router.push({ path: this.$router.currentRoute.path })
  }
}

export const getters = {
  facetResults: state => (facetName) => {
    return state.facetsResults.find(facetResults => !!facetResults.facets.facetName) ?? state.results?.facets[facetName] ?? {}
  }
}
