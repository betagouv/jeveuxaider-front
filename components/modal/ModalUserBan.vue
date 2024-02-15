<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        icon="RiErrorWarningLine"
        title="Bloquer l'utilisateur"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div class="space-y-4">
          <div>
            Vous êtes sur le point de bloquer l'utilisateur
            <strong>{{ user.profile.full_name }}</strong
            >. Il ne pourra plus se connecter à la plateforme.
          </div>

          <FormUserBan @confirm="$emit('confirm', $event)" />
        </div>

        <template #footer>
          <BaseButton type="secondary" @click.native="$emit('cancel')"> Annuler </BaseButton>
          <BaseButton is-submit form="form-user-ban"> Confirmer </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormUserBan from '@/components/form/FormUserBan.vue'

export default defineNuxtComponent({
  components: {
    FormUserBan,
  },
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
