export default {
  data() {
    return {
      loading: false,
      form: {},
      canCheckFormDirty: false,
    }
  },
  computed: {
    isFormDirty() {
      return !_isEqual(this.form, this.$stores.formMission.mission)
    },
  },
  watch: {
    '$stores.formMission.mission': {
      handler(newVal) {
        if (!newVal) {
          return
        }

        this.form = _cloneDeep(newVal)

        // Initialisation form
        // @todo: dans initMissionFields ?
        if (this.form.publics_volontaires === null) {
          this.form.publics_volontaires = ['Mineurs']
        }
        if (!this.form.participations_max) {
          this.form.participations_max = 1
        }
        if (this.form.publics_beneficiaires === null) {
          this.form.publics_beneficiaires = []
        }
      },
      immediate: true,
      deep: true,
    },
  },
}
