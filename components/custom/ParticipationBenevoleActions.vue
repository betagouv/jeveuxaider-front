<template>
  <div v-if="showActions" class="p-6">
    <template v-if="needTestimonial">
      <div class="flex justify-between items-center">
        <div class="text-sm font-bold text-black">
          Comment s'est déroulée la mission ?
        </div>
        <div class="flex justify-end gap-2">
          <Button type="tertiary" size="sm" @click.native.stop="showTestimonialOverlay = true">
            Laisser un témoignage
          </Button>
        </div>
      </div>
    </template>
    <template v-if="participationShouldBeDone">
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
    </template>
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
    <ModalParticipationCancel
      :participation="participation"
      :is-open="showCancelParticipationModal"
      @cancel="showCancelParticipationModal = false"
      @confirm="handleConfirmCancelParticipation"
    />

    <TestimonialOverlay
      :is-open="showTestimonialOverlay"
      :participation="participation"
      @close="onTestimonialOverlayClose"
    />
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import ModalParticipationCancel from '@/components/modal/ModalParticipationCancel.vue'
import TestimonialOverlay from '@/components/section/TestimonialOverlay.vue'

export default {
  components: {
    Button,
    ModalParticipationCancel,
    TestimonialOverlay
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
      showValidateParticipationModal: false,
      showTestimonialOverlay: false,
      isTestimonialSubmitted: false
    }
  },
  computed: {
    mission () {
      return this.participation.mission
    },
    showActions () {
      return this.participationShouldBeDone || this.needTestimonial || this.canCancelParticipation
    },
    canCancelParticipation () {
      if (['Annulée', 'Validée'].includes(this.participation.state)) {
        return false
      }
      return !this.participationShouldBeDone
    },
    hasCreneaux () {
      return this.participation.slots?.length > 0
    },
    isMissionRecurrent () {
      return this.participation.mission.date_type === 'recurring'
    },
    isMissionPonctual () {
      return this.participation.mission.date_type === 'ponctual'
    },
    participationShouldBeDone () {
      if (!['En attente de validation', 'En cours de traitement'].includes(this.participation.state)) {
        return false
      }

      // Si participation créé depuis moins de 2 jours
      if (this.$dayjs().subtract(2, 'days').isBefore(this.participation.created_at)) {
        return false
      }

      // Si créneaux avec une date passée
      if (this.hasCreneaux && this.participation.slots.filter(slot => this.$dayjs().isAfter(slot.date)).length > 0) {
        return true
      }

      // Si date de fin passée et mission ponctuel
      if (this.isMissionPonctual && this.mission.end_date && this.$dayjs().isAfter(this.mission.end_date)) {
        return true
      }

      // Si pas date de fin et date de début passée et mission ponctuel
      if (this.isMissionPonctual && !this.mission.end_date && this.$dayjs().isAfter(this.mission.start_date)) {
        return true
      }

      // Si date de participation créée depuis plus de 2 mois et mission recurrente
      if (this.isMissionRecurrent && this.mission.start_date && this.$dayjs().subtract(2, 'month').isAfter(this.participation.created_at)) {
        return true
      }

      return false
    },
    needTestimonial () {
      return this.participation.state === 'Validée' && this.mission.state === 'Terminée' && !this.participation.temoignage && !this.isTestimonialSubmitted
    }
  },
  methods: {
    async handleConfirmCancelParticipation (payload) {
      const { data: participation } = await this.$axios.put(`/participations/${this.participation.id}/cancel-by-benevole`, payload).catch(() => {})
      this.$emit('updated', participation)
      this.showCancelParticipationModal = false
    },
    async handleConfirmValidateParticipation (payload) {
      const { data: participation } = await this.$axios.put(`/participations/${this.participation.id}/validate-by-benevole`, payload).catch(() => {})
      this.$emit('updated', participation)
      this.showValidateParticipationModal = false
    },
    onTestimonialOverlayClose (testimonialHasBeenCreated) {
      this.showTestimonialOverlay = false
      if (testimonialHasBeenCreated) {
        this.isTestimonialSubmitted = true
      }
    }
  }
}
</script>
