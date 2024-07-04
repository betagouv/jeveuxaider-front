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
        if (this.form.start_date) {
          this.form.with_dates = this.form.dates?.length > 0 ? 'yes' : 'no'
        }
        if (!this.form.prerequisites) {
          this.form.prerequisites = [null, null, null]
        }
        if (this.form.publics_volontaires === null) {
          this.form.publics_volontaires = ['Mineurs']
        }
        if (!this.form.participations_max) {
          this.form.participations_max = 1
        }
        if (this.form.addresses === null) {
          this.form.addresses = []
        }
        if (this.form.publics_beneficiaires === null) {
          this.form.publics_beneficiaires = []
        }
      },
      immediate: true,
    },
  },
}
