export default {
  methods: {
    domaineColor(domaineId) {
      return this.$labels.domaines.find((domaine) => domaine.key === domaineId)?.color
    },
    domaineTextColor(domaineId) {
      return this.$labels.domaines.find((domaine) => domaine.key === domaineId)?.textColor
    },
    domaineBackgroundColor(domaineId) {
      return this.$labels.domaines.find((domaine) => domaine.key === domaineId)?.bg
    },
    domaineLabel(domaineId) {
      return this.$labels.domaines.find((domaine) => domaine.key === domaineId)?.label
    },
  },
}
