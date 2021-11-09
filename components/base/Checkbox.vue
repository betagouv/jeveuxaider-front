<template>
  <div class="mt-2 relative flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="option.key"
        :aria-describedby="`${option.key}-description`"
        :name="option.key"
        type="checkbox"
        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        :checked="checked"
        @change="toggleChecked()"
      >
    </div>
    <div class="ml-3 text-sm">
      <label :for="option.key" class="font-medium text-gray-700">{{ option.label }}</label>
      <p v-if="option.description" :id="`${option.key}-description`" class="text-gray-500">
        {{ option.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: { type: Object, required: true },
    isChecked: { type: Boolean, default: false }
  },
  data () {
    return {
      checked: this.isChecked
    }
  },
  methods: {
    toggleChecked () {
      this.checked = !this.checked
      this.$emit('change', this.option.key)
    }
  }
}
</script>

<style>

</style>
