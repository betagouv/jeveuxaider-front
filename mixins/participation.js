export default {
  computed: {
    canEditStatut () {
      if (this.$store.getters.contextRole == 'admin') {
        return true
      }
      if (
        this.$store.getters.contextRole == 'responsable'
      ) {
        return true
      }
      return false
    }
  }
}
