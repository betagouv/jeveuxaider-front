export const state = () => ({
  params: {
    period: 'all',
    year: null,
    month: null
  }
})

export const mutations = {
  setParams (state, params) {
    state.params = params
  }
}

export const actions = {

}
