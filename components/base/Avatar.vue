<template>
  <div
    class="component--avatar overflow-hidden rounded-full flex-none flex items-center justify-center"
    :class="[
      // Size
      {'w-10 h-10': size == 'xs'},
      {'w-12 h-12': size == 'sm'},
      {'w-16 h-16': size == 'md'},

      // Background color
      {'bg-jva-blue-500 ': backgroundColor == 'blue' && !srcset},
      {'bg-white ': backgroundColor == 'white' && !srcset},
    ]"
  >
    <img
      v-if="srcset"
      :srcset="srcset"
      :alt="initials"
      class="object-cover w-full h-full"
      data-not-lazy
      @error="onError"
    >

    <span
      v-else-if="initials"
      class="uppercase"
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
    image: {
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
      srcset: this.image
    }
  },
  methods: {
    onError () {
      this.srcset = null
    }
  }
}
</script>
