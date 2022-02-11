export const state = () => ({
  user: null,
  isImpersonate: false
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setIsImpersonate (state, isImpersonate) {
    state.isImpersonate = isImpersonate
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
      console.log('set user !', res.data)
      commit('setUser', res.data)
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
        await this.$cookies.set('access-token', response?.data?.access_token, {
          maxAge: response?.data?.expires_in,
          path: '/',
          secure: true
        })
        // await this.$gtm.push({ event: 'user-login' })
        await dispatch('fetchUser')
      })
      .catch((error) => {
        this.$cookies.remove('access-token')
        this.$cookies.remove('access-token-impersonate')
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
    commit('setUser', null)
    commit('setIsImpersonate', false)
    this.$cookies.remove('access-token')
    this.$cookies.remove('access-token-impersonate')
  },
  async updateProfile ({ dispatch }, payload) {
    await this.$axios.put(`/profiles/${payload.id}`, payload)
    await dispatch('fetchUser')
  },
  async registerVolontaire ({ dispatch }, form) {
    return await this.$axios
      .post('/register/volontaire', form)
      .then(async (response) => {
        await dispatch('login', form)
      })
      .catch((error) => {
        if (error.response.data.errors && error.response.data.errors.email) {
          if (
            error.response.data.errors.email[0] ===
          'Cet email est déjà pris. Merci de vous connecter avec vos identifiants.'
          ) {
            this.$router.push('/login?email=' + form.email)
          }
        }
        return Promise.reject(new Error(error))
      })
  },
  async registerResponsable ({ dispatch }, form) {
    return await this.$axios.post('/register/responsable', form)
      .then(async (response) => {
        await dispatch('login', form)
      })
      .catch((error) => {
        if (error.response.data.errors && error.response.data.errors.email) {
          if (
            error.response.data.errors.email[0] ===
            'Cet email est déjà pris. Merci de vous connecter avec vos identifiants.'
          ) {
            this.$router.push('/login?email=' + form.email)
          }
        }
        return Promise.reject(new Error(error))
      })
  },
  async impersonate ({ commit, dispatch }, userId) {
    const { data } = await this.$axios.post(`/users/${userId}/impersonate`)
    // commit('messaging/reset', null, { root: true })
    this.$cookies.set('access-token-impersonate', data.accessToken, {
      maxAge: 3600, // 1 heure
      path: '/',
      secure: true
    })
    this.$cookies.set('token-id-impersonate', data.token.id, {
      maxAge: 3600, // 1 heure
      path: '/'
    })
    commit('setIsImpersonate', true)
    await dispatch('fetchUser')
    this.$router.push('/')
  },
  async stopImpersonate ({ commit, dispatch }) {
    commit('setIsImpersonate', false)
    if (this.$cookies.get('token-id-impersonate')) {
      await this.$axios.delete(`/impersonate/${this.$cookies.get('token-id-impersonate')}`)
    }
    // commit('messaging/reset', null, { root: true })
    this.$cookies.remove('access-token-impersonate')
    this.$cookies.remove('token-id-impersonate')
    await dispatch('fetchUser')
    this.$router.push('/')
  }
}
