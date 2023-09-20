export default {
  computed: {
    canEditStatut() {
      const rolesWhoCanEdit = this.$filters.label(
        this.territoire.state,
        'territoire_workflow_states',
        'roles'
      )
      return !!rolesWhoCanEdit.includes(this.$stores.auth.contextRole)
    },
    canManageTerritoire() {
      return (
        this.$stores.auth.contextRole === 'admin' ||
        this.territoire.state === 'validated'
      )
    },
  },
}
