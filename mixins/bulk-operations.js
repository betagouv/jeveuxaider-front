export default {
  data () {
    return {
      operations: []
    }
  },
  computed: {
    bulkOperationIsActive () {
      return this.operations.length > 0
    }
  }
}
