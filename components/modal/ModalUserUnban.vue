<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="warning"
      title="Débloquer l'utilisateur"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <p>
        Vous êtes sur le point de débloquer l'utilisateur <strong>{{ user.profile.full_name }}</strong>. Il pourra de nouveau se connecter à son compte.
      </p>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button type="submit" @click.native="$emit('confirm')">
          Confirmer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
