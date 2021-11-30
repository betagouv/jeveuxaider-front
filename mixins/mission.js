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
      if (this.mission.template_id) {
        return `${this.mission.template.photo.thumb}, ${this.mission.template.photo.large} 2x`
      }
      if (this.mission.thumbnail) {
        thumbnail = `/images/domaines/${this.mission.thumbnail}.webp, /images/domaines/${this.mission.thumbnail}.jpg, /images/domaines/${this.mission.thumbnail}@2x.webp 2x, /images/domaines/${this.mission.thumbnail}@2x.jpg 2x, `
      } else {
        thumbnail = `/images/domaines/${this.mission.domaine_id}_1.webp, /images/domaines/${this.mission.domaine_id}_1.jpg, /images/domaines/${this.mission.domaine_id}_1@2x.webp 2x, /images/domaines/${this.mission.domaine_id}_1@2x.jpg 2x, `
      }
      return thumbnail
      // const thumbnail = this.mission.template_id
      //   ? `templates/${this.mission.template_id}`
      //   : this.mission.thumbnail
      //     ? `domaines/${this.mission.thumbnail}`
      //     : `domaines/${this.mission.domaine_id}_1`

      // return {
      //   default: `/images/${thumbnail}.jpg`,
      //   x2: `/images/${thumbnail}@2x.jpg`
      // }
    }
  },
  methods: {
    defaultThumbnail (e) {
      e.target.src = '/images/missions/card-thumbnail-default.jpg'
      e.target.srcset = '/images/missions/card-thumbnail-default@2x.jpg 2x'
    }
  }
}
