<template>
  <button
    :type="type"
    class="
      inline-flex
      items-center
      border
      focus:outline-none focus:ring-2 focus:ring-offset-2
    "
    :class="[{
               'text-white bg-jva-blue-500 hover:bg-jva-blue-600 border-transparent focus:ring-jva-blue-500':
                 variant == 'primary',
               'text-white bg-jva-green-500 hover:bg-jva-green-600 border-transparent focus:ring-jva-green-500':
                 variant == 'green',
               'jva-blue bg-cool-gray-100 hover:bg-cool-gray-50 border-gray-200 focus:ring-jva-blue-500':
                 variant == 'secondary',
               'text-cool-gray-700 bg-white hover:bg-cool-gray-50 border border-cool-gray-300 focus:ring-jva-blue-500':
                 variant == 'white',
               'text-white bg-jva-red-500 hover:bg-jva-red-600 border-transparent focus:ring-jva-red-500':
                 variant == 'red',
               'px-2.5 py-1.5 shadow-sm text-xs font-bold': size == 'xs',
               'px-3 py-2 shadow-sm text-sm leading-4 font-bold': size == 'sm',
               'px-4 py-2 shadow-sm text-sm font-bold': size == 'md',
               'px-4 py-2 shadow-sm text-base font-bold': size == 'lg',
               'px-6 py-3 shadow-sm text-base font-bold': size == 'xl',
             },
             rounded ? 'rounded-full' : 'rounded-md'
    ]"
  >
    <SpinIcon
      v-if="loading"
      class="animate-spin"
      :class="{
        'mr-2 h-3 w-3': size == 'xs',
        'mr-3 h-3 w-3': size == 'sm',
        'mr-3 h-4 w-4': size == 'md',
        'mr-4 h-5 w-5': size == 'lg',
        'mr-4 h-6 w-6': size == 'xl',
      }"
    />

    <component
      :is="icon"
      v-if="icon && !loading"
      :class="{
        'mr-2 h-3 w-3': size == 'xs',
        'mr-3 h-3 w-3': size == 'sm',
        'mr-3 h-4 w-4': size == 'md',
        'mr-4 h-5 w-5': size == 'lg',
        'mr-4 h-6 w-6': size == 'xl',
      }"
    />
    <slot />
  </button>
</template>

<script>
import SpinIcon from '@/components/icons/SpinIcon'

export default {
  components: {
    SpinIcon
  },
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: s => ['primary', 'green', 'secondary', 'white', 'red'].includes(s)
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
