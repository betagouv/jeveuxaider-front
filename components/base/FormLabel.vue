<template>
  <label :for="htmlFor" class="block text-xs uppercase font-bold text-gray-700 mb-2 relative">
    <slot />
    <span v-if="required" class="text-[#E2011C]">
      *
    </span>
    <span v-if="suffix" class="text-jva-blue-400 ml-2">{{ suffix }}</span>
  </label>
</template>

<script>
export default {
  props: {
    htmlFor: { type: String, default: null },
    suffix: { type: String, default: null },
    required: { type: Boolean, default: false }
  }
}
</script>
