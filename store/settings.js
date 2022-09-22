export const state = () => ({
  general: null,
  theme: 'light' // light, dark
})

export const mutations = {
  setGeneral: (state, form) => { state.general = form },
  setTheme: (state, payload) => { state.theme = payload }
}

export const actions = {
  async fetchGeneral ({ commit }) {
    const res = await this.$axios
      .get('/settings/general')

    if (res.data) {
      commit('setGeneral', res.data)
    }
  },
  async updateGeneral ({ dispatch }, payload) {
    await this.$axios.post('/settings/general', payload)
    await dispatch('fetchGeneral')
  }
}
