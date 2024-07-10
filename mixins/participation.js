export default {
  computed: {
    canEditStatut() {
      if (this.$stores.auth.contextRole === 'responsable') {
        return (
          this.participation.mission.responsables.filter(
            (r) => r.id === this.$stores.auth.profile?.id
          ).length > 0
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
