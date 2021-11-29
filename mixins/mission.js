export default {
  computed: {
    domainId () {
      return (
        this.thematique?.domaine_id ??
        this.mission?.domaine_id ??
        this.mission?.template?.domaine_id
      )
    },
    thumbnail () {
      const thumbnail = this.mission.template_id
        ? `templates/${this.mission.template_id}`
        : this.mission.thumbnail
          ? `domaines/${this.mission.thumbnail}`
          : `domaines/${this.mission.domaine_id}_1`

      return {
        default: `/images/${thumbnail}.jpg`,
        x2: `/images/${thumbnail}@2x.jpg`
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
