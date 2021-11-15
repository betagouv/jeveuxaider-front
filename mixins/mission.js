export default {
  computed: {
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
    }
  }
}
