<template>
  <button
    class="group flex justify-between items-center cursor-pointer p-4 w-full text-left border-l-4 border-transparent hover:border-jva-blue-500"
    :class="[
      {
        'p-4': size == 'md',
        'px-3 py-2': size == 'sm'
      }
    ]"
    role="menuitem"
  >
    <div class="truncate mr-2">
      <div v-if="label" class="text-gray-500 uppercase text-xs">
        {{ label }}
      </div>
      <div class="text-[#3A3A3A] text-sm truncate group-hover:text-jva-blue-500">
        <slot />
      </div>
    </div>
    <slot name="iconRight" />
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
