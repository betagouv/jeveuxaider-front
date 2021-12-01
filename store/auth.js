export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}

export const actions = {
  async fetchUser ({ commit, dispatch }) {
    const res = await this.$axios
      .get('/user')
      .catch(() => this.$cookies.remove('access-token'))

    if (res.data) {
      commit('setUser', res ? res.data : null)
    }
  }

}
