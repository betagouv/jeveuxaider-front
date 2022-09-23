<template>
  <span
    :class="[
      'inline-flex items-center justify-center rounded-full max-w-full truncate',

      {'px-2 py-0.5 text-xs h-6': size == 'sm'},
      {'px-3 py-1 text-sm h-8': size == 'md'},

      {'text-[#161616] bg-[#EEEEEE]': $store.state.settings.theme === 'light' && !context},
      {'text-white bg-[#242424]': $store.state.settings.theme === 'dark' && !context},

      {'text-jva-blue-500 bg-[#E3E3FD] hover:bg-[#C1C1FB] active:bg-[#ADADF9]': context === 'clickable'}
    ]"
  >
    <component
      :is="icon"
      v-if="icon"
      :class="[
        'fill-current flex-none',

        {'w-3 h-3': size === 'sm'},
        {'w-4 h-4': size === 'md'},

        {'ml-[-0.09375rem]': size === 'sm'},
        {'ml-[-0.125rem]': size === 'md'},
        {'mr-[-0.09375rem]': size === 'sm' && iconOnly},
        {'mr-[-0.125rem]': size === 'md' && iconOnly},
      ]"
    />
    <span
      v-if="!iconOnly"
      :class="[
        'truncate',
        {'ml-1': ['sm', 'md'].includes(size) && icon},
      ]"
    >
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'sm',
      validator: s => ['sm', 'md'].includes(s)
    },
    context: {
      type: [String, null],
      default: null,
      validator: c => ['clickable', 'selectable', 'deletable'].includes(c) // @todo selectable, deletable
    },
    icon: {
      // See vue-remix-icons.js
      type: [String, null],
      default: null
    },
    iconOnly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
