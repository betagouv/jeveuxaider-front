<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :key="`modal_alert_dialog_${uuid}`"
        :title="title"
        :is-open="isOpen"
        :theme="theme"
        :prevent-click-outside="preventClickOutside"
        @close="$emit('cancel')"
      >
        <div class="text-gray-700 space-y-4">
          <div v-html="text" />
          <slot />
        </div>
        <template #footer>
          <BaseButton class="mr-3" variant="white" @click.native="$emit('cancel')">
            {{ cancelLabel }}
          </BaseButton>
          <BaseButton :variant="confirmButtonVariant" @click.native="$emit('confirm')">
            {{ confirmLabel }}
          </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  emits: ['cancel', 'confirm'],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'success', // success, warning, danger
    },
    buttonLabel: {
      type: String,
      default: null,
    },
    cancelLabel: {
      type: String,
      default: 'Annuler',
    },
    preventClickOutside: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    confirmButtonVariant() {
      return this.theme == 'danger' ? 'red' : 'primary'
    },
    confirmLabel() {
      if (this.buttonLabel) {
        return this.buttonLabel
      }
      return this.theme == 'danger'
        ? 'Supprimer'
        : this.theme == 'success'
        ? 'Confirmer'
        : 'Valider'
    },
  },
  data() {
    return {
      uuid: uuidv4(),
    }
  },
})
</script>
