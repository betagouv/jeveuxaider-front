<template>
  <div class="p-4 lg:p-6 flex gap-4 lg:gap-6 justify-between items-center bg-jva-blue-500 text-white">
    <div class="text-lg lg:text-xl font-bold">
      {{ label }}
    </div>
    <div class="flex flex-shrink-0 gap-4 items-center">
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
        @click.native.stop="showTestimonialOverlay = true"
      >
        Laisser un témoignage
      </Button>
      <!-- <Button
        v-if="canCancel"
        type="tertiary-no-outline"
        size="lg"
        class="hidden lg:flex"
        @click.native.stop="showCancelParticipationModal = true"
      >
        Annuler
      </Button> -->
      <Dropdown ref="dropdownActions" class="flex-none">
        <template #button>
          <Button
            type="transparent"
            size="lg"
            icon="RiArrowDownSLine"
            icon-position="right"
            class="hidden lg:flex hover:bg-jva-blue-300"
          >
            Autre
          </Button>
          <Button
            type="transparent"
            size="md"
            icon="RiMore2Line"
            icon-only
            class="flex lg:hidden hover:bg-jva-blue-300"
          />
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
            <DropdownOptionsItem v-if="canUnarchive" @click.native.stop="handleUnarchive">
              <div class="px-4 text-base font-medium">
                Désarchiver la conversation
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
import Button from '@/components/dsfr/Button.vue'
import ModalParticipationCancelByBenevole from '@/components/modal/ModalParticipationCancelByBenevole.vue'
import TestimonialOverlay from '@/components/section/TestimonialOverlay.vue'
import MixinConversationParticipation from '@/mixins/conversation/participation'

export default {
  components: {
    Button,
    ModalParticipationCancelByBenevole,
    TestimonialOverlay
  },
  mixins: [MixinConversationParticipation],
  data () {
    return {
      showCancelParticipationModal: false,
      showValidateParticipationModal: false,
      showTestimonialOverlay: false,
      isTestimonialSubmitted: false
    }
  },
  computed: {
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
        case 'En cours de traitement':
          return 'La candidature est en cours de traitement'
        case 'En attente de validation':
          return 'La candidature est en attente de validation'
        default:
          return this.participation.state
      }
    },
    canValidate () {
      return ['En attente de validation', 'En cours de traitement'].includes(this.participation.state)
    },
    canCancel () {
      if (['Annulée', 'Validée', 'Refusée'].includes(this.participation.state)) {
        return false
      }
      return true
    }
  },
  methods: {
    handleConfirmCancelParticipation (payload) {
      this.$axios.put(`/participations/${this.participation.id}/cancel-by-benevole`, payload)
        .catch(() => {})
        .then(async (res) => {
          await this.$store.dispatch('messaging/refreshActiveConversation', this.conversation.id)
          await this.$store.dispatch('messaging/fetchNewConversationMessages', this.conversation.id)
          this.showCancelParticipationModal = false
        })
    },
    handleConfirmValidateParticipation (payload) {
      this.$axios.put(`/participations/${this.participation.id}/validate-by-benevole`, payload)
        .catch(() => {})
        .then(async (res) => {
          await this.$store.dispatch('messaging/refreshActiveConversation', this.conversation.id)
          await this.$store.dispatch('messaging/fetchNewConversationMessages', this.conversation.id)
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
