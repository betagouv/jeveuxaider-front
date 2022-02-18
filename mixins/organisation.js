export default {
  computed: {
    image1 () {
      return (
        this.organisation?.override_image_1?.xxl ??
        (this.organisation?.image_1
          ? `/images/organisations/domaines/${this.organisation.image_1}.jpg, /images/organisations/domaines/${this.organisation.image_1}@2x.jpg`
          : this.organisation.domaines.length > 0
            ? `/images/organisations/domaines/${this.organisation.domaines[0]}_1.jpg, /images/organisations/domaines/${this.organisation.domaines[0]}_1@2x.jpg`
            : '/images/organisations/domaines/1_1.jpg, /images/organisations/domaines/1_1@2x.jpg')
      )
    },
    image2 () {
      return (
        this.organisation?.override_image_2?.xxl ??
        (this.organisation?.image_2
          ? `/images/organisations/domaines/${this.organisation.image_2}.jpg, /images/organisations/domaines/${this.organisation.image_2}@2x.jpg`
          : this.organisation.domaines.length > 0
            ? `/images/organisations/domaines/${this.organisation.domaines[0]}_1.jpg, /images/organisations/domaines/${this.organisation.domaines[0]}_1@2x.jpg`
            : '/images/organisations/domaines/2_1.jpg, /images/organisations/domaines/2_1@2x.jpg')
      )
    },
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
      console.log('rolesWhoCanEdit', rolesWhoCanEdit)
      return !!rolesWhoCanEdit.includes(this.$store.getters.contextRole)
    }
  },
  methods: {
    defaultThumbnail (e) {
      e.target.src = '/images/missions/card-thumbnail-default.jpg'
      e.target.srcset = '/images/missions/card-thumbnail-default@2x.jpg 2x'
    }
  }
}
