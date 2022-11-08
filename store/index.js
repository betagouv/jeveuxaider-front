
export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit ({ commit, getters }, { store, req }) {
    if (this.$cookies.get('access-token')) {
      await store.dispatch('auth/fetchUser')
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
  roles: (state) => {
    if (!state.auth.user) {
      return null
    }

    return state.auth.user.roles.map((role) => {
      switch (role.name) {
        case 'admin':
          return {
            key: role.name,
            label: 'Modérateur'
          }
        case 'responsable':
          return {
            key: role.name,
            contextable_type: 'structure',
            contextable_id: role.pivot.rolable_id,
            label: role.pivot_model.name
          }
        case 'referent':
          return {
            key: role.name,
            contextable_type: 'department',
            contextable_id: role.pivot.rolable_id,
            label: role.pivot_model.name
          }
        case 'referent_regional':
          return {
            key: role.name,
            contextable_type: 'region',
            contextable_id: role.pivot.rolable_id,
            label: role.pivot_model.name
          }
        case 'tete_de_reseau':
          return {
            key: role.name,
            contextable_type: 'reseau',
            contextable_id: role.pivot.rolable_id,
            label: role.pivot_model.name
          }
        case 'responsable_territoire':
          return {
            key: role.name,
            contextable_type: 'responsable_territoire',
            contextable_id: role.pivot.rolable_id,
            label: role.pivot_model.name
          }
      }
      return null
    })
  },
  currentRole: (state, getters) => getters.roles ? getters.roles.filter(role => role.key === state.auth.user.context_role).shift() : null,
  profile: state => state.auth.user ? state.auth.user.profile : null
}
