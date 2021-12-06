<template>
  <div class="px-4 py-6 flex flex-col items-center bg-white space-y-2">
    <div class="text-[36px] font-bold leading-10">
      <template v-if="!isNaN(value)">
        {{ value | formatNumber }}
      </template>
      <template v-else>
        {{ value }}
      </template>
    </div>
    <div class="text-center">
      <div class="font-bold">
        {{ title }}
      </div>
      <div v-if="subtitle" class="text-gray-700 text-sm">
        {{ subtitle }}
      </div>
    </div>
    <Gauge v-if="gaugePercentage" :percentage="gaugePercentage" size="xs" />
    <Link v-if="link" :to="link" class="text-xs font-bold">
      {{ linkLabel }} ›
    </Link>
  </div>
</template>

<script>
import Gauge from '@/components/advanced/Gauge'

export default {
  components: {
    Gauge
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    },
    gaugePercentage: {
      type: Number,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    linkLabel: {
      type: String,
      default: null
    }
  }
}
</script>

<style>

</style>
