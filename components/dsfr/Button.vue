<template>
  <component
    :is="tag"
    :to="tag.name === 'NuxtLink' ? to : undefined"
    :target="to && isExternal ? '_blank' : undefined"
    :href="tag === 'a' ? to : undefined"
    :type="isSubmit ? 'submit' : 'button'"
    :class="[
      'font-medium border transition-all initial:flex-none',
      'inline-flex items-center justify-center whitespace-pre-wrap',

      disabled ? 'cursor-not-allowed' : 'cursor-pointer',

      { 'px-2 py-1 text-xs min-h-[32px]': size === 'xs' },
      { 'px-3 py-1 text-sm min-h-[34px]': size === 'sm' },
      { 'px-4 py-2 text-base min-h-[42px]': size === 'md' },
      { 'px-6 py-2 text-lg min-h-[3rem]': size === 'lg' },

      {
        'text-white bg-jva-blue-500 hover:bg-jva-blue-800 active:bg-jva-blue-900 border-transparent':
          type === 'primary' && !disabled,
      },
      {
        'text-jva-blue-500 border-jva-blue-500 bg-white hover:bg-[#F6F6F6] active:bg-[#EDEDED]':
          type === 'secondary' && !disabled,
      },
      {
        'text-jva-blue-500 border-[#DDDDDD] bg-white hover:bg-[#F6F6F6] active:bg-[#EDEDED]':
          type === 'tertiary' && !disabled,
      },
      {
        'text-jva-blue-500 border-transparent bg-white hover:bg-[#F6F6F6] active:bg-[#EDEDED]':
          type === 'tertiary-no-outline' && !disabled,
      },
      { 'bg-transparent': type === 'transparent' },
      {
        '!bg-[#E5E5E5] text-[#929292]': disabled && type === 'primary',
      },
      {
        '!border-[#E5E5E5] text-[#929292]': disabled && ['secondary', 'tertiary'].includes(type),
      },
      {
        'text-[#929292]': disabled && type === 'tertiary-no-outline',
      },
    ]"
    :disabled="disabled"
    no-prefetch
  >
    <component
      :is="iconOrLoading"
      v-if="iconOrLoading && iconPosition === 'left'"
      :class="[
        'fill-current flex-none',
        { 'ml-[-0.125rem]': ['xs', 'sm', 'md'].includes(size) },
        { 'ml-[-0.1875rem]': ['lg'].includes(size) },
        { 'mr-2': !iconOnly },
        { 'mr-[-0.125rem]': ['sm', 'md'].includes(size) && iconOnly },
        { 'mr-[-0.1875rem]': ['lg'].includes(size) && iconOnly },

        { 'w-4 h-4': ['xs'].includes(size) },
        { 'w-4 h-4': ['sm', 'md'].includes(size) },
        { 'w-6 h-6': size === 'lg' },

        { 'animate-spin': loading },

        iconClass,
      ]"
    />

    <slot />

    <component
      :is="iconOrLoading"
      v-if="iconOrLoading && iconPosition === 'right'"
      :class="[
        'fill-current flex-none',
        { 'mr-[-0.125rem]': ['xs', 'sm', 'md'].includes(size) },
        { 'mr-[-0.1875rem]': ['lg'].includes(size) },
        { 'ml-2': !iconOnly },
        { 'ml-[-0.125rem]': ['sm', 'md'].includes(size) && iconOnly },
        { 'ml-[-0.1875rem]': ['lg'].includes(size) && iconOnly },

        { 'w-3 h-3': ['xs'].includes(size) },
        { 'w-4 h-4': ['sm', 'md'].includes(size) },
        { 'w-6 h-6': size === 'lg' },

        { 'animate-spin': loading },

        iconClass,
      ]"
    />
  </component>
</template>

<script>
export default defineNuxtComponent({
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (s) => ['xs', 'sm', 'md', 'lg'].includes(s),
    },
    type: {
      type: String,
      default: 'primary',
      validator: (s) =>
        ['primary', 'transparent', 'secondary', 'tertiary', 'tertiary-no-outline'].includes(s),
    },
    icon: {
      type: [String, null],
      default: null,
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: (i) => ['left', 'right'].includes(i),
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    iconClass: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: null,
    },
    isSubmit: {
      type: Boolean,
      default: false,
    },
    as: {
      type: String,
      default: null,
    },
  },
  computed: {
    iconOrLoading() {
      const iconName = this.loading ? 'RiLoader5Line' : this.icon ?? null
      return iconName ? resolveComponent(iconName) : null
    },
    tag() {
      return (
        this.as ?? (this.to ? (this.isExternal ? 'a' : resolveComponent('NuxtLink')) : 'button')
      )
    },
  },
})
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
