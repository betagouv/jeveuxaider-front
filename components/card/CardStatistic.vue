<template>
  <div class="px-4 py-6 flex flex-col items-center bg-white space-y-2">
    <div v-if="value !== null" class="text-[36px] font-bold leading-10">
      <template v-if="!isNaN(value)">
        {{ value | formatNumber('0,0.[0]') }}
      </template>
      <template v-else>
        {{ value }}
      </template>
    </div>
    <div class="text-center">
      <div v-if="title" class="font-bold">
        {{ title }}
      </div>
      <div v-if="subtitle" class="text-gray-700 text-sm">
        {{ subtitle }}
      </div>
    </div>
    <Gauge v-if="gaugePercentage" :percentage="gaugePercentage" size="xs" />
    <Link v-if="link && !linkHidden && linkLabel" :to="link" class="text-xs font-bold">
      {{ linkLabel }} ›
    </Link>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    title: {
      type: String,
      default: null
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
    },
    linkHidden: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
