<template>
  <div>
    <SelectWithDescription :size="size" :options="statesAvailable" :value="value" @selected="handleSelected($event)" />

    <ModalParticipationDecline
      :participation="participation"
      :is-open="showModalDecline"
      @cancel="showModalDecline = false"
      @confirm="handleConfirmDecline"
    />
  </div>
</template>

<script>
import ModalParticipationDecline from '@/components/modal/ModalParticipationDecline.vue'

export default {
  components: {
    ModalParticipationDecline
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
  computed: {
    statesAvailable () {
      const toStates = this.$options.filters.label(this.value, 'participation_workflow_states', 'to')
      return this.$labels.participation_workflow_states.filter(state => toStates.includes(state.key))
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
