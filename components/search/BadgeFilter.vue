<template>
  <div
    class="inline-flex items-center rounded-full max-w-full border px-4 py-1.5 text-sm"
    :class="[
      isActive
        ? 'border-jva-blue-500 hover:bg-jva-blue-50'
        : ' text-gray-600 border-gray-500 hover:bg-gray-200',
    ]"
  >
    <span class="truncate">
      <slot />
    </span>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
