<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        theme="warning"
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
          <BaseButton class="mr-3" variant="white" @click.native="$emit('cancel')">
            Annuler
          </BaseButton>
          <BaseButton type="submit" @click.native="$emit('confirm')"> Confirmer </BaseButton>
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
