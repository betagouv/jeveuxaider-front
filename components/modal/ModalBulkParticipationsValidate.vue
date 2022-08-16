<template>
  <ModalBulkOperations
    endpoint="bulk-operation/participations/validate"
    :models="models"
    :modal-title="modalTitle"
    :is-bulk-all="isBulkAll"
    :query-result="queryResult"
    :is-open="isOpen"
    @state-changed="state = $event"
    @close="$emit('close')"
    @processed="$emit('processed')"
  >
    <template #initialState>
      <p class="text-gray-600">
        {{ participationNames }}
      </p>
    </template>
  </ModalBulkOperations>
</template>

<script>
import ModalBulkOperations from '@/components/modal/ModalBulkOperations.vue'

export default {
  components: {
    ModalBulkOperations
  },
  props: {
    models: {
      type: Array,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    isBulkAll: {
      type: Boolean,
      default: false
    },
    queryResult: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      state: null
    }
  },
  computed: {
    participationNames () {
      const names = this.models.slice(0, 5).map(participation => participation.profile?.full_name).join(', ')
      return this.nbOperations > 5 ? `${names}... (+${this.nbOperations - 5})` : names
    },
    modalTitle () {
      switch (this.state) {
        case 'processing':
          return 'En cours de traitement'
        case 'processed':
          return this.$options.filters.pluralize(
            this.nbOperations,
            'participation a été validée',
            'participations ont été validées'
          )
        default:
          return `Vous êtes sur le point de valider ${this.$options.filters.pluralize(this.nbOperations, 'participation')}&nbsp;:`
      }
    },
    nbOperations () {
      return this.isBulkAll ? this.queryResult.total : this.models.length
    }
  }
}
</script>
