<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="warning"
      title="Décliner la participation"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <div class="space-y-4">
        <div>
          Vous êtes sur le point de décliner la participation de {{ participation.profile.full_name }}.
        </div>

        <FormParticipationDecline @confirm="$emit('confirm', $event)" />
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button type="submit" form="form-participation-decline">
          Confirmer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
import FormParticipationDecline from '@/components/form/FormParticipationDecline.vue'

export default {
  components: {
    FormParticipationDecline
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    participation: {
      type: Object,
      required: true
    }
  }
}
</script>
