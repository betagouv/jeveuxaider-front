export const state = () => ({
  step: 0,
  query: {}
})

export const getters = {
  step: state => state.step,
  query: state => state.query
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
  }
}

export const actions = {
  //
}
