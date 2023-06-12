export default {
  data () {
    return {
      formIsDirty: false
    }
  },
  methods: {
  },
  beforeRouteLeave (to, from, next) {
    if (this.formIsDirty) {
      const answer = window.confirm('Vous avez des modifications non enregistrées.\r\nQuitter quand-même ?')
      if (answer) {
        return next()
      } else {
        return next(false)
      }
    }
    return next()
  }
}
