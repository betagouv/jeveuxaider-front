<template>
  <div>
    <Button
      variant="red"
      @click.native="showModal = true"
    >
      Annuler ma participation
    </Button>

    <ModalParticipationCancel
      :participation="participation"
      :is-open="showModal"
      @cancel="showModal = false"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import ModalParticipationCancel from '@/components/modal/ModalParticipationCancel.vue'

export default {
  components: {
    ModalParticipationCancel
  },
  props: {
    participation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showModal: false,
      loading: false
    }
  },
  methods: {
    // onCancelSubmit (participation) {
    //   this.$emit('updated', participation)
    // },
    // onMessagesAdded ($event) {
    //   this.$emit('messages-added', $event)
    // },
    async handleConfirm (payload) {
      if (this.loading) {
        return
      }
      this.loading = true
      const { data: participation } = await this.$axios.put(`/participations/${this.participation.id}/cancel`, payload)
      this.$emit('update', participation)
      this.loading = false
      this.showModal = false
    }
  }
}
</script>
