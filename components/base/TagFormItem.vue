<template>
  <div
    class="flex items-center space-x-3 px-3 py-2 rounded-lg border border-jva-blue-500 bg-white max-w-full"
  >
    <div class="flex-none text-sm text-jva-blue-500 font-bold truncate flex-shrink">
      <slot />
    </div>
    <RiCloseLine
      v-if="removable"
      class="flex-none cursor-pointer w-4 h-4 text-jva-blue-500 hover:text-jva-blue-400"
      @click="$emit('removed', tag)"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    tag: {
      type: [String, Object],
      required: true,
    },
    removable: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
