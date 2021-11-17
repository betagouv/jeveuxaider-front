<template>
  <label :for="htmlFor" class="block text-xs uppercase font-bold text-gray-700 mb-2">
    <slot />
    <span v-if="required" class="text-[#E2011C]">
      *
    </span>
  </label>
</template>

<script>
export default {
  props: {
    htmlFor: { type: String, default: null },
    required: { type: Boolean, default: false }
  }
}
</script>
