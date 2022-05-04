<template>
  <div class="py-2 sm:gap-4 sm:flex">
    <dt class="text-sm text-gray-500 flex-none" :style="style">
      {{ term }}
    </dt>
    <dd class="mt-1 text-sm text-gray-900 font-semibold sm:mt-0 inline-flex items-center flex-1">
      <Gauge :percentage="percentage" :tooltip="tooltip" :color="percentage == 100 ? 'green' : 'blue'" size="sm" />
    </dd>
  </div>
</template>

<script>
export default {
  props: {
    term: {
      type: String,
      required: true
    },
    termSize: {
      type: Number,
      default: null
    },
    tooltip: {
      type: String,
      default: null
    },
    percentage: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      style: {
        width: this.termSize ? `${this.termSize}px` : 'calc(100%/3)'
      }
    }
  }
}
</script>
