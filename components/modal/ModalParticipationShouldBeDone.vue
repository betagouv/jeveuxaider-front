<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        v-scroll-lock="isOpen"
        :is-open="isOpen"
        :title="modalTitle"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div v-if="step == 'form_has_participate'" class="space-y-6">
          <div class="bg-[#F5F5FE] border-l-[#6A6AF4] p-6 border-l-4">
            <div class="font-semibold text-xl mb-1">{{ participation.mission.name }}</div>
            <div>via l'association {{ participation.mission.structure.name }}</div>
          </div>

          <BaseFormControl
            html-for="has_participate"
            :error="getFieldError('has_participate')"
            required
          >
            <BaseRadioGroup
              v-model="has_participate"
              :options="[
                { label: 'Oui, j’ai participé ✅', key: 'yes' },
                { label: 'Non, mais probablement bientôt 🤞', key: 'not_yet' },
                { label: 'Non, et j’annule ma participation ❌', key: 'no' },
              ]"
              classWrapper="space-y-4"
            />
          </BaseFormControl>
          <div>Le responsable de la mission sera informé de votre action.</div>
        </div>
        <div v-else-if="step == 'has_confirm_participation'" class="space-y-6">
          <div>
            On ne vous le dira jamais assez : <strong>merci pour votre engagement !</strong>
          </div>
        </div>
        <div v-else-if="step == 'form_confirm_cancel_participation'" class="space-y-6">
          <div>
            Vous êtes sur le point d'annuler votre participation à la mission
            <span class="font-semibold">{{ participation.mission.name }}</span
            >.
          </div>

          <BaseFormControl
            html-for="cancelReason"
            label="Veuillez préciser la raison"
            :error="getFieldError('cancelReason')"
            required
          >
            <BaseRadioGroup
              v-model="cancelReason"
              :options="$labels.participation_canceled_by_benevole_reasons"
              classWrapper="space-y-4"
            />
          </BaseFormControl>
          <BaseFormControl html-for="content" label="Précisions">
            <BaseTextarea
              v-model="reasonMessage"
              name="content"
              placeholder="Plus d'explications si nécéssaire"
            />
            <template #description>
              <p class="text-sm text-gray-600 mt-2">
                Le message sera envoyé au responsable de la mission
              </p>
              <p></p
            ></template>
          </BaseFormControl>
        </div>
        <div v-else-if="step == 'waiting_response'" class="space-y-3">
          <div>On espère que vous pourrez bientôt réaliser votre mission !</div>
          <div>
            Si vous la réalisez ou si vous souhaitez annuler votre participation dans les prochaines
            semaines ou prochains mois, nous vous invitons à mettre à jour votre participation.
          </div>
        </div>
        <div v-else-if="step == 'has_cancel_participation'" class="space-y-3">
          <div>On espère que vous trouverez rapidement une mission qui vous correspond 🤞🏻</div>
          <div>
            Si vous souhaitez qu’on vous envoie des missions personnalisées, n’hésitez pas à mettre
            à jour votre profil.
          </div>
        </div>

        <template #footer>
          <DsfrButton
            v-if="step == 'form_has_participate' || step == 'form_confirm_cancel_participation'"
            :disabled="loading"
            type="secondary"
            @click.native="$emit('cancel')"
          >
            Retour
          </DsfrButton>
          <DsfrButton
            v-if="step == 'form_has_participate'"
            :loading="loading"
            @click.native="handleSubmitHasParticipate"
          >
            Confirmer
          </DsfrButton>
          <DsfrButton
            v-if="step == 'form_confirm_cancel_participation'"
            :loading="loading"
            @click.native="handleConfirmCancelParticipation"
          >
            Confirmer
          </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  emits: ['confirm', 'cancel', 'updated'],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    participation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      modalTitle: '🙌 Avez-vous participé à cette mission ?',
      step: 'form_has_participate', // wiating_response, has_confirm_participation, form_confirm_cancel_participation, has_cancel_participation
      has_participate: null,
      cancelReason: null,
      reasonMessage: null,
      errors: [],
    }
  },
  mounted() {
    if (this.isOpen) {
      this.$plausible.trackEvent('Validation bénévole - Opened')
    }
  },
  methods: {
    getFieldError(field) {
      return this.errors.find((e) => e.field === field)?.message
    },
    handleSubmitHasParticipate() {
      if (this.loading) {
        return
      }
      if (!this.has_participate) {
        this.errors.push({
          field: 'has_participate',
          message: 'Veuillez sélectionner une option',
        })
        return
      }
      switch (this.has_participate) {
        case 'yes':
          this.handleConfirmValidateParticipation()
          break
        case 'no':
          this.modalTitle = '❌ Annuler ma participation ?'
          this.step = 'form_confirm_cancel_participation'
          break
        case 'not_yet':
          this.modalTitle = '🤞 Merci pour votre réponse'
          this.step = 'waiting_response'
          this.$plausible.trackEvent('Validation bénévole - CTA - Non pas encore')
          break
      }
    },
    handleConfirmValidateParticipation() {
      this.loading = true
      apiFetch(`/participations/${this.participation.id}/validate-by-benevole`, {
        method: 'PUT',
      })
        .then(() => {
          this.loading = false
          this.step = 'has_confirm_participation'
          this.modalTitle = '✅ Votre participation est confirmée'
          this.$plausible.trackEvent('Validation bénévole - CTA - Oui')
          this.$emit('updated')
        })
        .catch(() => (this.loading = false))
    },
    handleConfirmCancelParticipation() {
      if (this.loading) {
        return
      }
      if (!this.cancelReason) {
        this.errors.push({
          field: 'cancelReason',
          message: 'Veuillez sélectionner une option',
        })
        return
      }
      this.loading = true
      apiFetch(`/participations/${this.participation.id}/cancel-by-benevole`, {
        method: 'PUT',
        body: {
          reason: this.cancelReason,
          content: this.reasonMessage,
        },
      })
        .then(() => {
          this.loading = false
          this.step = 'has_cancel_participation'
          this.modalTitle = '❌ Votre participation est annulée'
          this.$emit('updated')
          this.$plausible.trackEvent('Validation bénévole - CTA - Non annulation')
        })
        .catch(() => (this.loading = false))
    },
  },
})
</script>
