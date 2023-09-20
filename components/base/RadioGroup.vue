<template>
  <fieldset>
    <legend class="sr-only">Choisir une option</legend>

    <div class="flex" :class="[{ 'flex-col': variant === 'radios' }]">
      <BaseRadio
        v-for="(option, index) in options"
        :key="option.key"
        v-model="selected"
        :default-value="modelValue"
        :variant="variant"
        :option="option"
        :class="[
          {
            'border border-r-0 py-3 px-3 flex items-center justify-center text-sm font-medium text-center sm:flex-1 cursor-pointer':
              variant === 'tabs',
          },
          {
            'bg-jva-blue-600 border-transparent text-white hover:bg-jva-blue-500':
              variant === 'tabs' && option.key == selected,
          },
          {
            'bg-white border-gray-200 text-gray-900 hover:bg-gray-50':
              variant === 'tabs' && option.key != selected,
          },
          { '!border-r-0': variant === 'tabs' && index == 0 },
          {
            '!border-r !border-l': variant === 'tabs' && index == options.length - 1,
          },
          {
            '!border-l-0': variant === 'tabs' && index == options.length - 1 && options.length > 2,
          },
        ]"
      />
    </div>
  </fieldset>
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue', 'updated'],
  props: {
    options: { type: Array, required: true },
    modelValue: { type: [String, Number, Boolean], default: null },
    variant: {
      type: String,
      default: 'radios',
      validator: (s) => ['radios', 'tabs'].includes(s),
    },
  },
  computed: {
    selected: {
      get() {
        return this.modelValue
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue)
        this.$emit('updated')
      },
    },
  },
})
</script>
