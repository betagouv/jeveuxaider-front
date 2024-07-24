<template>
  <a :href="url" target="_blank" class="inline-block" @click="onClick">
    <DsfrButton size="lg" icon="RiExternalLinkLine" icon-position="right" class="w-full">
      Je propose mon aide
    </DsfrButton>
  </a>
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
    },
  },
})
</script>
