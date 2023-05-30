export default {
  computed: {
    canEditStatut () {
      if (this.$store.getters.contextRole === 'responsable') {
        return this.participation.mission.responsable_id === this.$store.getters.profile.id
      }
      const rolesWhoCanEdit = this.$options.filters.label(this.participation.state, 'participation_workflow_states', 'roles')
      return !!rolesWhoCanEdit.includes(this.$store.getters.contextRole)
    }
  }
}
