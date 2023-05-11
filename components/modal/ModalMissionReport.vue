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
            Vous êtes sur le point de <strong>signaler</strong> une mission qui ne répond pas aux exigences de la charte ou des règles fixés par le Décret n° 2017-930 du 9 mai 2017 relatif à la Réserve Civique. Le responsable est en lien avec {{ missionStats.participations_total }} bénévole(s).
          </p>
          <p>
            Les participations à venir seront automatiquement <strong>annulées</strong>. Les coordonnées des bénévoles seront masquées.
          </p>
        </div>

        <FormNote
          id="form-note-mission-report"
          notable-type="missions"
          :notable-id="mission.id"
          :nb-rows="5"
          :required="true"
          :hide-help="true"
          placeholder="Détaillez-ici les raisons de votre décision"
          context="status_changed_to_reported"
          @submitted="$emit('confirm', $event)"
        />
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button type="submit" form="form-note-mission-report">
          Confirmer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
import FormNote from '@/components/form/FormNote.vue'

export default {
  components: {
    FormNote
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    mission: {
      type: Object,
      required: true
    },
    missionStats: {
      type: Object,
      required: true
    }
  }
}
</script>
