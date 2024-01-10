<template>
  <component
    :is="as"
    :type="as === 'button' ? 'button' : null"
    :class="[
      'tag inline-flex items-center justify-center rounded-full max-w-full relative transition',
      { 'px-2 py-0.5 text-xs h-6': size == 'sm' },
      { 'px-3 py-1 text-sm h-8': size == 'md' },
      {
        'text-[#161616] bg-[#EEEEEE]': context === 'default' && !customTheme,
      },
      {
        'text-jva-blue-500 bg-[#E3E3FD] hover:bg-[#C1C1FB] active:bg-[#ADADF9] cursor-pointer':
          ['clickable', 'selectable'].includes(context) && !isActive,
      },
      {
        'bg-jva-blue-500 text-white hover:bg-[#1212FF] active:bg-[#2323FF]':
          ['clickable', 'selectable'].includes(context) && isActive,
      },
      {
        'bg-jva-blue-500 text-white cursor-pointer hover:bg-[#1212FF]': context === 'deletable',
      },
    ]"
    :aria-pressed="isActive"
  >
    <template v-if="icon && iconPosition === 'left'">
      <component
        :is="iconComponent"
        :class="[
          'flex-none fill-current',
          { 'w-3 h-3': size === 'sm' },
          { 'w-4 h-4': size === 'md' },
          { 'ml-[-0.09375rem]': size === 'sm' },
          { 'ml-[-0.125rem]': size === 'md' },
          { 'mr-[-0.09375rem]': size === 'sm' && iconOnly },
          { 'mr-[-0.125rem]': size === 'md' && iconOnly },
        ]"
      />
    </template>

    <span
      v-if="!iconOnly"
      :class="[
        'truncate',
        {
          'ml-1': ['sm', 'md'].includes(size) && icon && iconPosition === 'left',
        },
        {
          'mr-1': ['sm', 'md'].includes(size) && icon && iconPosition === 'right',
        },
      ]"
    >
      <slot />
    </span>

    <template v-if="(icon || (clearable && isActive)) && iconPosition === 'right'">
      <component
        :is="clearable && isActive ? iconClearableComponent : iconComponent"
        :class="[
          'flex-none fill-current',
          { 'w-3 h-3': size === 'sm' },
          { 'w-4 h-4': size === 'md' },
          { 'mr-[-0.09375rem]': size === 'sm' },
          { 'mr-[-0.125rem]': size === 'md' },
          { 'ml-[-0.09375rem]': size === 'sm' && iconOnly },
          { 'ml-[-0.125rem]': size === 'md' && iconOnly },
          { 'pointer-events-none': clearable && !isActive },
          iconClass,
        ]"
        @click.native.stop="isActive ? $emit('clear') : $emit('icon-right-click')"
      />
    </template>

    <template v-if="context === 'deletable'">
      <RiCloseFill
        :class="[
          'flex-none fill-current',
          { 'w-3 h-3 ml-1 mr-[-0.09375rem]': size === 'sm' },
          { 'w-4 h-4 ml-1 mr-[-0.125rem]': size === 'md' },
        ]"
        @click.native.stop="$emit('delete')"
      />
    </template>

    <template v-if="context === 'selectable' && isActive">
      <RiCheckboxCircleLine
        :class="[
          'absolute top-[-6px] right-[-6px] w-[18px] h-[18px] fill-current border-2 rounded-full text-jva-blue-500',
          'border-gray-50 bg-gray-50',
        ]"
      />
    </template>
  </component>
</template>

<script>
export default defineNuxtComponent({
  emits: ['clear', 'delete', 'icon-right-click'],
  props: {
    as: {
      type: String,
      default: 'span', // span | button | label
    },
    size: {
      type: String,
      default: 'sm',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    context: {
      type: [String, null],
      default: 'default', // default | clickable | selectable | deletable
    },
    icon: {
      type: [String, null],
      default: null,
    },
    iconClass: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    customTheme: {
      type: Boolean,
      default: false,
    },
    // isSelectedClass: {
    //   type: String,
    //   default: 'border-white bg-white',
    // },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const iconComponent = props.icon ? resolveComponent(props.icon) : undefined
    const iconClearableComponent = props.clearable ? resolveComponent('RiCloseFill') : undefined

    return {
      iconComponent,
      iconClearableComponent,
    }
  },
})
</script>
