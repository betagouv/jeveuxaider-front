export default {
  computed: {
    organisationCity() {
      if (this.organisation.city?.includes('Paris')) {
        return 'Paris'
      } else if (this.organisation.city?.includes('Lyon')) {
        return 'Lyon'
      } else if (this.organisation.city?.includes('Marseille')) {
        return 'Marseille'
      } else {
        return this.organisation?.city
      }
    },
    hasPageOnline() {
      return (
        this.organisation.statut_juridique == 'Association' && this.organisation.state === 'Validée'
      )
    },
    canEditStatut() {
      const rolesWhoCanEdit = this.$filters.label(
        this.organisation.state,
        'structure_workflow_states',
        'roles'
      )
      switch (this.$stores.auth.contextRole) {
        case 'admin':
        case 'referent':
          return true
        case 'referent_regional':
          return (
            !!rolesWhoCanEdit.includes(this.$stores.auth.contextRole) &&
            this.organisation?.permissions?.canChangeState
          )
        default:
          return false
      }
    },
  },
}
