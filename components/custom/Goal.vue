<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="text-gray-600 mb-2">
        <slot />
      </div>
    </div>
    <BaseGauge :percentage="percentage" size="xl" :track="track" />
    <div class="flex justify-between items-center text-sm">
      <div class="text-gray-300 font-semibold">
        {{ $numeral(from) }}
      </div>
      <div class="text-gray-300 font-semibold">
        {{ $numeral(to) }}
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
    from: {
      type: Number,
      required: true,
    },
    to: {
      type: Number,
      required: true,
    },
  },
  computed: {
    percentage() {
      if (this.value - this.from < 0) {
        return 0
      }
      return ((this.value - this.from) * 100) / (this.to - this.from)
    },
    track() {
      return (this.$dayjs().dayOfYear() * 100) / 365
    },
  },
})
</script>
