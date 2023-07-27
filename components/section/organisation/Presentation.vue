<template>
  <div class="relative bg-white lg:grid lg:grid-cols-2">
    <div class="col-span-2 lg:col-span-1">
      <div class="max-w-3xl lg:ml-auto">
        <div class="px-4 pb-8 md:p-8 lg:pt-6 xl:p-16 xl:pt-8">
          <h1
            class="mt-2 text-3xl sm:text-5xl sm:!leading-[1.1] tracking-tighter text-gray-900 font-bold"
          >
            <p>Découvrez l’association</p>
            <span>{{ organisation.name }}</span>
          </h1>
          <p class="text-2xl">
            Rejoignez le mouvement <span class="font-bold">{{ organisation.name }}</span> et ses XX missions de bénévolat réalisables en <span class="font-bold">présentiel</span> ou en <span class="font-bold">télébénévolat</span>.
          </p>
          <nuxt-link :to="`/missions-benevolat?structure.name=${organisation.name}`">
            <Button size="lg">
              Trouvez une mission de bénévolat
            </Button>
          </nuxt-link>
          <p class="text-lg">
            Plus de <span class="font-bold">XXX bénévoles</span> recherchés
          </p>
        </div>
      </div>
    </div>
    <div>
      <img
        :srcset="srcSet"
        class="lg:absolute object-cover w-full lg:w-1/2 h-full max-h-[400px] lg:max-h-full"
        @error="onIllustrationError"
      >
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    organisation: {
      type: Object,
      required: true
    },
    srcSet: {
      type: String,
      required: true
    }
  },
  methods: {
    onIllustrationError ($event) {
      $event.target.srcset = '/images/organisation-default-2.webp'
    }
  }
}
</script>

<style lang="postcss" scoped>
.footer--button {
  font-size: 10px;
  @apply font-bold uppercase py-6 outline-none transition-colors ease-in-out duration-200;
  &:focus-visible,
  &:hover {
    @apply bg-gray-100;
  }
  @screen sm {
    @apply text-sm;
  }
}
</style>
