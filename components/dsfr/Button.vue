<template>
  <component
    :is="tag"
    :to="tag === 'nuxt-link' && to"
    :target="to && isExternal ? '_blank' : null"
    :href="to"
    :type="isSubmit ? 'submit' : (tag === 'button' ? 'button' : null)"
    :class="[
      'font-medium border transition flex-none',
      'inline-flex items-center justify-center whitespace-pre-wrap',

      {'px-3 py-1 text-sm min-h-[34px]': size === 'sm'},
      {'px-4 py-2 text-base min-h-[42px]': size === 'md'},
      {'px-6 py-2 text-lg min-h-[3rem]': size === 'lg'},

      {'text-white bg-jva-blue-500 hover:bg-jva-blue-800 active:bg-jva-blue-900 border-transparent': type === 'primary'},
      {'text-jva-blue-500 border-jva-blue-500 bg-white hover:bg-[#F6F6F6] active:bg-[#EDEDED]': type === 'secondary'},
      {'text-jva-blue-500 border-[#DDDDDD] bg-white hover:bg-[#F6F6F6] active:bg-[#EDEDED]': type === 'tertiary'},
      {'text-jva-blue-500 border-transparent bg-white hover:bg-[#F6F6F6] active:bg-[#EDEDED]': type === 'tertiary-no-outline'},
      {'bg-transparent': type === 'transparent'},

      {'cursor-not-allowed !bg-[#E5E5E5] text-[#929292]': disabled && type === 'primary'},
      {'cursor-not-allowed !border-[#E5E5E5] text-[#929292]': disabled && ['secondary', 'tertiary'].includes(type)},
      {'cursor-not-allowed text-[#929292]': disabled && type === 'tertiary-no-outline'},
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <component
      :is="iconOrLoading"
      v-if="iconOrLoading && iconPosition === 'left'"
      :class="[
        'fill-current flex-none',
        {'ml-[-0.125rem]': ['sm', 'md'].includes(size)},
        {'ml-[-0.1875rem]': ['lg'].includes(size)},
        {'mr-2': !iconOnly},
        {'mr-[-0.125rem]': ['sm', 'md'].includes(size) && iconOnly},
        {'mr-[-0.1875rem]': ['lg'].includes(size) && iconOnly},

        {'w-4 h-4': ['sm', 'md'].includes(size) },
        {'w-6 h-6': size === 'lg'},

        {'animate-spin': loading },

        iconClass
      ]"
    />

    <slot />

    <component
      :is="iconOrLoading"
      v-if="iconOrLoading && iconPosition === 'right'"
      :class="[
        'fill-current flex-none',
        {'mr-[-0.125rem]': ['sm', 'md'].includes(size)},
        {'mr-[-0.1875rem]': ['lg'].includes(size)},
        {'ml-2': !iconOnly},
        {'ml-[-0.125rem]': ['sm', 'md'].includes(size) && iconOnly},
        {'ml-[-0.1875rem]': ['lg'].includes(size) && iconOnly},

        {'w-4 h-4': ['sm', 'md'].includes(size) },
        {'w-6 h-6': size === 'lg'},

        {'animate-spin': loading },

        iconClass
      ]"
    />
  </component>
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
      validator: s => ['primary', 'transparent', 'secondary', 'tertiary', 'tertiary-no-outline'].includes(s)
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
    iconClass: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    isExternal: {
      type: Boolean,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    isSubmit: {
      type: Boolean,
      default: false
    },
    as: {
      type: String,
      default: null
    }
  },
  computed: {
    iconOrLoading () {
      return this.loading ? 'RiLoader5Line' : this.icon
    },
    tag () {
      return this.as ?? (this.to ? (this.isExternal ? 'a' : 'nuxt-link') : 'button')
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
