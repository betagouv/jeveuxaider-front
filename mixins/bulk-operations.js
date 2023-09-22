import BulkOperationActions from '@/components/bulk-operation/BulkOperationActions.vue'
import BulkOperationCheckbox from '@/components/bulk-operation/BulkOperationCheckbox.vue'

export default {
  components: {
    BulkOperationActions,
    BulkOperationCheckbox,
  },
  data() {
    return {
      operations: [],
    }
  },
  computed: {
    bulkOperationIsActive() {
      return this.operations.length > 0
    },
  },
}
