<template>
  <div v-if="showFooter" class="bg-gray-50 p-4">
    <template v-if="hasMissionStarted">
      <div class="flex justify-between items-center">
        <div class="text-sm font-bold text-black">
          Avez-vous réalisé la mission ?
        </div>
        <div class="flex justify-end gap-2">
          <Button icon="RiCheckLine" type="tertiary" size="sm" @click.native.stop="showCancelParticipationModal = true">
            Oui
          </Button>
          <Button type="tertiary" size="sm" @click.native.stop="showCancelParticipationModal = true">
            Annuler ma participation
          </Button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-between items-center">
        <div class="text-sm font-bold text-black">
          Vous ne souhaitez plus participer ?
        </div>
        <div class="flex justify-end gap-2">
          <Button type="tertiary" size="sm" @click.native.stop="showCancelParticipationModal = true">
            Annuler ma participation
          </Button>
        </div>
      </div>
    </template>
    <ModalParticipationCancel
      :participation="participation"
      :is-open="showCancelParticipationModal"
      @cancel="showCancelParticipationModal = false"
      @confirm="handleConfirmCancelParticipation"
    />
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import ModalParticipationCancel from '@/components/modal/ModalParticipationCancel.vue'

export default {
  components: {
    Button,
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
      showCancelParticipationModal: false
    }
  },
  computed: {
    mission () {
      return this.participation.mission
    },
    showFooter () {
      return ['En attente de validation', 'En cours de traitement'].includes(this.participation.state)
    },
    hasMissionStarted () {
      return this.$dayjs().isAfter(this.mission.start_date)
    }
  },
  methods: {
    handleConfirmCancelParticipation (payload) {
      console.log('handleConfirmCancelParticipation', payload)
      if (this.participation.conversation) {
        this.$router.push(`/messages/${this.participation.conversation.id}`)
      }
    //  if (this.loading) {
    //     return
    //   }
    //   this.loading = true
    //   const { data: participation } = await this.$axios.put(`/participations/${this.participation.id}/cancel`, payload).catch(() => {})
    //   const nbNewMessages = payload.content?.trim().length ? 2 : 1
    //   this.$store.commit('messaging/incrementNewMessagesCount', nbNewMessages)
    //   this.$emit('update', participation)
    //   this.loading = false
    //   this.showModal = false
    }
  }
}
</script>

<style>

</style>
