<template>
  <div v-click-outside="() => (show = false)" class="relative inline-block text-left">
    <div
      id="menu-button"
      class="cursor-pointer"
      :class="menuButtonClass"
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
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="show"
        :class="[
          'absolute mt-2 shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30',
          positionClass,
        ]"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        @keydown.esc="show = false"
      >
        <div role="none" @click="() => closeOnClick && close()">
          <slot name="items" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    menuButtonClass: {
      type: String,
      default: null,
    },
    positionClass: {
      type: String,
      default: 'origin-top-right right-0',
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    close() {
      this.show = false
    },
    onKeydown(e) {
      // todo: même logique de navigation que selectAdvanced :
      // tab = hide,
      // navigation au clavier
      // selection par défaut du premier de la liste
    },
  },
})
</script>
