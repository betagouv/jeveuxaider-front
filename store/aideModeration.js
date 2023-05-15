import axios from 'axios'

export const state = () => ({
  type: null,
  model: null,
  response: null,
  loading: false
})

export const mutations = {
  setType (state, type) {
    state.type = type
  },
  setModel (state, model) {
    state.model = model
  },
  setResponse (state, response) {
    state.response = response
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}

export const getters = {
  isAICompliant: state => state.response ? state.response?.global > 0.87 : null
}

export const actions = {
  async fetch ({ commit }, { type, model, text }) {
    commit('setLoading', true)
    commit('setResponse', null)
    commit('setType', type)
    commit('setModel', model)

    // console.log('FETCH AI RESPONSE')

    const url = type == 'organisation' ? this.$config.ai.organisationModerationUrl : this.$config.ai.missionModerationUrl
    const { data: response } = await axios.post(url, { text })
    commit('setResponse', response)
    commit('setLoading', false)
  }
}
