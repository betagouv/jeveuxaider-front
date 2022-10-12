export default {
  computed: {
    isMinors () { return !!this.$route.query.publics_volontaires?.split('|').includes('Mineurs') }
  },
  methods: {
    handleToggle () {
      const query = {
        ...this.$route.query,
        page: undefined
      }
      let publicsVolontaires = this.$route.query?.publics_volontaires?.split('|') ?? []

      if (!this.isMinor && !publicsVolontaires.includes('Mineurs')) {
        publicsVolontaires.push('Mineurs')
      } else {
        publicsVolontaires = publicsVolontaires.filter(value => value !== 'Mineurs')
      }

      if (publicsVolontaires?.length) {
        query.publics_volontaires = publicsVolontaires.join('|')
      } else {
        delete query.publics_volontaires
      }

      this.$router.push({
        path: this.$route.path,
        query
      })
    }
  }
}
