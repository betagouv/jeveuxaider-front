<template>
  <button
    :type="type"
    class="inline-flex items-center border font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-lg hover:scale-105 transform transition disabled:opacity-25 disabled:cursor-not-allowed"
    :class="[
      {
        'text-white bg-jva-blue-500 hover:bg-jva-blue-700 border-transparent focus:ring-jva-blue-500': variant == 'primary',
        'text-white bg-jva-green-500 hover:bg-jva-green-600 border-transparent focus:ring-jva-green-500': variant == 'green',
        'jva-blue bg-cool-gray-100 hover:bg-cool-gray-50 border-gray-200 focus:ring-jva-blue-500': variant == 'secondary',
        'text-cool-gray-700 bg-white hover:bg-cool-gray-50 border border-cool-gray-300 focus:ring-cool-gray-500': variant == 'white',
        'text-jva-blue-400 bg-white hover:bg-cool-gray-50 border border-cool-gray-300 focus:ring-white focus:ring-offset-jva-blue-400': variant == 'white-blue',
        'text-jva-green-500 bg-white hover:bg-cool-gray-50 border border-cool-gray-300 focus:ring-white focus:ring-offset-jva-green-500': variant == 'white-green',
        'text-jva-red-500 bg-white hover:bg-cool-gray-50 border border-cool-gray-300 focus:ring-white focus:ring-offset-jva-red-500': variant == 'white-red',
        'text-white bg-jva-red-500 hover:bg-jva-red-600 border-transparent focus:ring-jva-red-500': variant == 'red',
        'px-2 py-1 text-xs': size == 'xxs',
        'px-2.5 py-1.5 text-xs': size == 'xs',
        'px-3 py-2 text-sm leading-4': size == 'sm',
        'px-4 py-2 text-sm': size == 'md',
        'px-4 py-2 text-base': size == 'lg',
        'px-6 py-3 text-lg': size == 'xl',
        'w-full justify-center' : full
      },
      rounded ? 'rounded-full' : null
    ]"
  >
    <SpinIcon
      v-if="loading"
      class="animate-spin"
      :class="{
        'h-4 w-4': ['xxs', 'xs', 'sm', 'md'].includes(size),
        'h-5 w-5': size == 'lg',
        'h-6 w-6': size == 'xl',
        'mr-1': size == 'xxs' && $slots.default,
        'mr-2': size == 'xs' && $slots.default,
        'mr-3': ['sm', 'md', 'lg'].includes(size) && $slots.default,
        'mr-4': size == 'xl' && $slots.default,
      }"
    />

    <component
      :is="icon"
      v-if="icon && !loading"
      :class="{
        'h-4 w-4': ['xxs', 'xs', 'sm', 'md'].includes(size),
        'h-5 w-5': size == 'lg',
        'h-6 w-6': size == 'xl',
        'mr-1': size == 'xxs' && $slots.default,
        'mr-2': ['xs', 'sm', 'md', 'lg'].includes(size) && $slots.default,
        'mr-3': size == 'xl' && $slots.default,
      }"
    />

    <slot />
  </button>
</template>

<script>
import SpinIcon from '@/components/icon/SpinIcon'

export default {
  components: {
    SpinIcon
  },
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: s => ['primary', 'green', 'secondary', 'white', 'white-green', 'white-blue', 'red', 'white-red'].includes(s)
    },
    size: {
      type: String,
      default: 'md',
      validator: s => ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'].includes(s)
    },
    type: {
      type: String,
      default: 'button',
      validator: s => ['button', 'submit'].includes(s)
    },
    rounded: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
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
