<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        icon="RiErrorWarningLine"
        title="Débloquer l'utilisateur"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <p>
          Vous êtes sur le point de débloquer l'utilisateur
          <strong>{{ user.profile.full_name }}</strong
          >. Il pourra de nouveau se connecter à son compte.
        </p>

        <template #footer>
          <DsfrButton type="secondary" @click.native="$emit('cancel')"> Annuler </DsfrButton>
          <DsfrButton is-submit @click.native="$emit('confirm')"> Confirmer </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    },
  },
})
</script>
