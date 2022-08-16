export default {
  data () {
    return {
      operations: [],
      isBulkAll: false
    }
  },
  computed: {
    bulkOperationIsActive () {
      return this.operations.length > 0
    },
    nbOperations () {
      const nbOperations = this.isBulkAll ? this.queryResult.total : this.operations.length
      return this.$options.filters.pluralize(nbOperations, 'sélectionnée')
    }
  },
  watch: {
    queryResult (newQueryResult, oldQueryResult) {
      this.operations = this.isBulkAll && (newQueryResult.current_page != oldQueryResult.current_page) ? newQueryResult.data : []
    }
  },
  methods: {
    toggleBulkAll () {
      this.isBulkAll = !this.isBulkAll
      this.operations = this.isBulkAll ? this.queryResult.data : []
    }
  }
}
