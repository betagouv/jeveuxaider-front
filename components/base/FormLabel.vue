<template>
  <label
    :for="htmlFor"
    class="block  font-bold  mb-2 relative"
    :class="[
      {'text-xs uppercase text-gray-700': size === 'xs'},
      {'text-xl normal-case text-black': size === 'xl'}
    ]"
  >
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
    required: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'xs'
    }
  }
}
</script>
