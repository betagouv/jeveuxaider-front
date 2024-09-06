<template>
  <DsfrButton
    :size="size"
    :type="type"
    :disabled="disabled"
    class="!font-bold"
    @click.native="onClick"
  >
    {{ label }}
  </DsfrButton>
</template>

<script>
export default defineNuxtComponent({
  props: {
    mission: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'lg',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Être notifié par email',
    },
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return
      }
      this.$plausible.trackEvent('Click CTA - Mission - Waiting list', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      this.$stores.softGate.showOverlay = true
      this.$stores.softGate.selectedMission = this.mission
      this.$stores.softGate.waitingList = true
    },
  },
})
</script>
