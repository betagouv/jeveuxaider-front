<template>
  <div
    class="p-4 lg:py-4 lg:px-6 flex gap-4 lg:gap-6 justify-between items-center bg-jva-blue-500 text-white"
  >
    <div class="text-base lg:text-xl font-bold flex-1 truncate">
      {{ label }}
    </div>
    <div class="flex flex-shrink-0 gap-4 items-center">
      <DsfrButton
        v-if="participationShouldBeDone"
        type="tertiary-no-outline"
        class="hidden lg:flex"
        @click.native.stop="showValidateParticipationModal = true"
      >
        Oui
      </DsfrButton>
      <DsfrButton
        v-if="needTestimonial"
        type="tertiary-no-outline"
        class="hidden lg:flex"
        @click.native.stop="showTestimonialOverlay = true"
      >
        Laisser un témoignage
      </DsfrButton>

      <BaseDropdown ref="dropdownActions" class="flex-none">
        <template #button>
          <DsfrButton
            type="transparent"
            icon="RiArrowDownSLine"
            icon-position="right"
            class="hidden lg:flex hover:bg-jva-blue-300"
          >
            Autre
          </DsfrButton>
          <DsfrButton
            type="transparent"
            icon="RiMore2Line"
            icon-only
            class="flex lg:hidden hover:bg-jva-blue-300"
          />
        </template>

        <template #items>
          <div class="w-full sm:w-[300px]">
            <BaseDropdownOptionsItem
              v-if="participationShouldBeDone"
              class="lg:hidden"
              @click.native.stop="showValidateParticipationModal = true"
            >
              Oui, je valide ma participation
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem
              v-if="needTestimonial"
              class="lg:hidden"
              @click.native.stop="showTestimonialOverlay = true"
            >
              Laisser un témoignage
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem
              v-if="canCancel"
              @click.native.stop="showCancelParticipationModal = true"
            >
              Annuler la participation
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem v-if="canArchive" @click.native.stop="handleArchive">
              Archiver la conversation
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem v-if="canUnarchive" @click.native.stop="handleUnarchive">
              Désarchiver la conversation
            </BaseDropdownOptionsItem>
          </div>
        </template>
      </BaseDropdown>
    </div>
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
import MixinConversationParticipation from '@/mixins/conversation/participation'

export default defineNuxtComponent({
  components: {
    TestimonialOverlay,
  },
  mixins: [MixinConversationParticipation],
  data() {
    return {
      showCancelParticipationModal: false,
      showValidateParticipationModal: false,
      showTestimonialOverlay: false,
      isTestimonialSubmitted: false,
    }
  },
  computed: {
    label() {
      if (this.participationShouldBeDone) {
        return 'Avez-vous réalisé la mission ?'
      }
      if (this.needTestimonial) {
        return "Comment s'est déroulée la mission ?"
      }
      switch (this.participation.state) {
        case 'Validée':
          return 'La participation est validée'
        case 'Refusée':
          return 'La participation est refusée'
        case 'Annulée':
          return 'La participation est annulée'
        case 'En cours de traitement':
          return 'La participation est en cours de traitement'
        case 'En attente de validation':
          return 'La participation est en attente de validation'
        default:
          return this.participation.state
      }
    },
    canValidate() {
      return ['En attente de validation', 'En cours de traitement'].includes(
        this.participation.state
      )
    },
    canCancel() {
      if (['Annulée', 'Refusée'].includes(this.participation.state)) {
        return false
      }
      return true
    },
  },
  methods: {
    handleConfirmCancelParticipation(payload) {
      apiFetch(`/participations/${this.participation.id}/cancel-by-benevole`, {
        method: 'PUT',
        body: payload,
      })
        .catch(() => {})
        .then(async (res) => {
          await this.$stores.messaging.refreshActiveConversation(this.conversation.id)
          await this.$stores.messaging.fetchNewConversationMessages(this.conversation.id)
          this.showCancelParticipationModal = false
        })
    },
    handleConfirmValidateParticipation(payload) {
      apiFetch(`/participations/${this.participation.id}/validate-by-benevole`, {
        method: 'PUT',
        body: payload,
      })
        .catch(() => {})
        .then(async (res) => {
          await this.$stores.messaging.refreshActiveConversation(this.conversation.id)
          await this.$stores.messaging.fetchNewConversationMessages(this.conversation.id)
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
