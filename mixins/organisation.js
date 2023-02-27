export default {
  computed: {
    organisationCity () {
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
    hasPageOnline () {
      return this.organisation.statut_juridique == 'Association' && this.organisation.state === 'Validée'
    },
    canEditStatut () {
      const rolesWhoCanEdit = this.$options.filters.label(this.organisation.state, 'structure_workflow_states', 'roles')
      switch (this.$store.getters.contextRole) {
        case 'admin': return true
        case 'referent':
        case 'referent_regional':
          return !!rolesWhoCanEdit.includes(this.$store.getters.contextRole) && this.organisation?.permissions?.canChangeState
        default: return false
      }
    }
  }
}
