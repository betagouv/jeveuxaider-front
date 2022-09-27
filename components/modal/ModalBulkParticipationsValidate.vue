<template>
  <ModalBulkOperations
    endpoint="bulk-operation/participations/validate"
    :operations="operations"
    :modal-title="modalTitle"
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
    operations: {
      type: Array,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      state: null
    }
  },
  computed: {
    participationNames () {
      const names = this.operations.slice(0, 5).map(participation => participation.profile?.full_name).join(', ')
      return this.operations.length > 5 ? `${names}... (+${this.operations.length - 5})` : names
    },
    modalTitle () {
      switch (this.state) {
        case 'processing':
          return 'En cours de traitement'
        case 'processed':
          return this.$options.filters.pluralize(
            this.operations.length,
            'participation a été validée',
            'participations ont été validées'
          )
        default:
          return `Vous êtes sur le point de valider ${this.$options.filters.pluralize(this.operations.length, 'participation')}&nbsp;:`
      }
    }
  }
}
</script>
