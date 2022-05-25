<template>
  <div class="relative flex flex-col">
    <div
      v-if="infosBulle"
      v-tooltip="{
        content: infosBulle,
        hideOnTargetClick: true,
        placement: 'top',
      }"
      class="hidden sm:block p-2 cursor-help absolute top-2 right-5 group"
    >
      <InformationCircleIcon class="h-4 w-4 text-gray-400 group-hover:text-gray-900" />
    </div>
    <div class="px-4 py-6 flex-1 flex flex-col items-center bg-white space-y-2">
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
  </div>
</template>

<script>

export default {
  components: {
  },
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
    },
    infosBulle: {
      type: String,
      default: null
    }
  }
}
</script>

<style>

</style>
