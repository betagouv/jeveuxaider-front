<template>
  <section class="fr-accordion border-t border-b">
    <h3 class="fr-accordion__title">
      <button
        :class="[
          'fr-accordion__btn',
          {
            'variant-big !px-2 !py-4 md:!px-4 md:!py-6 lg:!px-6 lg:!py-8 font-bold !text-lg md:!text-xl lg:!text-2xl lg:!leading-9':
              titleVariant === 'xxl',
          },
          titleColorClass,
        ]"
        :aria-expanded="isOpen"
        :aria-controls="`accordion-${uuid}`"
        type="button"
        @click="isOpen = !isOpen"
      >
        <span :class="{ 'lg:flex lg:items-center': titleEmoji }">
          <span
            v-if="titleEmoji"
            aria-hidden="true"
            :class="[
              'mr-1 md:mr-2 font-emoji',
              { 'lg:text-[32px] lg:mr-6': titleVariant === 'xxl' },
            ]"
          >
            {{ titleEmoji }}
          </span>
          <span>
            <slot name="title" />
          </span>
        </span>
      </button>
    </h3>

    <div
      :id="`accordion-${uuid}`"
      :class="[
        'fr-collapse',
        { 'fr-collapse--expanded': isOpen },
        '!mx-0',
        { '!px-2 md:!px-4 lg:!px-6': titleVariant === 'xxl' },
      ]"
    >
      <slot />
    </div>
  </section>
</template>

<script>
import '@gouvfr/dsfr/dist/component/accordion/accordion.main.min.css'
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  props: {
    initialIsOpen: {
      type: Boolean,
      default: false,
    },
    buttonClass: {
      type: String,
      default: '',
    },
    titleVariant: {
      type: String,
      default: null,
      validator: (tv) => ['xxl', null].includes(tv),
    },
    titleEmoji: {
      type: String,
      default: null,
    },
    titleColorClass: {
      type: String,
      default: 'hover:bg-[#F6F6F6] active:bg-[#EDEDED]',
    },
  },
  data() {
    return {
      isOpen: this.initialIsOpen,
      uuid: uuidv4(),
    }
  },
})
</script>

<style lang="postcss" scoped>
.fr-collapse {
  overflow: hidden;
  transition: all 0.3s;
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
      width: calc(var(--icon-size) + 0.5rem);
      mask-size: 50px 100%;
      @screen lg {
        width: calc(var(--icon-size) + 40px);
        mask-size: 115px 100%;
      }
    }
  }
}
</style>
