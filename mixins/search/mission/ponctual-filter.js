export default {
  computed: {
    isPonctual () { return !!this.$route.query.date_type?.split('|').includes('ponctual') }
  },
  methods: {
    handleToggle () {
      const query = {
        ...this.$route.query,
        page: undefined
      }
      let dateTypes = this.$route.query?.date_type?.split('|') ?? []

      if (!dateTypes.includes('ponctual')) {
        dateTypes.push('ponctual')
      } else {
        dateTypes = dateTypes.filter(value => value !== 'ponctual')
      }

      if (dateTypes?.length) {
        query.date_type = dateTypes.join('|')
      } else {
        delete query.date_type
      }

      this.$router.push({
        path: this.$route.path,
        query
      })
    }
  }
}
