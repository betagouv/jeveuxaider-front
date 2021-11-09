<template>
  <div>
    <label v-if="label" :for="name" class="block text-xs uppercase font-bold text-gray-text-dark">
      {{ label }}
      <span v-if="required" class="text-[#E2011C]">
        *
      </span>
      <span v-if="labelSuffix" class="text-jva-blue-light">{{
        labelSuffix
      }}</span>
    </label>
    <div v-if="description" class="text-xs text-gray-text-light mt-2">
      {{ description }}
    </div>
    <div class="mt-2 flex flex-col space-y-2">
      <Checkbox
        v-for="option in options"
        :key="option.key"
        :option="option"
        class="relative flex items-start"
        :is-checked="localValue.includes(option.key)"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Array, default: () => [] },
    options: { type: Array, required: true },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    name: { type: String, required: true },
    error: { type: String, default: null },
    description: { type: String, default: null },
    required: { type: Boolean, default: false }
  },
  data () {
    return {
      localValue: this.value
    }
  },
  watch: {
    localValue (localValue) {
      this.$emit('input', localValue)
    },
    value (value) {
      this.localValue = value
    }
  },
  methods: {
    onChange (toggleItemKey) {
      if (this.localValue.includes(toggleItemKey)) {
        const index = this.localValue.indexOf(toggleItemKey)
        if (index > -1) {
          this.localValue.splice(index, 1)
        }
      } else {
        this.localValue.push(toggleItemKey)
      }
    }
  }
}
</script>

<style>

</style>
