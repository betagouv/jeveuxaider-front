<template>
  <div>
    <SelectWithDescription
      :size="size"
      :options="$labels.participation_workflow_states"
      :value="value"
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

export default {
  components: {
    ModalParticipationDeclineByResponsable
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    participation: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'md',
      validator: s => ['sm', 'md'].includes(s)
    }
  },
  data () {
    return {
      showModalDecline: false
    }
  },
  methods: {
    handleSelected (payload) {
      if (payload.key == 'Refusée') {
        this.showModalDecline = true
      } else {
        this.$store.commit('messaging/incrementNewMessagesCount')
        this.$emit('selected', payload)
      }
    },
    handleConfirmDecline (payload) {
      this.$emit('selected', { key: 'Refusée', form: payload })
      const nbNewMessages = payload.content?.trim().length ? 2 : 1
      this.$store.commit('messaging/incrementNewMessagesCount', nbNewMessages)
      this.showModalDecline = false
    }
  }
}
</script>
