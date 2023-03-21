<template>
  <section class="fr-accordion border-t border-b">
    <h3 class="fr-accordion__title">
      <button
        :class="[
          'fr-accordion__btn',
          'hover:bg-[#F6F6F6] active:bg-[#EDEDED]',
          { 'variant-big !px-2 !py-4 md:!px-4 md:!py-6 lg:!px-6 lg:!py-8 font-bold !text-lg md:!text-xl lg:!text-2xl': titleVariant === 'xxl' }
        ]"
        :aria-expanded="isOpen"
        :aria-controls="`accordion-${uuid}`"
        type="button"
        @click="isOpen = !isOpen"
      >
        <slot name="title" />
      </button>
    </h3>

    <div
      :id="`accordion-${uuid}`"
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
import uuid from '@/mixins/uuid'

export default {
  mixins: [uuid],
  props: {
    initialIsOpen: {
      type: Boolean,
      default: false
    },
    buttonClass: {
      type: String,
      default: ''
    },
    titleVariant: {
      type: String,
      default: null,
      validator: tv => ['xxl', null].includes(tv)
    }
  },
  data () {
    return {
      isOpen: this.initialIsOpen
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

.fr-accordion__btn {
  &.variant-big {
    &::after {
      --icon-size: 1.5rem;
      width: calc(var(--icon-size) + .5rem);
      mask-size: 50px 100%;
    }
  }
}
</style>
