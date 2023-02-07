<template>
  <button
    class="group flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50 w-full"
    :class="[{'p-4': size == 'md', 'px-3 py-2': size == 'sm'}]"
    role="menuitem"
  >
    <div class="truncate mr-2">
      <div v-if="label" class="text-gray-500 uppercase text-xs">
        {{ label }}
      </div>
      <div class="text-gray-900 text-sm truncate">
        <slot />
      </div>
    </div>
    <slot name="icon" />
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'md'
    }
  }
}
</script>
