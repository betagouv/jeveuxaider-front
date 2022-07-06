export const state = () => ({
  params: {
    year: 2022,
    period: 'current_year',
    department: null
  }
})

export const mutations = {
  setParams (state, params) {
    state.params = params
  }
}

export const actions = {

}
