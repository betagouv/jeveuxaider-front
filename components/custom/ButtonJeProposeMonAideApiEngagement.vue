<template>
  <Button
    size="lg"
    icon="RiExternalLinkLine"
    icon-position="right"
    @click.native="onClick"
  >
    Je propose mon aide
  </Button>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
      window.plausible &&
        window.plausible('Click CTA - Mission API Engagement', {
          props: { isLogged: this.$store.getters.isLogged }
        })

      window.open(this.url, '_blank').focus()
    }
  }
}
</script>
