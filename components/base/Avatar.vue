<template>
  <div
    class="component--avatar overflow-hidden rounded-full flex-none flex items-center justify-center"
    :class="[
      // Size
      {'w-10 h-10': size == 'xs'},
      {'w-12 h-12': size == 'sm'},
      {'w-16 h-16': size == 'md'},

      // Background color
      {'bg-jva-blue-500 ': backgroundColor == 'blue' && !sources},
      {'bg-white ': backgroundColor == 'white' && !sources},
    ]"
  >
    <img
      v-if="sources"
      :srcset="sources"
      :src="imgSrc"
      :alt="initials"
      class="object-cover w-full h-full"
      @error="onError"
    >

    <span
      v-else-if="initials"
      class="first-letter:uppercase"
      :class="[
        // Font size
        {'text-lg': size == 'sm'},
        {'text-2xl': size == 'md'},

        // Colors
        {'text-white': backgroundColor == 'blue'},
        {'text-gray-700': backgroundColor == 'white'},
      ]"
    >
      {{ initials }}
    </span>

    <UserSolidIcon
      v-else
      :class="[
        // Sizes
        {'h-4 w-4': size == 'xs'},
        {'h-6 w-6': size == 'sm'},
        {'h-8 w-8': size == 'md'},

        // Colors
        {'text-white': backgroundColor == 'blue'},
        {'text-gray-700': backgroundColor == 'white'},
      ]"
    />
  </div>
</template>

<script>
export default {
  props: {
    imgSrcset: {
      type: String,
      default: undefined
    },
    imgSrc: {
      type: String,
      default: undefined
    },
    initials: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: 'sm',
      validator: s => ['xs', 'sm', 'md'].includes(s)
    },
    backgroundColor: {
      type: String,
      default: 'blue',
      validator: b => ['blue', 'white'].includes(b)
    }
  },
  data () {
    return {
      sources: this.imgSrcset
    }
  },
  watch: {
    imgSrcset (newVal) {
      this.sources = newVal
    }
  },
  methods: {
    onError () {
      this.sources = null
    }
  }
}
</script>
