<template>
  <DsfrButton size="lg" icon="RiExternalLinkLine" icon-position="right" @click.native="onClick">
    Je propose mon aide
  </DsfrButton>
</template>

<script>
export default defineNuxtComponent({
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$plausible.trackEvent('Click CTA - Mission API Engagement', {
        props: { isLogged: this.$stores.auth.isLogged },
      })

      window.open(this.url, '_blank').focus()
    },
  },
})
</script>
