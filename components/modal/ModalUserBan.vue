<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="warning"
      title="Bloquer l'utilisateur"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <div class="space-y-4">
        <div>
          Vous êtes sur le point de bloquer l'utilisateur <strong>{{ user.profile.full_name }}</strong>. Il ne pourra plus se connecter à la plateforme.
        </div>

        <FormUserBan @confirm="$emit('confirm', $event)" />
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button type="submit" form="form-user-ban">
          Confirmer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
import FormUserBan from '@/components/form/FormUserBan.vue'

export default {
  components: {
    FormUserBan
  },
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
