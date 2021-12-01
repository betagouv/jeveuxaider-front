<template>
  <div
    class="component--avatar overflow-hidden rounded-full flex-none flex items-center justify-center text-white"
    :class="[
      width,
      fontSize,
      { 'bg-jva-blue-500': !initialSource },
      { 'bg-white': initialSource },
    ]"
  >
    <template v-if="icon">
      <i :class="icon" />
    </template>

    <template v-else>
      <template v-if="initialSource">
        <img
          class="object-cover w-full h-full"
          :src="initialSource"
          :alt="fallback"
          data-not-lazy
          @error="onSourceError"
        >
      </template>
      <template v-else>
        {{ fallback }}
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    fallback: {
      type: String,
      default: undefined
    },
    source: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    width: {
      type: String,
      default: 'w-10 h-10'
    },
    fontSize: {
      type: String,
      default: 'text-sm'
    }
  },
  data () {
    return {
      initialSource: this.source
    }
  },
  watch: {
    source: {
      handler (value) {
        if (value && typeof this.fallback === 'undefined') {
          console.error(
            "Avatar.vue : property 'fallback' is required when using property 'source'. "
          )
        }
        this.initialSource = value
      },
      immediate: true
    }
  },
  methods: {
    onSourceError () {
      // console.error('Source error', this.initialSource)
      this.initialSource = null
    }
  }
}
</script>
