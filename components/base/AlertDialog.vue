<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :key="`modal_alert_dialog_${uuid}`"
        :title="title"
        :is-open="isOpen"
        :icon="icon"
        :prevent-click-outside="preventClickOutside"
        @close="$emit('cancel')"
      >
        <div class="text-gray-700 mb-4">
          <slot />
        </div>
        <template #footer>
          <DsfrButton type="secondary" @click="$emit('cancel')">
            {{ cancelLabel }}
          </DsfrButton>
          <DsfrButton :loading="buttonLoading" @click="$emit('confirm')">
            {{ buttonLabel }}
          </DsfrButton>
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
    buttonLoading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      default: 'Confirmer',
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
  computed: {},
  data() {
    return {
      uuid: uuidv4(),
    }
  },
})
</script>
