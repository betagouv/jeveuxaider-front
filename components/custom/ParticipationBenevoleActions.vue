<template>
  <div v-if="showActions" class="p-6 space-y-2">
    <template v-if="needTestimonial">
      <div class="sm:flex justify-between items-center">
        <div class="text-sm font-bold text-black">Comment s'est déroulée la mission ?</div>
        <div class="flex sm:justify-end gap-2">
          <DsfrButton type="tertiary" size="sm" @click.native.stop="showTestimonialOverlay = true">
            Laisser un témoignage
          </DsfrButton>
        </div>
      </div>
    </template>
    <template v-if="participationShouldBeDone">
      <div class="sm:flex justify-between items-center">
        <div class="text-sm font-bold text-black">Avez-vous réalisé la mission ?</div>
        <div class="flex sm:justify-end gap-2">
          <DsfrButton
            icon="RiCheckLine"
            type="tertiary"
            size="sm"
            @click.native.stop="showValidateParticipationModal = true"
          >
            Oui
          </DsfrButton>
          <DsfrButton
            type="tertiary"
            size="sm"
            @click.native.stop="showCancelParticipationModal = true"
          >
            Annuler ma participation
          </DsfrButton>
        </div>
      </div>
    </template>
    <template v-if="canCancelParticipation">
      <div class="sm:flex justify-between items-center">
        <div class="text-sm font-bold text-black">Vous ne souhaitez plus participer ?</div>
        <div class="flex sm:justify-end gap-2">
          <DsfrButton
            type="tertiary"
            size="sm"
            @click.native.stop="showCancelParticipationModal = true"
          >
            Annuler ma participation
          </DsfrButton>
        </div>
      </div>
    </template>
    <BaseAlertDialog
      title="Validez votre participation"
      button-label="Valider"
      :is-open="showValidateParticipationModal"
      @confirm="handleConfirmValidateParticipation()"
      @cancel="showValidateParticipationModal = false"
    >
      <p>{{ $stores.auth.profile?.first_name }}, merci pour votre aide.</p>
      <p>
        Veuillez confirmer votre participation à la mission
        <strong>{{ participation.mission.name }}</strong
        >. {{ participation.mission.responsables[0].full_name }} de
        <strong>{{ participation.mission.structure.name }}</strong> sera notifié.
      </p>
    </BaseAlertDialog>
    <ModalParticipationCancelByBenevole
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
import TestimonialOverlay from '@/components/section/TestimonialOverlay.vue'

export default defineNuxtComponent({
  components: {
    TestimonialOverlay,
  },
  props: {
    participation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showCancelParticipationModal: false,
      showValidateParticipationModal: false,
      showTestimonialOverlay: false,
      isTestimonialSubmitted: false,
    }
  },
  computed: {
    mission() {
      return this.participation.mission
    },
    showActions() {
      return this.participationShouldBeDone || this.needTestimonial || this.canCancelParticipation
    },
    canCancelParticipation() {
      if (['Annulée', 'Refusée', 'Validée'].includes(this.participation.state)) {
        return false
      }

      return !this.participationShouldBeDone
    },
    hasCreneaux() {
      return this.participation.slots?.length > 0
    },
    isMissionRecurrent() {
      return this.participation.mission.date_type === 'recurring'
    },
    isMissionPonctual() {
      return this.participation.mission.date_type === 'ponctual'
    },
    participationShouldBeDone() {
      if (
        !['En attente de validation', 'En cours de traitement'].includes(this.participation.state)
      ) {
        return false
      }

      // Si créneaux avec une date passée
      if (
        this.hasCreneaux &&
        this.participation.slots.filter((slot) => this.$dayjs().startOf('day').isAfter(slot.date))
          .length > 0
      ) {
        return true
      }

      // Si date de fin passée et mission ponctuel
      if (
        this.isMissionPonctual &&
        this.mission.end_date &&
        this.$dayjs().startOf('day').isAfter(this.mission.end_date)
      ) {
        return true
      }

      // Si pas date de fin et date de début passée et mission ponctuel et participation plus d'1 mois
      if (
        this.isMissionPonctual &&
        !this.mission.end_date &&
        this.$dayjs().startOf('day').isAfter(this.mission.start_date) &&
        this.$dayjs().startOf('day').subtract(1, 'month').isAfter(this.participation.created_at)
      ) {
        return true
      }

      // Si date de participation créée depuis plus de 2 mois et mission recurrente
      if (
        this.isMissionRecurrent &&
        this.mission.start_date &&
        this.$dayjs().startOf('day').subtract(1, 'month').isAfter(this.participation.created_at)
      ) {
        return true
      }

      return false
    },
    needTestimonial() {
      return (
        this.participation.state === 'Validée' &&
        this.mission.state === 'Terminée' &&
        !this.participation.temoignage &&
        !this.isTestimonialSubmitted
      )
    },
  },
  methods: {
    handleConfirmCancelParticipation(payload) {
      apiFetch(`/participations/${this.participation.id}/cancel-by-benevole`, {
        method: 'PUT',
        body: payload,
      })
        .catch(() => {})
        .then((res) => {
          this.$emit('updated', res)
          this.showCancelParticipationModal = false
        })
    },
    handleConfirmValidateParticipation(payload) {
      apiFetch(`/participations/${this.participation.id}/validate-by-benevole`, {
        method: 'PUT',
        body: payload,
      })
        .catch(() => {})
        .then((res) => {
          this.$emit('updated', res)
          this.showValidateParticipationModal = false
        })
    },
    onTestimonialOverlayClose(testimonialHasBeenCreated) {
      this.showTestimonialOverlay = false
      if (testimonialHasBeenCreated) {
        this.isTestimonialSubmitted = true
      }
    },
  },
})
</script>
