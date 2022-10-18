<template>
  <component
    :is="as"
    :class="[
      'tag inline-flex items-center justify-center rounded-full max-w-full relative transition',

      {'px-2 py-0.5 text-xs h-6': size == 'sm'},
      {'px-3 py-1 text-sm h-8': size == 'md'},

      {'text-[#161616] bg-[#EEEEEE]': $store.state.settings.theme === 'light' && !context},
      {'text-white bg-[#242424]': $store.state.settings.theme === 'dark' && !context},

      {'text-jva-blue-500 bg-[#E3E3FD] hover:bg-[#C1C1FB] active:bg-[#ADADF9]': (context === 'clickable' && !isActive) || (context === 'selectable' && !isSelected)},

      {'selected': isSelected},

      {'bg-jva-blue-500 text-white hover:bg-[#1212FF] active:bg-[#2323FF]': (isSelected || isActive)}
    ]"
    :aria-pressed="isSelected"
  >
    <component
      :is="icon"
      v-if="icon"
      :class="[
        'flex-none',

        {'fill-current': iconFillCurrent},

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

    <RiCheckboxCircleLine
      v-if="isSelected"
      :class="[
        'absolute top-[-6px] right-[-6px] w-[18px] h-[18px] fill-current border-2 rounded-full text-jva-blue-500',
        isSelectedClass
      ]"
    />
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'span'
    },
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
    },
    iconFillCurrent: {
      type: Boolean,
      default: true
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isSelectedClass: {
      type: String,
      default: 'border-white bg-white'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
