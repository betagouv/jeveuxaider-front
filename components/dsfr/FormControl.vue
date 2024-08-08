<template>
  <div class="initial:w-full">
    <label
      v-if="label"
      :for="htmlFor"
      :class="[
        'block relative text-[#161616]',
        $slots.description ? 'initial:mb-1' : 'initial:mb-2',
        labelClass,
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-[#E2011C]"> * </span>
      <span v-if="labelSuffix" class="text-jva-blue-400 ml-2">{{ labelSuffix }}</span>
      <slot name="afterLabel" />
    </label>

    <div v-if="$slots.description" class="mb-2">
      <slot name="description" />
    </div>

    <slot />

    <BaseFormInfo v-if="info && !error">{{ info }}</BaseFormInfo>
    <BaseFormError v-if="error">
      {{ error }}
    </BaseFormError>
    <BaseFormSuccess v-if="success">
      {{ success }}
    </BaseFormSuccess>

    <slot name="bottom" />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    htmlFor: { type: String, default: null },
    info: { type: String, default: null },
    error: { type: String, default: null },
    success: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    labelClass: { type: String, default: null },
    required: { type: Boolean, default: false },
  },
  watch: {
    label: {
      handler(val) {
        if (val && !this.htmlFor) {
          console.error(`htmlFor prop is missing for label ${this.label}`)
        }
      },
      immediate: true,
    },
  },
})
</script>
