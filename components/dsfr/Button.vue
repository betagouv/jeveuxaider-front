<template>
  <button
    :class="[
      'font-medium border',
      'inline-flex items-center justify-center transition',

      {'px-3 py-1 text-sm': size === 'sm'},
      {'px-4 py-2 text-base': size === 'md'},
      {'px-6 py-2 text-lg min-h-[3rem]': size === 'lg'},

      {'text-white bg-jva-blue-500 hover:bg-jva-blue-800 active:bg-jva-blue-900 border-transparent': type === 'primary'},
      {'text-jva-blue-500 border-jva-blue-500 bg-white hover:bg-[#F6F6F6] active:bg-[#EDEDED]': type === 'secondary'},
      {'text-jva-blue-500 border-[#DDDDDD] bg-white hover:bg-[#F6F6F6] active:bg-[#EDEDED]': type === 'tertiary'},
      {'text-jva-blue-500 border-transparent bg-white hover:bg-[#F6F6F6] active:bg-[#EDEDED]': type === 'tertiary-no-outline'},

      {'cursor-not-allowed !bg-[#E5E5E5] text-[#929292]': disabled && type === 'primary'},
      {'cursor-not-allowed !border-[#E5E5E5] text-[#929292]': disabled && ['secondary', 'tertiary'].includes(type)},
      {'cursor-not-allowed text-[#929292]': disabled && type === 'tertiary-no-outline'},
    ]"
    @click="$emit('click')"
  >
    <component
      :is="icon"
      v-if="icon && iconPosition === 'left'"
      :class="[
        'fill-current flex-none mr-2',
        {'ml-[0.125rem]': ['sm', 'md'].includes(size)},
        {'ml-[-0.1875rem]': ['lg'].includes(size)},

        {'w-4 h-4': ['sm', 'md'].includes(size) },
        {'w-6 h-6': size === 'lg'},
      ]"
    />

    <slot />

    <component
      :is="icon"
      v-if="icon && iconPosition === 'right'"
      :class="[
        'fill-current flex-none ml-2',
        {'mr-[0.125rem]': ['sm', 'md'].includes(size)},
        {'mr-[-0.1875rem]': ['lg'].includes(size)},

        {'w-4 h-4': ['sm', 'md'].includes(size) },
        {'w-6 h-6': size === 'lg'},
      ]"
    />
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
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: i => ['left', 'right'].includes(i)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="postcss" scoped>
button {
  outline: none;
  &:focus-visible {
    outline-style: solid;
    outline-color: #0a76f6;
    outline-width: 2px;
    outline-offset: 2px;
  }
}
</style>
