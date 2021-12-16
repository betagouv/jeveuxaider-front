
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
    if (this.$cookies.get('access-token')) {
      commit('auth/setAccessToken', this.$cookies.get('access-token'))
      await store.dispatch('auth/fetchUser')
      await store.dispatch('auth/fetchRoles')
    }
  }
}

export const getters = {
  isLogged: state => !!(state.auth.access_token && state.auth.user),
  contextRole: state => state.auth.user ? state.auth.user.context_role : null,
  roles: state => state.auth.user ? state.auth.roles : null,
  currentRole: (state, getters) => getters.roles ? getters.roles.filter(role => role.key === state.auth.user.context_role).shift() : null,
  profile: state => state.auth.user ? state.auth.user.profile : null
}
