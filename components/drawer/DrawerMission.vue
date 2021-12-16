<template>
  <div
    class=""
  >
    {{ mission.name }}
  </div>
</template>

<script>

export default {
  props: {
    missionId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      mission: {}
    }
  },
  async fetch () {
    if (!this.missionId) {
      return null
    }
    const { data } = await this.$axios.get(`/mission/${this.missionId}`)
    this.mission = data
  },
  watch: {
    $route: '$fetch'
  }
}
</script>
