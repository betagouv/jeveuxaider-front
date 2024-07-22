<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: [Array], default: null },
  name: { type: String, required: true },
  options: { type: Array, required: true },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: null },
  success: { type: Boolean, default: null },
  optionClass: { type: String, default: '' },
  labelClass: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
const values = ref(props.modelValue)
const refInput = ref(null)

function onClick(option) {
  if (props.disabled) return
  refInput.value.find((el) => el._value.key === option.key).click()
}

function isChecked(option) {
  return values.value.find((value) => value.key === option.key)
}
</script>

<template>
  <fieldset class="initial:flex initial:flex-wrap initial:gap-4">
    <legend class="sr-only">Choisir une ou plusieurs options</legend>
    <button
      v-for="option in options"
      :key="option.key"
      :class="[
        'min-w-0 border initial:p-4 hover:bg-[#F5F5FE]/75 transition ease-out',
        { 'border-jva-blue-500 !bg-[#F5F5FE] text-jva-blue-500': isChecked(option) },
        optionClass,
      ]"
      @click="onClick(option)"
      @keydown.enter.prevent="onClick(option)"
      @keydown.space.prevent="onClick(option)"
    >
      <div inert class="flex items-center gap-3 !pointer-events-none">
        <input
          ref="refInput"
          v-model="values"
          :value="option"
          type="checkbox"
          :id="`${name}-${option.key}`"
          :name="name"
          class="text-jva-blue-500 border-jva-blue-500 rounded-[4px] transition ease-out"
          tabindex="-1"
          @update:model-value="
            $emit(
              'update:modelValue',
              $event.sort((a, b) => (a.key > b.key ? 1 : a.key < b.key ? -1 : 0))
            )
          "
        />
        <label :class="['flex flex-col truncate', labelClass]" :for="`${name}-${option.key}`">
          <slot :option="option">
            <span class="truncate">{{ option.label }}</span>
            <span v-if="option.description" class="text-xs text-[#666666] truncate">{{
              option.description
            }}</span>
          </slot>
        </label>
      </div>
    </button>
  </fieldset>
</template>

<style lang="postcss" scoped></style>
