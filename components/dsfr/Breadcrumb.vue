<template>
  <nav role="navigation" :class="['fr-breadcrumb', theme]" aria-label="vous êtes ici :">
    <button
      v-show="!hideButton"
      :class="['fr-breadcrumb__button', colorClass]"
      :aria-expanded="hideButton"
      :aria-controls="`breadcrumb-${uuid}`"
      @click="hideButton = !hideButton"
    >
      Voir le fil d’Ariane
    </button>

    <div
      :id="`breadcrumb-${uuid}`"
      class="fr-collapse"
      :class="{ 'fr-collapse--expanded': hideButton }"
    >
      <ol class="fr-breadcrumb__list">
        <li class="relative bottom-[5px]">
          <nuxt-link no-prefetch to="/" :class="['!bg-none', colorClass]" title="accueil">
            <RiHome4Line class="w-[13px] h-[13px] inline fill-current" />
          </nuxt-link>
        </li>

        <li v-for="(link, index) in links" :key="index" class="fr-breadcrumb__item">
          <component
            :is="asComponent(link)"
            :class="[
              'fr-breadcrumb__link',
              theme === 'white' ? 'text-white' : !link.to ? '!text-[#161616]' : colorClass,
            ]"
            :to="link.to"
            :aria-current="index === links.length - 1 ? 'page' : undefined"
            no-prefetch
          >
            {{ $filters.clamp(link.text, 120) }}
          </component>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script>
import '@gouvfr/dsfr/dist/component/breadcrumb/breadcrumb.main.min.css'
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  props: {
    links: {
      type: Array,
      default: () => [{ text: '' }],
    },
    theme: {
      type: String,
      default: 'default',
      validator: (t) => ['default', 'white'].includes(t),
    },
  },
  data() {
    return {
      hideButton: false,
      uuid: uuidv4(),
    }
  },
  computed: {
    colorClass() {
      return this.theme === 'white' ? 'text-white' : 'text-[#666666] hover:text-gray-700'
    },
  },
  methods: {
    asComponent(link) {
      return link.is ? link.is : link.to ? resolveComponent('NuxtLink') : 'span'
    },
  },
})
</script>

<style lang="postcss" scoped>
[href],
button {
  text-rendering: optimizeLegibility;
  background-image: linear-gradient(0deg, currentColor, currentColor),
    linear-gradient(0deg, currentColor, currentColor);
  background-position: 0 100%, 0 calc(100% - 0.0625em);
  background-repeat: no-repeat, no-repeat;
  background-size: 0 0.125em, 100% 0.0625em;
}

a[href]:hover {
  background-size: 100% 0.125em, 100% 0.0625em;
}

a[href]:active {
  background-color: #ededed;
}

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

.fr-breadcrumb {
  padding: 2rem 0 2.5rem;
  margin: 0;
  @screen md {
    padding: 3rem 0 2.5rem;
  }
}

@media (min-width: 48em) {
  .fr-breadcrumb .fr-collapse {
    margin-left: 0;
    margin-right: 0;
    max-height: none;
    overflow: visible;
    padding-left: 0;
    padding-right: 0;
    transform: none;
    visibility: inherit;
  }
}

.fr-breadcrumb__list li:not(:first-child)::before {
  position: relative;
  top: 1px;
}

.fr-breadcrumb__link {
  display: inline;
}

.fr-breadcrumb.white {
  * {
    color: white;
  }
}
</style>
