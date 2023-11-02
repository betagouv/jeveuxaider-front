<template>
  <fieldset>
    <legend class="sr-only">Choisir une option</legend>

    <div class="flex" :class="[{ 'flex-col': variant === 'radios' }]">
      <BaseRadio
        v-for="(option, index) in options"
        :key="option.key"
        :checked="option.key == value"
        v-model="value"
        :variant="variant"
        :option="option"
        :name="uuid"
        :class="[
          {
            'border border-r-0 py-3 px-3 flex items-center justify-center text-sm font-medium text-center sm:flex-1 cursor-pointer':
              variant === 'tabs',
          },
          {
            'bg-jva-blue-600 border-transparent text-white hover:bg-jva-blue-500 nicochecked':
              variant === 'tabs' && option.key == value,
          },
          {
            'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 ninotchecked':
              variant === 'tabs' && option.key != value,
          },
          { '!border-r-0': variant === 'tabs' && index == 0 },
          {
            '!border-r !border-l': variant === 'tabs' && index == options.length - 1,
          },
          {
            '!border-l-0': variant === 'tabs' && index == options.length - 1 && options.length > 2,
          },
        ]"
        @update:modelValue="onUpdateValue"
      />
    </div>
  </fieldset>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  emits: ['update:modelValue'],
  props: {
    options: { type: Array, required: true },
    modelValue: { type: [String, Number, Boolean], default: null },
    variant: {
      type: String,
      default: 'radios',
      validator: (s) => ['radios', 'tabs'].includes(s),
    },
  },
  data() {
    return {
      value: this.modelValue,
      uuid: uuidv4(),
    }
  },
  computed: {},
  methods: {
    onUpdateValue(payload) {
      this.$emit('update:modelValue', payload)
    },
  },
})
</script>
