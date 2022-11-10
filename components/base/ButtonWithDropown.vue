<template>
  <span class="relative z-0 inline-flex shadow-sm">
    <button
      type="button"
      class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-jva-blue-500 focus:border-jva-blue-500"
      @click="buttonClick"
    >
      <slot name="buttonText" />
    </button>
    <span v-click-outside="() => show = false" class="-ml-px relative block">
      <button
        id="option-menu-button"
        type="button"
        class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-jva-blue-500 focus:border-jva-blue-500 h-full"
        aria-expanded="true"
        aria-haspopup="true"
        @click="show = !show"
      >
        <span class="sr-only">Open options</span>
        <ChevronDownSolidIcon class="h-5 w-5" />
      </button>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="show"
          class="origin-top-right absolute right-0 mt-2 -mr-1 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="option-menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <slot name="items" />
          </div>
        </div>
      </transition>
    </span>
  </span>
</template>

<script>

export default {
  props: {
    buttonClick: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    close () {
      this.show = false
    }
  }

}
</script>
