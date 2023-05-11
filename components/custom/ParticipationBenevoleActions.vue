<template>
  <div v-if="showActions" class="p-6">
    <template v-if="needTestimonial">
      <div class="flex justify-between items-center">
        <div class="text-sm font-bold text-black">
          Comment s'est déroulée la mission ?
        </div>
        <div class="flex justify-end gap-2">
          <Button type="tertiary" size="sm" @click.native.stop="showCancelParticipationModal = true">
            Laisser un témoignage
          </Button>
        </div>
      </div>
    </template>
    <template v-if="checkParticipationProgress">
      <div class="flex justify-between items-center">
        <div class="text-sm font-bold text-black">
          Avez-vous réalisé la mission ?
        </div>
        <div class="flex justify-end gap-2">
          <Button
            icon="RiCheckLine"
            type="tertiary"
            size="sm"
            @click.native.stop="showValidateParticipationModal = true"
          >
            Oui
          </Button>
          <Button type="tertiary" size="sm" @click.native.stop="showCancelParticipationModal = true">
            Annuler ma participation
          </Button>
        </div>
      </div>
      <AlertDialog
        theme="warning"
        title="Valider votre participation"
        :is-open="showValidateParticipationModal"
        @confirm="handleConfirmValidateParticipation()"
        @cancel="showValidateParticipationModal = false"
      >
        <p>Vous êtes sur le point de valider votre participation à la mission <span class="font-semibold">{{ participation.mission.name }}</span>.</p>
        <p>Le responsable recevra une notification de votre action.</p>
      </AlertDialog>
    </template>
    <template v-if="canCancelParticipation">
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
      <ModalParticipationCancel
        :participation="participation"
        :is-open="showCancelParticipationModal"
        @cancel="showCancelParticipationModal = false"
        @confirm="handleConfirmCancelParticipation"
      />
    </template>
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
      showCancelParticipationModal: false,
      showValidateParticipationModal: false
    }
  },
  computed: {
    mission () {
      return this.participation.mission
    },
    showActions () {
      return this.checkParticipationProgress || this.needTestimonial || this.canCancelParticipation
    },
    canCancelParticipation () {
      return this.$dayjs().isBefore(this.mission.start_date)
    },
    checkParticipationProgress () {
      if (!['En attente de validation', 'En cours de traitement'].includes(this.participation.state)) {
        return false
      }

      if (this.mission.end_date && this.$dayjs().isAfter(this.mission.end_date)) {
        return true
      }

      return this.$dayjs().isAfter(this.mission.start_date)
    },
    needTestimonial () {
      return this.participation.state === 'Validée' && this.mission.state === 'Terminée' && !this.participation.temoignage
    }
  },
  methods: {
    async handleConfirmCancelParticipation (payload) {
      console.log('handleConfirmCancelParticipation', payload)
      const { data: participation } = await this.$axios.put(`/participations/${this.participation.id}/cancel-by-benevole`, payload).catch(() => {})
      this.$emit('updated', participation)
      this.showCancelParticipationModal = false
    },
    async handleConfirmValidateParticipation (payload) {
      console.log('handleConfirmValidateParticipation', payload)
      const { data: participation } = await this.$axios.put(`/participations/${this.participation.id}/validate-by-benevole`, payload).catch(() => {})
      this.$emit('updated', participation)
      this.showValidateParticipationModal = false
    }
  }
}
</script>

<style>

</style>
