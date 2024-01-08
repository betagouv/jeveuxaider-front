<template>
  <div class="w-full relative">
    <component
      :is="icon"
      v-if="icon && iconPosition === 'left'"
      :class="['absolute inset-y-0 left-4 fill-current flex-none my-auto', 'w-4 h-4']"
    />

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :class="[
        'border-none rounded-t w-full h-full',

        {
          'bg-[#EEEEEE] shadow-[inset_0_-2px_0_0_#3A3A3A] focus:!shadow-[inset_0_-2px_0_0_#3A3A3A]':
            variant === 'default',
        },
        {
          'bg-white shadow-[inset_0_-2px_0_0_#000091] focus:!shadow-[inset_0_-2px_0_0_#000091]':
            variant === 'white',
        },

        { '!shadow-[inset_0_-2px_0_0_#ce0500]': error },
        { '!shadow-[inset_0_-2px_0_0_#18753c]': success },

        { 'py-3': size === 'lg' },

        {
          'pl-12': icon && iconPosition === 'left' && ['md', 'lg'].includes(size),
        },
        {
          'pr-12': icon && iconPosition === 'right' && ['md', 'lg'].includes(size),
        },

        inputClass,
      ]"
      @keypress.space="onKeypressSpace"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <component
      :is="icon"
      v-if="icon && iconPosition === 'right'"
      :class="['absolute inset-y-0 right-4 fill-current flex-none my-auto', 'w-4 h-4']"
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
      validator: (s) => ['md', 'lg'].includes(s),
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
    variant: {
      type: String,
      default: 'default',
      validator: (i) => ['white', 'default'].includes(i),
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
input {
  --tw-ring-shadow: 0 0 #000 !important;
}

/* @todo */
/* input[type="search"]::-webkit-search-cancel-button {

} */
</style>
