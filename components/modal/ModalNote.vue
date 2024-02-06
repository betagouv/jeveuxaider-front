<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Ajouter une note"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <FormNote
          id="form-note-mission"
          class="mt-8"
          :notable-type="notableType"
          :notable-id="notableId"
          :note="note"
          @submitted="$emit('confirm', $event)"
        />

        <template #footer>
          <BaseButton class="mr-3" variant="white" @click="$emit('cancel')"> Annuler </BaseButton>
          <BaseButton type="submit" form="form-note-mission"> Confirmer </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormErrors from '@/mixins/form/errors'
import FormNote from '@/components/form/FormNote.vue'

export default defineNuxtComponent({
  mixins: [FormErrors],
  components: {
    FormNote,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    notableType: {
      type: String,
      required: true,
    },
    notableId: {
      type: Number,
      required: true,
    },
    note: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
})
</script>
