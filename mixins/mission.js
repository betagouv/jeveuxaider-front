export default {
  computed: {
    domaine () {
      return (
        this.thematique?.domaine ??
        this.mission?.domaine ??
        this.mission?.template?.domaine
      )
    },
    domainId () {
      return (
        this.thematique?.domaine_id ??
        this.mission?.domaine_id ??
        this.mission?.template?.domaine_id
      )
    },
    thumbnail () {
      let thumbnail = null
      // @todo: faire marcher pour les templates
      if (this.mission.template_id) {
        return this.mission.template?.photo ? `${this.mission.template.photo.thumb}, ${this.mission.template.photo.large} 2x` : null
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
      if (this.$store.getters.contextRole == 'admin') {
        return true
      }
      if (this.mission.state == 'Validée') {
        return true
      }
      if (
        this.$store.getters.contextRole == 'referent' ||
        this.$store.getters.contextRole == 'referent_regional'
      ) {
        return !['Signalée'].includes(this.mission.state)
      }
      return false
    }
  },
  methods: {
    defaultThumbnail (e) {
      e.target.src = '/images/missions/card-thumbnail-default.jpg'
      e.target.srcset = '/images/missions/card-thumbnail-default@2x.jpg 2x'
    }
  }
}
