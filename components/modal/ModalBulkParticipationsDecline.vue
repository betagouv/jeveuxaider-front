<template>
  <ModalBulkOperations
    endpoint="bulk-operation/participations/decline"
    :operations="operations"
    :modal-title="modalTitle"
    :is-open="isOpen"
    @state-changed="state = $event"
    @close="$emit('close')"
    @processed="$emit('processed')"
  >
    <template #initialState="{ handleSubmit, endpoint }">
      <p class="text-gray-600">
        {{ participationNames }}
      </p>
      <FormParticipationDecline
        class="mt-4"
        :is-bulk-operation="true"
        @confirm="onFormConfirm($event, handleSubmit, endpoint)"
        :operations-count="operations.length"
      />
    </template>

    <template #submit>
      <DsfrButton is-submit form="form-participation-decline"> Confirmer </DsfrButton>
    </template>
  </ModalBulkOperations>
</template>

<script>
import ModalBulkOperations from '@/components/modal/ModalBulkOperations.vue'
import FormParticipationDecline from '@/components/form/FormParticipationDecline.vue'

export default defineNuxtComponent({
  components: {
    ModalBulkOperations,
    FormParticipationDecline,
  },
  props: {
    operations: {
      type: Array,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      state: null,
    }
  },
  computed: {
    participationNames() {
      const names = this.operations
        .slice(0, 5)
        .map((participation) => participation.profile?.full_name)
        .join(', ')
      return this.operations.length > 5 ? `${names}... (+${this.operations.length - 5})` : names
    },
    modalTitle() {
      switch (this.state) {
        case 'processing':
          return 'En cours de traitement'
        case 'processed':
          return this.$filters.pluralize(
            this.operations.length,
            'participation a été refusée',
            'participations ont été refusées'
          )
        default:
          return `Vous êtes sur le point de refuser ${this.$filters.pluralize(
            this.operations.length,
            'participation'
          )}`
      }
    },
  },
  methods: {
    onFormConfirm(form, handleSubmit, endpoint) {
      handleSubmit(endpoint, form)
    },
  },
})
</script>
