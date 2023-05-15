<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="text-gray-600 mb-2">
        <slot />
      </div>
      <div class="text-gray-300 font-semibold">
        {{ objectif }}
      </div>
    </div>
    <Gauge :percentage="percentage" size="xl" :track="track" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    objectif: {
      type: Number,
      required: true
    }
  },
  computed: {
    percentage () {
      return this.value * 100 / this.objectif
    },
    track () {
      return this.$dayjs().dayOfYear() * 100 / 365
    }

  }
}
</script>

<style>

</style>
