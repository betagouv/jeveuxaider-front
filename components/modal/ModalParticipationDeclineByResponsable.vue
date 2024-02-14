<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        icon="RiErrorWarningLine"
        title="Refuser la participation"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div class="space-y-4">
          <div>
            Vous êtes sur le point de refuser la participation de
            {{ participation.profile.full_name }}.
          </div>

          <FormParticipationDecline @confirm="$emit('confirm', $event)" />
        </div>

        <template #footer>
          <BaseButton class="mr-3" variant="white" @click.native="$emit('cancel')">
            Annuler
          </BaseButton>
          <BaseButton type="submit" form="form-participation-decline"> Confirmer </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormParticipationDecline from '@/components/form/FormParticipationDecline.vue'

export default defineNuxtComponent({
  components: {
    FormParticipationDecline,
  },
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
})
</script>
