
export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit ({ commit, getters }, { store, req }) {
    if (this.$cookies.get('access-token')) {
      await store.dispatch('auth/fetchUser')
      if (getters.contextRole === 'responsable') {
        await store.dispatch('auth/fetchOrganisation')
      }
    }
    if (this.$cookies.get('access-token-impersonate')) {
      await store.commit('auth/setIsImpersonate', true)
    }
    await store.dispatch('settings/fetchGeneral')
  }
}

export const getters = {
  isLogged: state => !!(state.auth.user && state.auth.user.profile),
  contextRole: state => state.auth.user ? state.auth.user.context_role : null,
  contextableId: state => state.auth.user ? state.auth.user.contextable_id : null,
  // contextableId: (state, getters) => state.auth.user ? getters.currentRole.contextable_id : state.auth.user.contextable_id,
  roles: state => state.auth.user ? state.auth.user.roles : null,
  currentRole: (state, getters) => getters.roles ? getters.roles.filter(role => role.key === state.auth.user.context_role).shift() : null,
  profile: state => state.auth.user ? state.auth.user.profile : null,
  currentOrganisation: state => state.auth.organisation ? state.auth.organisation : null
}
