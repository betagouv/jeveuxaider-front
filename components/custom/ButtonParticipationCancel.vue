<template>
  <div>
    <BaseButton variant="red" @click.native="showModal = true">
      Annuler ma participation
    </BaseButton>

    <ModalParticipationCancelByBenevole
      :participation="participation"
      :is-open="showModal"
      @cancel="showModal = false"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    participation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      loading: false,
    }
  },
  methods: {
    async handleConfirm(payload) {
      if (this.loading) {
        return
      }
      this.loading = true
      const participation = await apiFetch(
        `/participations/${this.participation.id}/cancel-by-benevole`,
        {
          method: 'PUT',
          body: payload,
        }
      ).catch(() => {})
      this.$emit('update', participation)
      this.loading = false
      this.showModal = false
    },
  },
})
</script>
