<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="warning"
      title="Changement de statut"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <div class="space-y-6">
        <div class="formatted-text">
          <p>
            Vous êtes sur le point de <b>valider</b> cette organisation. Ses missions seront disponibles dans la recherche.
          </p>
          <p> Si besoin, vous pouvez apporter des précisions en ajoutant une note.</p>
        </div>

        <FormNote
          id="form-note-organisation-validate"
          notable-type="structures"
          :notable-id="organisation.id"
          :nb-rows="5"
          :required="false"
          :hide-help="true"
          placeholder="Ajoutez une note si nécessaire"
          context="status_changed_to_validated"
          @submitted="$emit('confirm', $event)"
        />
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button type="submit" form="form-note-organisation-validate">
          Confirmer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
import FormNote from '@/components/form/FormNote.vue'
import MixinAideModeration from '@/mixins/organisation-aide-moderation'

export default {
  components: {
    FormNote
  },
  mixins: [MixinAideModeration],
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    organisation: {
      type: Object,
      required: true
    }
  }
}
</script>
