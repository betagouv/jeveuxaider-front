export default {
  computed: {
    canEditStatut() {
      const rolesWhoCanEdit = this.$filters.label(
        this.missionTemplate.state,
        'mission_template_workflow_states',
        'roles'
      )
      return !!rolesWhoCanEdit.includes(this.$stores.auth.contextRole)
    },
  },
}
