export default {
  computed: {
    domaine () {
      return (
        this.mission?.domaine ??
        this.mission?.template?.domaine
      )
    },
    domainId () {
      return (
        this.mission?.domaine_id ??
        this.mission?.template?.domaine_id
      )
    },
    thumbnail () {
      return this.mission.template?.photo?.urls.card ??
        this.mission.illustrations?.[0]?.urls.card ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
    hasPageOnline () {
      return this.mission.structure.state === 'Validée' && ['Validée', 'Terminée'].includes(this.mission.state)
    },
    canEditStatut () {
      const rolesWhoCanEdit = this.$options.filters.label(this.mission.state, 'mission_workflow_states', 'roles')
      return !!rolesWhoCanEdit.includes(this.$store.getters.contextRole)
    },
    missionCity () {
      if (this.mission.city?.startsWith('Paris ')) {
        return 'Paris'
      } else if (this.mission.city?.startsWith('Lyon ')) {
        return 'Lyon'
      } else if (this.mission.city?.startsWith('Marseille ')) {
        return 'Marseille'
      } else {
        return this.mission.city?.replace(' Arrondissement', '')
      }
    }
  }
}
