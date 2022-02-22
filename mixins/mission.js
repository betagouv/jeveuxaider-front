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
      let thumbnail = null
      if (this.mission.template_id) {
        return this.mission.template?.photo?.urls.card
      }
      if (this.mission.thumbnail) {
        thumbnail = `/images/domaines/${this.mission.thumbnail}.webp, /images/domaines/${this.mission.thumbnail}.jpg, /images/domaines/${this.mission.thumbnail}@2x.webp 2x, /images/domaines/${this.mission.thumbnail}@2x.jpg 2x, `
      } else {
        thumbnail = `/images/domaines/${this.mission.domaine_id}_1.webp, /images/domaines/${this.mission.domaine_id}_1.jpg, /images/domaines/${this.mission.domaine_id}_1@2x.webp 2x, /images/domaines/${this.mission.domaine_id}_1@2x.jpg 2x, `
      }
      return thumbnail
    },
    hasPageOnline () {
      return this.mission.structure.state === 'Validée' && ['Validée', 'Terminée'].includes(this.mission.state)
    },
    canEditStatut () {
      const rolesWhoCanEdit = this.$options.filters.label(this.mission.state, 'mission_workflow_states', 'roles')
      return !!rolesWhoCanEdit.includes(this.$store.getters.contextRole)
    },
    missionCity () {
      if (this.mission.city?.includes('Paris')) {
        return 'Paris'
      } else if (this.mission.city?.includes('Lyon')) {
        return 'Lyon'
      } else if (this.mission.city?.includes('Marseille')) {
        return 'Marseille'
      } else {
        return this.mission?.city
      }
    }
  },
  methods: {
    defaultThumbnail (e) {
      e.target.src = '/images/missions/card-thumbnail-default.jpg'
      e.target.srcset = '/images/missions/card-thumbnail-default@2x.jpg 2x'
    }
  }
}
