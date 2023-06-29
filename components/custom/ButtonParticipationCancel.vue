<template>
  <div>
    <Button
      variant="red"
      @click.native="showModal = true"
    >
      Annuler ma participation
    </Button>

    <ModalParticipationCancelByBenevole
      :participation="participation"
      :is-open="showModal"
      @cancel="showModal = false"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import ModalParticipationCancelByBenevole from '@/components/modal/ModalParticipationCancelByBenevole.vue'

export default {
  components: {
    ModalParticipationCancelByBenevole
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
    async handleConfirm (payload) {
      if (this.loading) {
        return
      }
      this.loading = true
      const { data: participation } = await this.$axios.put(`/participations/${this.participation.id}/cancel-by-benevole`, payload).catch(() => {})
      this.$emit('update', participation)
      this.loading = false
      this.showModal = false
    }
  }
}
</script>
