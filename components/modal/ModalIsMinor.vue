<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        :title="`☝️ Une petite info, ${$stores.auth.profile.first_name}`"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div class="formatted-text">
          <p>
            Comme vous avez moins de 18 ans, vous aurez besoin d’un accord de vos parents ou
            représentants légaux pour réaliser une mission de bénévolat.
          </p>
          <p>
            Pas de panique ! Vous pourrez fournir cet accord à l’association pour laquelle vous
            effectuez une mission, en temps voulu.
          </p>
          <p>Bonne recherche et merci pour votre engagement ! 😊</p>
        </div>

        <template #footer>
          <DsfrButton @click="$emit('confirm')">J'ai compris</DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  emits: ['cancel', 'confirm'],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
