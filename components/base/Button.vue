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
      'text-white bg-jva-blue-primary hover:bg-jva-blue-hover border-transparent':
        variant == 'primary',
      'text-white bg-jva-green-primary hover:bg-jva-green-hover border-transparent':
        variant == 'primary-green',
      'text-jva-blue-primary bg-true-gray-100 hover:bg-true-gray-50 border-transparent':
        variant == 'secondary',
      'text-cool-gray-700 bg-white hover:bg-cool-gray-50 border border-cool-gray-300':
        variant == 'white',
      'text-white bg-jva-red-primary hover:bg-jva-red-primary-hover border':
        variant == 'red',
      'px-2.5 py-1.5 shadow-sm text-xs font-bold': size == 'xs',
      'px-3 py-2 shadow-sm text-sm leading-4 font-bold': size == 'sm',
      'px-4 py-2 shadow-sm text-sm font-bold': size == 'md',
      'px-4 py-2 shadow-sm text-base font-bold': size == 'lg',
      'px-6 py-3 shadow-sm text-base font-bold': size == 'xl',
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
      validator: s => ['primary', 'primary-green', 'secondary', 'white', 'red'].includes(s)
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
