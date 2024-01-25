export default {
  data() {
    return {
      showModalDelete: false,
    }
  },
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
    badgeTypeOrganisationSate() {
      switch (this.organisation.state) {
        case 'Validée':
          return 'success'
        case 'Signalée':
        case 'Annulée':
          return 'error'
        case 'En attente de validation':
        case 'En cours de traitement':
          return 'warning'
        default:
          return 'info'
      }
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
  methods: {
    async handleConfirmDelete() {
      apiFetch(`/structures/${this.organisation.id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          this.showModalDelete = false
          this.$emit('organisationDeleted')
        })
        .catch(() => {})
    },
    async handleChangeState(event) {
      await apiFetch(`/structures/${this.organisation.id}`, {
        method: 'PUT',
        body: {
          ...this.organisation,
          state: event.key,
        },
      })
        .then(() => {
          this.organisation.state = event.key
        })
        .catch(() => {})
    },
  },
}
