<template>
  <div v-if="text">
    <div
      ref="clampedElement"
      :class="[
        'break-word whitespace-pre-line formatted-text',
        { 'clamped-content': !forceExpansion },
        { 'ios-safari': iosSafari },
      ]"
      v-html="text"
    />

    <DsfrLink
      v-if="isClamped && !forceExpansion"
      class="text-jva-blue-500 mt-4"
      @click.stop.native="forceExpansion = true"
      icon="RiArrowDownSLine"
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
      iosSafari: false,
      waitingOnAnimRequest: false,
    }
  },
  mounted() {
    this.setIsClamped()
    this.checkSafariIos()
    window.addEventListener('resize', this.setIsClamped, false)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setIsClamped)
  },
  methods: {
    setIsClamped() {
      if (!this.waitingOnAnimRequest) {
        window.requestAnimationFrame(() => {
          let el = this.$refs.clampedElement
          if (!el) {
            return
          }
          this.isClamped =
            (!this.forceExpansion && el.offsetHeight < el.scrollHeight) ||
            el.offsetWidth < el.scrollWidth
          this.waitingOnAnimRequest = false
        })
      }
      this.waitingOnAnimRequest = true
    },
    checkSafariIos() {
      var ua = window.navigator.userAgent
      var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
      var webkit = !!ua.match(/WebKit/i)
      this.iosSafari = iOS && webkit && !ua.match(/CriOS/i)
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

  /* iOS safari fallback, as it does not handle mutiple lines clamp correctly */
  &.ios-safari:deep(*) {
    display: inline;
  }
}
</style>
