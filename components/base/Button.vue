<template>
  <button
    :type="type"
    class="
      inline-flex
      items-center
      border
      rounded-md
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    "
    :class="{
      'w-full justify-center': full,
      'text-white bg-indigo-600 hover:bg-indigo-700 border-transparent':
        variant == 'primary',
      'text-white bg-red-600 hover:bg-red-700 border-transparent':
        variant == 'danger',
      'text-primary bg-indigo-200 hover:bg-indigo-300 border-transparent':
        variant == 'secondary',
      'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300':
        variant == 'white',
      'px-2.5 py-1.5 shadow-sm text-xs font-medium': size == 'xs',
      'px-3 py-2 shadow-sm text-sm leading-4 font-medium': size == 'sm',
      'px-4 py-2 shadow-sm text-sm font-medium': size == 'md',
      'px-4 py-2 shadow-sm text-base font-medium': size == 'lg',
      'px-6 py-3 shadow-sm text-base font-medium': size == 'xl',
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: s => ['primary', 'secondary', 'white', 'danger'].includes(s)
    },
    size: {
      type: String,
      default: 'md',
      validator: s => ['xs', 'sm', 'md', 'lg', 'xl'].includes(s)
    },
    type: {
      type: String,
      default: 'button',
      validator: s => ['button', 'submit'].includes(s)
    }
  },
  computed: {
    classes () {
      switch (this.as) {
        case 'h1':
          return 'text-4xl font-extrabold text-gray-900 tracking-tight'
        case 'h2':
          return 'text-3xl font-bold text-gray-700 tracking-tight'
        case 'h3':
          return 'text-xl font-bold text-gray-400 tracking-tight'
        default:
          return 'text-4xl font-extrabold text-gray-900 tracking-tight'
      }
    }
  }
}
</script>

<style>

</style>
