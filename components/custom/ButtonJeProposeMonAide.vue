<template>
  <Button
    :size="size"
    :type="type"
    :disabled="disabled"
    class="!font-bold"
    @click.native="onClick"
  >
    {{ label }}
  </Button>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    mission: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'lg'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Je propose mon aide'
    }
  },
  methods: {
    onClick () {
      if (this.disabled) {
        return
      }

      window.plausible &&
        window.plausible('Click CTA - Mission', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$store.commit('softGate/showOverlay')
      this.$store.commit('softGate/setSelectedMission', this.mission)
    }
  }
}
</script>
