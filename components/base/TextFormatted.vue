<template>
  <div v-if="text">
    <div
      ref="clampedElement"
      :class="[
        'break-word whitespace-pre-line formatted-text',
        { 'clamped-content': !forceExpansion },
      ]"
      v-html="text"
    />

    <DsfrLink
      v-if="isClamped && !forceExpansion"
      class="text-jva-blue-500 mt-4"
      @click.stop.native="forceExpansion = true"
    >
      {{ readMoreLabel }}
    </DsfrLink>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    text: {
      type: String,
      default: null,
    },
    maxLines: {
      type: [Number, Boolean],
      default: false,
    },
    readMoreLabel: {
      type: String,
      default: 'En lire plus',
    },
  },
  data() {
    return {
      isClamped: true,
      forceExpansion: false,
    }
  },
  mounted() {
    this.setIsClamped()
    let timeout
    window.addEventListener(
      'resize',
      () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(() => {
          this.setIsClamped()
        })
      },
      false
    )
  },
  methods: {
    setIsClamped() {
      var el = this.$refs.clampedElement
      if (!el) {
        return
      }
      this.isClamped =
        (!this.forceExpansion && el.offsetHeight < el.scrollHeight) ||
        el.offsetWidth < el.scrollWidth
    },
  },
})
</script>

<style lang="postcss" scoped>
.clamped-content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: v-bind(maxLines);
}
</style>
