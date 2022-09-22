<template>
  <button
    :class="[
      'font-medium border',
      'inline-flex items-center justify-center transition',

      {'px-3 py-1 text-sm': size === 'sm'},
      {'px-4 py-2 text-base': size === 'md'},
      {'px-6 py-2 text-lg min-h-[3rem]': size === 'lg'},

      {'text-white bg-jva-blue-500 hover:bg-jva-blue-800 active:bg-jva-blue-900 border-transparent': type === 'primary'},
      {'text-jva-blue-500 border-jva-blue-500 bg-transparent hover:bg-[#F6F6F6] active:bg-[#EDEDED]': type === 'secondary'},
      {'text-jva-blue-500 border-[#DDDDDD] bg-transparent hover:bg-[#F6F6F6] active:bg-[#EDEDED]': type === 'tertiary'},
      {'text-jva-blue-500 border-transparent bg-transparent hover:bg-[#F6F6F6] active:bg-[#EDEDED]': type === 'tertiary-no-outline'},
    ]"
    @click="$emit('click')"
  >
    <component
      :is="icon"
      v-if="icon"
      :class="[
        'fill-current mr-2',
        {'ml-[0.125rem]': ['sm', 'md'].includes(size)},
        {'ml-[-0.1875rem]': ['lg'].includes(size)},

        {'w-4 h-4': ['sm', 'md'].includes(size) },
        {'w-6 h-6': size === 'lg'},
      ]"
    />
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'md',
      validator: s => ['sm', 'md', 'lg'].includes(s)
    },
    type: {
      type: String,
      default: 'primary',
      validator: s => ['primary', 'secondary', 'tertiary', 'tertiary-no-outline'].includes(s)
    },
    icon: {
      // See vue-remix-icons.js
      type: [String, null],
      default: null
    }
  }
}
</script>
