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
      'text-white bg-jva-blue hover:bg-jva-blue-hover border-transparent':
        variant == 'primary',
      'text-white bg-jva-green hover:bg-jva-green-hover border-transparent':
        variant == 'secondary',
      'text-jva-blue bg-gray-100 hover:bg-gray-50 border-transparent':
        variant == 'gray',
      'text-gray-500 bg-white hover:bg-gray-50 border border-gray-300':
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
      validator: s => ['primary', 'secondary', 'white', 'gray'].includes(s)
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
