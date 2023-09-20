export default {
  computed: {
    canEditStatut() {
      if (this.$stores.auth.contextRole === 'responsable') {
        return (
          this.participation.mission.responsable_id ===
          this.$stores.auth.profile.id
        )
      }
      const rolesWhoCanEdit = this.$filters.label(
        this.participation.state,
        'participation_workflow_states',
        'roles'
      )
      return !!rolesWhoCanEdit.includes(this.$stores.auth.contextRole)
    },
  },
}
