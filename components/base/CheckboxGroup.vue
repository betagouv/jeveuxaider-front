<template>
  <div>
    <label v-if="label" :for="name" class="block text-xs uppercase font-bold text-jva-gray-700">
      {{ label }}
      <span v-if="required" class="text-[#E2011C]">
        *
      </span>
      <span v-if="labelSuffix" class="jva-blue-400">{{
        labelSuffix
      }}</span>
    </label>
    <div v-if="description" class="text-xs text-jva-gray-500 mt-2">
      {{ description }}
    </div>
    <div
      class="mt-2 flex"
      :class="[
        {'flex-col space-y-2': variant == 'checkbox'},
        {'flex-wrap -m-1': variant == 'button'},
      ]"
    >
      <Checkbox
        v-for="option in options"
        :key="option.key"
        :option="option"
        class="relative flex items-start m-1"
        :is-checked="modelValue.includes(option.key)"
        :variant="variant"
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
    required: { type: Boolean, default: false },
    variant: {
      type: String,
      default: 'checkbox',
      validator: s =>
        ['checkbox', 'button'].includes(s)
    }
  },
  computed: {
    modelValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  },

  methods: {
    onChange (toggleItemKey) {
      if (this.modelValue.includes(toggleItemKey)) {
        const index = this.modelValue.indexOf(toggleItemKey)
        if (index > -1) {
          this.modelValue.splice(index, 1)
        }
      } else {
        this.modelValue.push(toggleItemKey)
      }
    }
  }
}
</script>

<style>

</style>
