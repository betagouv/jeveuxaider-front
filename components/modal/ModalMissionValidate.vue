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
      <div class="space-y-4">
        <div class="formatted-text">
          <p>
            Vous êtes sur le point de <b>valider</b> la mission. Elle sera disponible dans la recherche.
            <template v-if="hasError">
              <br><br>L’outil d’aide à la modération a identifié cette mission comme étant <strong>potentiellement non conforme</strong>. Avez-vous vérifié l’ensemble des éléments ? Dites-nous quelques mots sur la validation :
            </template>
            <template v-else>
              N'hésitez pas à apporter des précisions sur votre modération en ajoutant une note :
            </template>
          </p>
        </div>

        <FormNote
          id="form-note-mission-validate"
          notable-type="missions"
          :notable-id="mission.id"
          :nb-rows="5"
          :required="hasError"
          :hide-help="true"
          placeholder="Détaillez-ici les raisons de votre décision"
          context="status_changed_to_validated"
          @submitted="$emit('confirm', $event)"
        />
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button type="submit" form="form-note-mission-validate">
          Confirmer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
import FormNote from '@/components/form/FormNote.vue'
import MixinAideModeration from '@/mixins/mission-aide-moderation'

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
    mission: {
      type: Object,
      required: true
    }
  }
}
</script>
