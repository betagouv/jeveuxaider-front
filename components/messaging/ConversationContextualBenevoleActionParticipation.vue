<template>
  <div class="p-4 lg:p-6 flex justify-between items-center bg-jva-blue-500 text-white">
    <div class="text-xl font-bold">
      {{ label }}
    </div>
    <div class="flex space-x-4 items-center">
      <Button
        v-if="participationShouldBeDone"
        type="tertiary-no-outline"
        size="lg"
        @click.native.stop="showValidateParticipationModal = true"
      >
        Oui
      </Button>
      <Button
        v-if="needTestimonial"
        type="tertiary-no-outline"
        size="lg"
      >
        Laisser un témoignage
      </Button>
      <Button
        v-if="canCancel"
        type="tertiary-no-outline"
        size="lg"
        @click.native.stop="showCancelParticipationModal = true"
      >
        Annuler
      </Button>
      <Dropdown ref="dropdownUser">
        <template #button>
          <Button
            type="transparent"
            size="lg"
            icon="RiArrowDownSLine"
            icon-position="right"
            class="hover:bg-jva-blue-300"
          >
            Autre
          </Button>
        </template>

        <template #items>
          <div class="w-[300px] py-4">
            <DropdownOptionsItem v-if="canCancel" @click.native.stop="showCancelParticipationModal = true">
              <div class="px-4 text-base font-medium">
                Annuler la candidature
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canArchive" @click.native.stop="handleArchive">
              <div class="px-4 text-base font-medium">
                Archiver la conversation
              </div>
            </DropdownOptionsItem>
          </div>
        </template>
      </Dropdown>
    </div>
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
  data () {
    return {
      showCancelParticipationModal: false,
      showValidateParticipationModal: false,
      showTestimonialOverlay: false,
      isTestimonialSubmitted: false
    }
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    },
    participation () {
      return this.conversation.conversable
    },
    label () {
      if (this.participationShouldBeDone) {
        return 'Avez-vous réalisé la mission ?'
      }
      if (this.needTestimonial) {
        return 'Comment s\'est déroulée la mission ?'
      }
      switch (this.participation.state) {
        case 'Validée':
          return 'La candidature est validée'
        case 'Refusée':
          return 'La candidature est déclinée'
        case 'Annulée':
          return 'La candidature est annulée'
        default:
          return 'La candidature est '
      }
    },
    mission () {
      return this.participation.mission
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
    },
    canValidate () {
      return ['En attente de validation', 'En cours de traitement'].includes(this.participation.state)
    },
    canCancel () {
      if (['Annulée', 'Refusée'].includes(this.participation.state)) {
        return false
      }
      return !this.participationShouldBeDone
    },
    canArchive () {
      // @TODO
      return true
    }
  },
  methods: {
    handleArchive () {
      // @TODO
    },
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

<style>

</style>
