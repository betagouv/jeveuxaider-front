<template>
  <div v-click-outside="() => show = false" class="relative inline-block text-left">
    <div
      id="menu-button"
      class="cursor-pointer"
      :aria-expanded="show"
      aria-haspopup="true"

      @keydown="onKeydown"
      @click="show = !show"
      @keydown.esc="show = false"
    >
      <span class="sr-only">Open options</span>
      <slot name="button" />
    </div>

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
        :class="[
          ' absolute  mt-2 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30',
          {'origin-top-right right-0': position == 'right', 'origin-top-left left-0': position == 'left'}
        ]"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        @keydown.esc="show = false"
      >
        <div class="" role="none">
          <slot name="items" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'right'
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
    },
    onKeydown (e) {
      // todo: même logique de navigation que selectAdvanced :
      // tab = hide,
      // navigation au clavier
      // selection par défaut du premier de la liste
    }
  }
}
</script>
