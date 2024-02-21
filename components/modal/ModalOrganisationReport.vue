<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        icon="RiErrorWarningLine"
        title="Changement de statut"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div class="space-y-4">
          <div class="formatted-text">
            <p>
              Vous êtes sur le point de <b>signaler</b> cette organisation qui ne répond pas aux
              exigences de la charte ou des règles fixés par le Décret n° 2017-930 du 9 mai 2017
              relatif à la Réserve Civique.
            </p>
            <p>
              Ses missions seront également <strong>signalées</strong> et toutes les participations
              déjà effectuées seront <strong>annulées</strong>.
            </p>
            <p>Si besoin, vous pouvez apporter des précisions en ajoutant une note.</p>
          </div>

          <FormNote
            id="form-note-organisation-report"
            notable-type="structures"
            :notable-id="organisation.id"
            :nb-rows="5"
            :required="false"
            placeholder="Ajoutez une note si nécessaire"
            context="status_changed_to_reported"
            @submitted="$emit('confirm', $event)"
          />
        </div>

        <template #footer>
          <DsfrButton type="secondary" @click.native="$emit('cancel')"> Annuler </DsfrButton>
          <DsfrButton is-submit form="form-note-organisation-report"> Confirmer </DsfrButton>
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
    organisation: {
      type: Object,
      required: true,
    },
  },
})
</script>
