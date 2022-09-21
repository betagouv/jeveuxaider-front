<template>
  <div
    class="flex items-center justify-between gap-4"
    :class="[
      {'flex-row-reverse': position === 'left'}
    ]"
  >
    <span class="flex-grow flex flex-col">
      <span v-if="label" id="availability-label" class="block text-sm text-black" v-html="label" />
      <span v-if="description" id="availability-description" class="text-sm text-gray-500" v-html="description" />
    </span>
    <button
      type="button"
      class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
      :class="[
        selected ?'bg-jva-green-600 focus:ring-jva-green-500': 'bg-gray-200 focus:ring-gray-200'
      ]"
      role="switch"
      aria-checked="false"
      aria-labelledby="availability-label"
      aria-describedby="availability-description"
      @click="onToggleSwitch"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none inline-flex items-center justify-center h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        :class="[
          selected ? 'translate-x-5': 'translate-x-0'
        ]"
      >
        <CheckIcon v-if="selected" class="h-3 text-jva-green-500" />
        <XIcon v-else class="h-3 text-gray-400" />
      </span>
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
    },
    position: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  watch: {
    value (newVal) {
      this.selected = newVal
    }
  },
  methods: {
    onToggleSwitch () {
      this.selected = !this.selected
      this.$emit('input', this.selected)
      if (this.selected) {
        this.$emit('checked')
      } else {
        this.$emit('unchecked')
      }
    }
  }
}
</script>

<style>

</style>
