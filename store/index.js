
export const state = () => ({
  showSearchOverlay: false
})

export const mutations = {
  toggleSearchOverlay: (state) => {
    state.showSearchOverlay = !state.showSearchOverlay
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { store, req }) {
    console.log('nuxtServerInit')
    if (this.$cookies.get('access-token')) {
      commit('auth/setAccessToken', this.$cookies.get('access-token'))
      await store.dispatch('auth/fetchUser')
    }
  }
}

export const getters = {
  isLogged: state => !!(state.auth.access_token && state.auth.user)
}
