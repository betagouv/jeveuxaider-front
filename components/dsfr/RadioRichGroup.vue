<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: null,
  },
  success: {
    type: Boolean,
    default: null,
  },
  customClass: {
    type: String,
    default: '',
  },
  full: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const onClick = (option) => {
  if (props.disabled) return
  emit('update:modelValue', option.key)
}

const isChecked = (option) => option.key === props.modelValue
</script>

<template>
  <fieldset class="flex flex-wrap gap-4">
    <legend class="sr-only">Choisir une option</legend>
    <button
      v-for="option in options"
      :key="option.key"
      :class="[
        'border py-4 pl-4 pr-5 cursor-pointer hover:bg-[#f2f2f9] transition ease-out',
        { 'border-jva-blue-500 bg-[#F5F5FE] text-jva-blue-500': isChecked(option) },
        { 'w-full': full },
        customClass,
      ]"
      @click="onClick(option)"
      @keydown.enter="onClick(option)"
      @keydown.space.prevent="onClick(option)"
    >
      <div class="flex items-center gap-4">
        <input
          :value="option.key"
          type="radio"
          :id="`${name}-${option.key}`"
          :name="name"
          :checked="isChecked(option)"
          class="cursor-pointer text-jva-blue-500 border-jva-blue-500 transition ease-out"
          style="box-shadow: none"
          tabindex="-1"
        />
        <label class="flex flex-col cursor-pointer" :for="`${name}-${option.key}`">
          <span class="">{{ option.label }} </span>
          <span v-if="option.description" class="text-xs text-[#666666]">{{
            option.description
          }}</span>
        </label>
      </div>
    </button>
  </fieldset>
</template>

<style lang="postcss" scoped></style>
