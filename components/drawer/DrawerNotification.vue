<template>
  <BaseDrawer
    :is-open="Boolean(notificationKey)"
    width="4xl"
    form-id="form-notification"
    :submit-label="`Envoyer à ${$stores.auth.profile.email}`"
    @close="$emit('close')"
    @submit="onSubmit"
  >
    <template #title>
      <BaseHeading :level="3">
        {{ notificationLabel }}
      </BaseHeading>
    </template>
    <template v-if="notification">
      <div class="text-gray-500 text-sm py-6">
        {{ notificationDescription }}
        <div v-if="notificationTags" class="mt-2">
          <RiPriceTag3Line class="w-4 h-4 inline" /> {{ notificationTags.join(', ') }}
        </div>
      </div>
      <div class="max-w-full" v-html="notification" />
    </template>
  </BaseDrawer>
</template>

<script>
export default defineNuxtComponent({
  props: {
    notificationKey: {
      type: String,
      default: null,
    },
    notificationLabel: {
      type: String,
      default: null,
    },
    notificationDescription: {
      type: String,
      default: null,
    },
    notificationTags: {
      type: [Array, null],
      default: null,
    },
  },
  data() {
    return {
      notification: null,
    }
  },
  watch: {
    notificationKey: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.notificationKey) {
        return null
      }
      this.notification = null
      const notification = await apiFetch(`/notifications/${this.notificationKey}`)
      this.notification = notification
    },
    async onSubmit() {
      await apiFetch(`/notifications/${this.notificationKey}/test`, {
        method: 'POST',
      })
      this.$toast.success("Vous allez recevoir la notification d'ici quelques instants...")
    },
  },
})
</script>

<style lang="postcss" scoped>
:deep(a) {
  pointer-events: none !important;
  word-break: break-word !important;
}
</style>
