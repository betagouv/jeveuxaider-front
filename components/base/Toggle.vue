<template>
  <div class="flex items-center justify-between gap-4">
    <span class="flex-grow flex flex-col">
      <span v-if="label" id="availability-label" class="block text-xs uppercase font-bold text-gray-700">{{ label }}</span>
      <span v-if="description" id="availability-description" class="text-sm text-gray-500">{{ description }}</span>
    </span>
    <button
      type="button"
      class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jva-blue-500"
      :class="[
        value ?'bg-jva-blue-600': 'bg-gray-200'
      ]"
      role="switch"
      aria-checked="false"
      aria-labelledby="availability-label"
      aria-describedby="availability-description"
      @click="onToggleSwitch"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        :class="[
          value ?'translate-x-5': 'translate-x-0'
        ]"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    }
  },

  methods: {
    onToggleSwitch () {
      console.log('value', this.value)
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style>

</style>
