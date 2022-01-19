<template>
  <div v-if="notification" class="max-w-full">
    <div class="max-w-full" v-html="notification" />
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    notificationKey: {
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
    this.$emit('loaded', data)
  },
  watch: {
    notificationKey: '$fetch'
  },
  methods: {

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
