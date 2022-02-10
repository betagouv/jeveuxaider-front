<template>
  <Modal :title="title" :is-open="isOpen" @close="$emit('close')">
    <div class="text-sm text-gray-500" v-html="text">
      Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
    </div>
    <template #footer>
      <Button variant="red">
        Deactivate
      </Button>
      <Button class="mr-3" variant="white" @click.native="$emit('close')">
        Cancel
      </Button>
    </template>
  </Modal>
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
      default: 'Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.'
    }
  }
}
</script>
