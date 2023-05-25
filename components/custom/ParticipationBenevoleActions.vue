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
      title="Validez votre participation"
      button-label="Valider"
      :is-open="showValidateParticipationModal"
      @confirm="handleConfirmValidateParticipation()"
      @cancel="showValidateParticipationModal = false"
    >
      <p>{{ $store.getters.profile.first_name }}, merci pour votre aide.</p>
      <p>Veuillez confirmer votre participation à la mission <strong>{{ participation.mission.name }}</strong>. {{ participation.mission.responsable.full_name }} de <strong>{{ participation.mission.structure.name }}</strong> sera notifié.</p>
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
      if (['Annulée', 'Validée', 'Refusée'].includes(this.participation.state)) {
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

      // Si créneaux avec une date passée
      if (this.hasCreneaux && this.participation.slots.filter(slot => this.$dayjs().startOf('day').isAfter(slot.date)).length > 0) {
        return true
      }

      // Si date de fin passée et mission ponctuel
      if (this.isMissionPonctual && this.mission.end_date && this.$dayjs().startOf('day').isAfter(this.mission.end_date)) {
        return true
      }

      // Si pas date de fin et date de début passée et mission ponctuel
      if (this.isMissionPonctual && !this.mission.end_date && this.$dayjs().startOf('day').isAfter(this.mission.start_date)) {
        return true
      }

      // Si date de participation créée depuis plus de 2 mois et mission recurrente
      if (this.isMissionRecurrent && this.mission.start_date && this.$dayjs().startOf('day').subtract(1, 'month').isAfter(this.participation.created_at)) {
        return true
      }

      return false
    },
    needTestimonial () {
      return this.participation.state === 'Validée' && this.mission.state === 'Terminée' && !this.participation.temoignage && !this.isTestimonialSubmitted
    }
  },
  methods: {
    handleConfirmCancelParticipation (payload) {
      this.$axios.put(`/participations/${this.participation.id}/cancel-by-benevole`, payload)
        .catch(() => {})
        .then((res) => {
          this.$emit('updated', res.data)
          this.showCancelParticipationModal = false
        })
    },
    handleConfirmValidateParticipation (payload) {
      this.$axios.put(`/participations/${this.participation.id}/validate-by-benevole`, payload)
        .catch(() => {})
        .then((res) => {
          this.$emit('updated', res.data)
          this.showValidateParticipationModal = false
        })
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
