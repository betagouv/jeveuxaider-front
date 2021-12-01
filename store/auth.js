export const state = () => ({
  access_token: null,
  user: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setAccessToken (state, accessToken) {
    state.access_token = accessToken
  }
}

export const actions = {
  async fetchUser ({ commit, dispatch }) {
    const res = await this.$axios
      .get('/user')
      .catch(() => {
        console.log('fetchUser catch')
        this.$cookies.remove('access_token')
      })
    if (res.data) {
      commit('setUser', res.data)
    }
  }

}
