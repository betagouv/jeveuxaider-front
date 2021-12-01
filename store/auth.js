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
        this.$cookies.remove('access-token')
      })
    if (res.data) {
      commit('setUser', res.data)
    }
  },
  async login ({ commit, dispatch }, credentials) {
    return await this.$axios
      .post(`${this.$config.apiUrl}/oauth/token`, {
        grant_type: 'password',
        client_id: this.$config.oauth.clientId,
        client_secret: this.$config.oauth.clientSecret,
        username: credentials.email.toLowerCase(),
        password: credentials.password,
        scope: '*'
      })
      .then(async (response) => {
        await commit('setAccessToken', response?.data?.access_token)
        await this.$cookies.set('access-token', response?.data?.access_token, {
          maxAge: response?.data?.expires_in,
          path: '/',
          secure: true
        })
        // await this.$gtm.push({ event: 'user-login' })
        await dispatch('fetchUser')
        this.$router.push(
          this.$router.history.current.query.redirect || '/missions-benevolat'
        )
      })
      .catch((error) => {
        commit('setAccessToken', null)
        this.$cookies.remove('access-token')
        return Promise.reject(new Error(error))
      })
  },
  async logout ({ commit }) {
    console.log('logout')
    await this.$axios.post('/logout')
    commit('setAccessToken', null)
    commit('setUser', null)
    this.$cookies.remove('access-token')
  }
}
