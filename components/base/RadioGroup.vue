<template>
  <fieldset>
    <legend class="sr-only">Choisir une option</legend>

    <div class="flex" :class="[{ 'flex-col': variant === 'radios' }, classWrapper]">
      <BaseRadio
        v-for="(option, index) in options"
        :key="option.key"
        :checked="option.key == modelValue"
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
              variant === 'tabs' && option.key == modelValue,
          },
          {
            'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 ninotchecked':
              variant === 'tabs' && option.key != modelValue,
          },
          { '!border-r-0': variant === 'tabs' && index == 0 },
          {
            '!border-r !border-l': variant === 'tabs' && index == options.length - 1,
          },
          {
            '!border-l-0': variant === 'tabs' && index == options.length - 1 && options.length > 2,
          },
        ]"
        @update="onUpdateValue"
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
    classWrapper: { type: String, default: '' },
  },
  data() {
    return {
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
