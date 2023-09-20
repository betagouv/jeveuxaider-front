<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        vvv-scroll-lock="isOpen"
        :is-open="isOpen"
        theme="warning"
        title="Changement de statut"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div class="space-y-6">
          <div class="formatted-text">
            <p>
              Vous êtes sur le point de <strong>signaler</strong> cette mission qui ne répond pas
              aux exigences de la charte ou des règles fixés par le Décret n° 2017-930 du 9 mai 2017
              relatif à la Réserve Civique.
            </p>
            <p>
              Les participations en cours de validation seront automatiquement
              <strong>annulées</strong>.
            </p>
            <p>Si besoin, vous pouvez apporter des précisions en ajoutant une note.</p>
          </div>

          <FormNote
            id="form-note-mission-report"
            notable-type="missions"
            :notable-id="mission.id"
            :nb-rows="5"
            :required="false"
            placeholder="Ajoutez une note si nécessaire"
            context="status_changed_to_reported"
            @submitted="$emit('confirm', $event)"
          />
        </div>

        <template #footer>
          <BaseButton class="mr-3" variant="white" @click.native="$emit('cancel')">
            Annuler
          </BaseButton>
          <BaseButton type="submit" form="form-note-mission-report"> Confirmer </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormNote from '@/components/form/FormNote.vue'

export default defineNuxtComponent({
  components: {
    FormNote,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
    mission: {
      type: Object,
      required: true,
    },
  },
})
</script>
