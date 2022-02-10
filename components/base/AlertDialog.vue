<template>
  <portal to="body-end">
    <Modal v-scroll-lock="isOpen" :title="title" :is-open="isOpen" :theme="theme" @close="$emit('cancel')">
      <div class="text-sm text-gray-500" v-html="text" />
      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button :variant="confirmButtonVariant" @click.native="$emit('confirm')">
          {{ confirmLabel }}
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
    }
  },
  computed: {
    confirmButtonVariant () {
      return this.theme == 'danger' ? 'red' : this.theme == 'warning' ? 'primary' : 'green'
    },
    confirmLabel () {
      return this.theme == 'danger' ? 'Supprimer' : this.theme == 'success' ? 'Confirmer' : 'Valider'
    }
  }
}
</script>
