export default {
  computed: {
    canEditStatut () {
      const rolesWhoCanEdit = this.$options.filters.label(this.participation.state, 'participation_workflow_states', 'roles')
      return !!rolesWhoCanEdit.includes(this.$store.getters.contextRole)
    }
  }
}
