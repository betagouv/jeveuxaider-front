<template>
  <portal to="body-end">
    <Modal
      :key="`modal_alert_dialog_${uuid}`"
      v-scroll-lock="isOpen"
      :title="title"
      :is-open="isOpen"
      :prevent-click-outside="true"
      :theme="theme"
      :prevent-click-outside="preventClickOutside"
      @close="$emit('cancel')"
    >
      <div class="text-gray-700 space-y-4">
        <div v-html="text" />
        <slot />
      </div>
      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          {{ cancelLabel }}
        </Button>
        <Button :variant="confirmButtonVariant" @click.native="$emit('confirm')">
          {{ confirmLabel }}
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
import uuid from '@/mixins/uuid'

export default {
  mixins: [uuid],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'success' // success, warning, danger
    },
    buttonLabel: {
      type: String,
      default: null
    },
    cancelLabel: {
      type: String,
      default: 'Annuler'
    },
    preventClickOutside: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    confirmButtonVariant () {
      return this.theme == 'danger' ? 'red' : this.theme == 'warning' ? 'primary' : 'green'
    },
    confirmLabel () {
      if (this.buttonLabel) {
        return this.buttonLabel
      }
      return this.theme == 'danger' ? 'Supprimer' : this.theme == 'success' ? 'Confirmer' : 'Valider'
    }
  }
}
</script>
