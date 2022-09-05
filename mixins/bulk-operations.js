export default {
  data () {
    return {
      operations: []
    }
  },
  computed: {
    bulkOperationIsActive () {
      return this.operations.length > 0
    },
    nbOperations () {
      return this.$options.filters.pluralize(this.operations.length, 'sélectionnée')
    }
  }
}
