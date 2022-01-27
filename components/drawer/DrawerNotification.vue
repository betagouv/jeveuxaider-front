<template>
  <Drawer :is-open="Boolean(notificationKey)" @close="$emit('close')">
    <template #title>
      <Heading :level="3">
        {{ notificationLabel }}
      </Heading>
    </template>
    <template v-if="notification">
      <div class="text-gray-500 text-sm py-6">
        {{ notificationDescription }}
      </div>
      <div class="max-w-full" v-html="notification" />
    </template>
  </Drawer>
</template>

<script>

export default {
  props: {
    notificationKey: {
      type: String,
      default: null
    },
    notificationLabel: {
      type: String,
      default: null
    },
    notificationDescription: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      notification: null
    }
  },
  async fetch () {
    if (!this.notificationKey) {
      return null
    }
    this.notification = null
    const { data } = await this.$axios.get(`/notifications/${this.notificationKey}`)
    this.notification = data
  },
  watch: {
    notificationKey: '$fetch'
  }
}
</script>

<style lang="postcss" scoped>
::v-deep table {
  &.inner-body, &.content, &.subcopy {
    width: 100% !important;
  }
}
::v-deep table p {
  margin-bottom: 15px !important;
}
::v-deep a {
  pointer-events: none !important;
  word-break: break-word !important;
}
</style>
