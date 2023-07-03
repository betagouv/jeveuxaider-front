export const state = () => ({
  step: 0,
  response: {}
})

export const getters = {
  step: state => state.step,
  response: state => state.response
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
  setResponse: (state, payload) => {
    state.response = payload
  }
}

export const actions = {
  //
}
