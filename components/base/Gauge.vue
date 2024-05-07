<template>
  <div class="relative w-full">
    <div
      v-tooltip="tooltip"
      class="w-full bg-gray-200 overflow-hidden"
      :class="[
        { 'h-1': size === 'xs' },
        { 'h-2': size === 'sm' },
        { 'h-3': size === 'lg' },
        { 'h-4': size === 'xl' },
      ]"
    >
      <div
        :class="[
          gaugeColorClass,
          { 'h-1': size === 'xs' },
          { 'h-2': size === 'sm' },
          { 'h-3': size === 'lg' },
          { 'h-4': size === 'xl' },
          'transition-all duration-500',
        ]"
        :style="`width:${percentage}%`"
      />
    </div>
    <div
      v-if="track"
      class="absolute text-[16px] z-10 top-[-16px] text-gray-400"
      :style="`left:${track}%`"
    >
      ▾
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    percentage: {
      type: Number,
      required: true,
    },
    tooltip: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'sm',
      validator: (s) => ['xs', 'sm', 'lg', 'xl'].includes(s),
    },
    color: {
      type: String,
      default: 'salmon',
      validator: (s) => ['salmon', 'green', 'blue'].includes(s),
    },
    track: {
      type: Number,
      default: null,
    },
  },
  computed: {
    gaugeColorClass() {
      switch (this.color) {
        case 'salmon':
          return 'bg-[#FF9A7B]'
        case 'green':
          return 'bg-jva-green-500'
        case 'blue':
          return 'bg-jva-blue-500'
        default:
          return 'bg-[#FF9A7B]'
      }
    },
  },
})
</script>
