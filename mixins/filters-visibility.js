export default {
  data() {
    return {
      showAllFilters: false,
    }
  },
  computed: {
    activeFilters() {
      let filters = Object.keys(this.$route.query)
        .map((query) => {
          const regexResult = query.match(/\[(.*?)\]/)
          return regexResult ? regexResult[1] : query
        })
        .filter((f) => f && this.allFilters.includes(f) && !['page', 'search', 'sort'].includes(f))

      return filters || []
    },
    inactiveFilters() {
      return this.allFilters.filter((f) => !this.activeFilters.includes(f))
    },
    visibleFilters() {
      if (this.showAllFilters) {
        return this.allFilters
      }

      return this.allFilters.filter(
        (filter) =>
          filter &&
          (this.alwaysVisibleFilters.includes(filter) || this.activeFilters.includes(filter))
      )
    },
  },
}
