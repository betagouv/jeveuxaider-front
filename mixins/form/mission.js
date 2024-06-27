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
        this.form = _cloneDeep(newVal)
      },
      immediate: true,
    },
  },
}
