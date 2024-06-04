export default {
  data() {
    return {
      loading: false,
      form: null,
    }
  },
  watch: {
    '$stores.formMission.mission': {
      handler(newVal) {
        this.form = { ...newVal }
        console.log('watcher mixins', this.form)
        if (this.form) {
          this.form.domaine_id = this.form.template?.domaine_id || this.form.domaine_id
          this.form.domaine_secondary_id =
            this.form.template?.domaine_secondary_id || this.form.domaine_secondary_id
          this.form.activity_id = this.form.template?.activity_id || this.form.activity_id
          this.form.activity_secondary_id =
            this.form.template?.activity_secondary_id || this.form.activity_secondary_id
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
        }
      },
      immediate: true,
    },
  },
}
