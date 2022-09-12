<template>
  <Drawer :is-open="Boolean(notificationKey)" width="lg" @close="$emit('close')">
    <template #title>
      <Heading :level="3">
        {{ notificationLabel }}
      </Heading>
    </template>
    <template v-if="notification">
      <div class="text-gray-500 text-sm py-6">
        {{ notificationDescription }}
        <div v-if="notificationTags" class="mt-2">
          <TagIcon class="w-4 h-4 inline" /> {{ notificationTags.join(', ') }}
        </div>
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
    },
    notificationTags: {
      type: [Array, null],
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
::v-deep table p,
::v-deep table ul {
  margin-bottom: 15px !important;
}

::v-deep table ul {
  list-style: disc;
  padding-left: 15px;
}

::v-deep a {
  pointer-events: none !important;
  word-break: break-word !important;
}
</style>
