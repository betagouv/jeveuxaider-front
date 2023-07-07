export const state = () => ({
  step: 0,
  query: {},
  navigatorGeolocationSelected: false
})

export const getters = {
  step: state => state.step,
  query: state => state.query,
  navigatorGeolocationSelected: state => state.navigatorGeolocationSelected
}

export const mutations = {
  setStep: (state, step) => {
    state.step = step
  },
  nextStep: (state) => {
    state.step += 1
  },
  previousStep: (state) => {
    state.step -= 1
  },
  setQuery: (state, payload) => {
    state.query = payload
  },
  setNavigatorGeolocationSelected: (state, payload) => {
    state.navigatorGeolocationSelected = payload
  }
}

export const actions = {
  //
}
