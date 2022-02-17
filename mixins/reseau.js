export default {
  computed: {
    image1 () {
      return (
        this.reseau?.override_image_1?.xxl ??
        (this.reseau?.image_1
          ? `/images/reseaux/domaines/${this.reseau.image_1}.jpg, /images/reseaux/domaines/${this.reseau.image_1}@2x.jpg`
          : this.reseau.domaines.length > 0
            ? `/images/reseaux/domaines/${this.reseau.domaines[0]}_1.jpg, /images/reseaux/domaines/${this.reseau.domaines[0]}_1@2x.jpg`
            : '/images/reseaux/domaines/1_1.jpg, /images/reseaux/domaines/1_1@2x.jpg')
      )
    },
    image2 () {
      return (
        this.reseau?.override_image_2?.xxl ??
        (this.reseau?.image_2
          ? `/images/reseaux/domaines/${this.reseau.image_2}.jpg, /images/reseaux/domaines/${this.reseau.image_2}@2x.jpg`
          : this.reseau.domaines.length > 0
            ? `/images/reseaux/domaines/${this.reseau.domaines[0]}_1.jpg, /images/reseaux/domaines/${this.reseau.domaines[0]}_1@2x.jpg`
            : '/images/reseaux/domaines/2_1.jpg, /images/reseaux/domaines/2_1@2x.jpg')
      )
    },
    reseauCity () {
      if (this.reseau.city?.includes('Paris')) {
        return 'Paris'
      } else if (this.reseau.city?.includes('Lyon')) {
        return 'Lyon'
      } else if (this.reseau.city?.includes('Marseille')) {
        return 'Marseille'
      } else {
        return this.reseau?.city
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
