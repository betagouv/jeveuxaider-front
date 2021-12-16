export const state = () => ({
  access_token: null,
  user: null,
  roles: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setAccessToken (state, accessToken) {
    state.access_token = accessToken
  },
  setRoles (state, roles) {
    state.roles = roles
  }
}

export const actions = {
  async fetchUser ({ commit }) {
    const res = await this.$axios
      .get('/user')
      .catch(() => {
        this.$cookies.remove('access-token')
      })
    if (res.data) {
      commit('setUser', res.data)
    }
  },
  async fetchRoles ({ commit }) {
    const res = await this.$axios.get('/user/roles')
    if (res.data) {
      commit('setRoles', res.data)
    }
  },
  async login ({ commit, dispatch }, form) {
    return await this.$axios
      .post(`${this.$config.apiUrl}/oauth/token`, {
        grant_type: 'password',
        client_id: this.$config.oauth.clientId,
        client_secret: this.$config.oauth.clientSecret,
        username: form.email.toLowerCase(),
        password: form.password,
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
        await dispatch('fetchRoles')
      })
      .catch((error) => {
        commit('setAccessToken', null)
        this.$cookies.remove('access-token')
        return Promise.reject(new Error(error))
      })
  },
  async updateUser ({ state, commit }, attributes) {
    const res = await this.$axios.post('/user', {
      ...state.user,
      ...attributes
    })
    commit('setUser', res ? res.data : null)
  },
  async logout ({ commit }) {
    this.$router.push('/')
    await this.$axios.post('/logout')
    commit('setAccessToken', null)
    commit('setUser', null)
    this.$cookies.remove('access-token')
  },
  async registerVolontaire ({ dispatch }, form) {
    return await this.$axios
      .post('/register/volontaire', form)
      .then(async (response) => {
        console.log('response', response)
        await dispatch('login', form)
      })
      .catch((error) => {
        console.log('error', error.response.data.errors.email)
        if (error.response.data.errors && error.response.data.errors.email) {
          if (
            error.response.data.errors.email[0] ===
          'Cet email est déjà pris. Merci de vous connecter avec vos identifiants.'
          ) {
            console.log('/login?email=' + form.email)
            this.$router.push('/login?email=' + form.email)
          }
        }
        return Promise.reject(new Error(error))
      })
  }
}
