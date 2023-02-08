<template>
  <section class="fr-accordion border-t border-b">
    <h3 class="fr-accordion__title">
      <button
        :class="[
          'fr-accordion__btn',
          'hover:bg-[#F6F6F6] active:bg-[#EDEDED]',
        ]"
        :aria-expanded="isOpen"
        :aria-controls="`accordion-${_uid}`"
        @click="isOpen = !isOpen"
      >
        <slot name="title" />
      </button>
    </h3>

    <div
      :id="`accordion-${_uid}`"
      :class="[
        'fr-collapse',
        { 'fr-collapse--expanded': isOpen },
        '!mx-0'
      ]"
    >
      <slot />
    </div>
  </section>
</template>

<script>
import '@gouvfr/dsfr/dist/component/accordion/accordion.main.min.css'

export default {
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="postcss" scoped>
.fr-collapse {
  overflow: hidden;
  transition: all .3s;
  max-height: 0;
}

.fr-collapse:not(.fr-collapse--expanded) {
  visibility: hidden;
}

.fr-collapse--expanded {
  max-height: initial !important;
  visibility: visible;
}

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
