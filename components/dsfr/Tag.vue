<template>
  <component
    :is="as"
    :type="as === 'button' ? 'button' : null"
    :class="[
      'tag inline-flex items-center justify-center rounded-full max-w-full relative transition',

      {'px-2 py-0.5 text-xs h-6': size == 'sm'},
      {'px-3 py-1 text-sm h-8': size == 'md'},

      {'text-[#161616] bg-[#EEEEEE]': !customTheme && !context},

      {'cursor-pointer': ['clickable', 'selectable', 'deletable'].includes(context)},

      {'text-jva-blue-500 bg-[#E3E3FD] hover:bg-[#C1C1FB] active:bg-[#ADADF9]': (context === 'clickable' && !isActive) || (context === 'selectable' && !isSelected)},

      {'selected': isSelected},

      {'bg-jva-blue-500 text-white hover:bg-[#1212FF] active:bg-[#2323FF]': (isSelected || isActive)}
    ]"
    :aria-pressed="isSelected"
  >
    <component
      :is="icon"
      v-if="icon && iconPosition === 'left'"
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
        {'ml-1': ['sm', 'md'].includes(size) && icon && iconPosition === 'left'},
        {'mr-1': ['sm', 'md'].includes(size) && icon && iconPosition === 'right'},
      ]"
    >
      <slot />
    </span>

    <component
      :is="iconOrClearable"
      v-if="icon && iconPosition === 'right'"
      :class="[
        'flex-none',
        {'fill-current': iconFillCurrent},
        {'w-3 h-3': size === 'sm'},
        {'w-4 h-4': size === 'md'},
        {'mr-[-0.09375rem]': size === 'sm'},
        {'mr-[-0.125rem]': size === 'md'},
        {'ml-[-0.09375rem]': size === 'sm' && iconOnly},
        {'ml-[-0.125rem]': size === 'md' && iconOnly},
        {'pointer-events-none': clearable && !isActive}
      ]"
      @click.native.stop="isActive ? $emit('clear') : $emit('icon-right-click')"
    />

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
    clearable: {
      type: Boolean,
      default: false
    },
    context: {
      type: [String, null],
      default: null,
      validator: c => ['clickable', 'selectable', 'deletable'].includes(c)
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
    },
    customTheme: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconOrClearable () {
      return this.isActive ? 'RiCloseFill' : this.icon
    }
  }

}
</script>
