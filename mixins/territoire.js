export default {
  computed: {
    canEditStatut () {
      const rolesWhoCanEdit = this.$options.filters.label(this.territoire.state, 'territoire_workflow_states', 'roles')
      console.log('rolesWhoCanEdit', rolesWhoCanEdit)
      return !!rolesWhoCanEdit.includes(this.$store.getters.contextRole)
    }
  },
  methods: {
    // defaultThumbnail (e) {
    //   e.target.src = '/images/missions/card-thumbnail-default.jpg'
    //   e.target.srcset = '/images/missions/card-thumbnail-default@2x.jpg 2x'
    // }
  }
}
