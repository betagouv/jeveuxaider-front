export default {
  methods: {
    domaineColor (domaineId) {
      return this.$labels.domaines.find(domaine => domaine.key === domaineId)?.color
    },
    domaineBackgroundColor (domaineId) {
      return this.$labels.domaines.find(domaine => domaine.key === domaineId)?.bg
    },
    domaineLabel (domaineId) {
      return this.$labels.domaines.find(domaine => domaine.key === domaineId)?.label
    }
  }
}
