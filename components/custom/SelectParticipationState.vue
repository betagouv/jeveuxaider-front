<template>
  <div>
    <BaseSelectWithDescription
      :size="size"
      :options="$labels.participation_workflow_states"
      :modelValue="modelValue"
      @selected="handleSelected($event)"
    />

    <ModalParticipationDeclineByResponsable
      :participation="participation"
      :is-open="showModalDecline"
      @cancel="showModalDecline = false"
      @confirm="handleConfirmDecline"
    />
  </div>
</template>

<script>
import ModalParticipationDeclineByResponsable from '@/components/modal/ModalParticipationDeclineByResponsable.vue'

export default defineNuxtComponent({
  emits: ['selected'],
  components: {
    ModalParticipationDeclineByResponsable,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    participation: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
      validator: (s) => ['sm', 'md'].includes(s),
    },
  },
  data() {
    return {
      showModalDecline: false,
    }
  },
  methods: {
    handleSelected(payload) {
      if (payload.key == 'Refusée') {
        this.showModalDecline = true
      } else {
        this.$emit('selected', payload)
      }
    },
    handleConfirmDecline(payload) {
      this.$emit('selected', { key: 'Refusée', form: payload })
      this.showModalDecline = false
    },
  },
})
</script>
