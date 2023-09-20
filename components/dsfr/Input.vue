<template>
  <div class="w-full relative">
    <component
      :is="icon"
      v-if="icon && iconPosition === 'left'"
      :class="[
        'absolute inset-y-0 left-3 md:left-6 fill-current flex-none my-auto',
        'w-4 h-4',
        { 'md:w-6 md:h-6': size === 'xl' },
      ]"
    />

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :class="[
        'inner-border border-none rounded-t w-full h-full',
        { error: error },
        { success: success },

        { 'size-md': size === 'md' },
        { 'size-lg py-3': size === 'lg' },
        { 'size-xl py-6 px-6 sm:text-lg md:text-xl': size === 'xl' },

        {
          'pl-10': icon && iconPosition === 'left' && ['md', 'lg'].includes(size),
        },
        {
          'pr-10': icon && iconPosition === 'right' && ['md', 'lg'].includes(size),
        },
        { 'pl-10 md:pl-16': icon && iconPosition === 'left' && size === 'xl' },
        { 'pr-10 md:pr-16': icon && iconPosition === 'right' && size === 'xl' },

        inputClass,
      ]"
      @keypress.space="onKeypressSpace"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <component
      :is="icon"
      v-if="icon && iconPosition === 'right'"
      :class="[
        'absolute inset-y-0 right-3 md:right-6 fill-current flex-none my-auto',
        'w-4 h-4',
        { 'md:w-6 md:h-6': size === 'xl' },
      ]"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: null,
    },
    size: {
      type: String,
      default: 'md',
      validator: (s) => ['md', 'lg', 'xl'].includes(s),
    },
    error: {
      type: Boolean,
      default: null,
    },
    success: {
      type: Boolean,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: null,
    },
    icon: {
      // See vue-remix-icons.js
      type: [String, null],
      default: null,
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: (i) => ['left', 'right'].includes(i),
    },
    inputClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    onKeypressSpace(event) {
      if (this.type === 'email') {
        event.preventDefault()
      }
    },
  },
})
</script>

<style lang="postcss" scoped>
.inner-border {
  box-shadow: inset 0 -2px 0 0 #000091;
  &.error {
    box-shadow: inset 0 -2px 0 0 #ce0500;
  }
  &.success {
    box-shadow: inset 0 -2px 0 0 #18753c;
  }
}

input {
  outline: none;
  &:focus-visible {
    outline-style: solid;
    outline-color: #0a76f6;
    outline-width: 2px;
    outline-offset: 2px;
  }
  &.size-xl {
    outline-offset: 4px;
  }
}
</style>
