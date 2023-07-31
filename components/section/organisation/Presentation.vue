<template>
  <div class="relative bg-white lg:grid lg:grid-cols-2">
    <div class="col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
      <div class="px-4 lg:px-0 lg:max-w-3xl lg:ml-auto">
        <div class="py-8 lg:p-8">
          <h1
            class="mb-8 text-3xl lg:text-[56px] sm:!leading-[1.1] tracking-tighter font-bold"
          >
            <span class="relative">
              <span>Découvrez l’association</span>
              <img
                src="/images/home/sparkle-right.svg"
                alt=""
                aria-hidden="true"
                class="hidden lg:block absolute w-[31px] h-[33px] lg:w-[61px] lg:h-[67px] top-[-9px] right-[-30px] lg:top-[-14px] lg:right-[-47px] pointer-events-none"
              >
            </span><br>
            <span>{{ organisation.name }}</span>
          </h1>
          <p class="text-lg lg:text-2xl lg:leading-10 mb-8">
            Rejoignez le mouvement <span class="font-bold">{{ organisation.name }}</span>
            <template v-if="organisation.missions_available_count > 1">
              <span> et ses {{ organisation.missions_available_count|formatNumber }} missions de bénévolat réalisables</span>
            </template>
            <template v-else>
              et ses missions
            </template>
            <template v-if="hasMissionsDistanceAndPresentiel">
              <span> en <span class="font-bold">présentiel</span> ou en <span class="font-bold">télébénévolat</span></span>.
            </template>
            <template v-else>
              <template v-if="hasMissionsDistance">
                <span> en <span class="font-bold">télébénévolat</span>.
                </span>
              </template>
              <template v-if="hasMissionsPresentiel">
                <span> en <span class="font-bold">présentiel</span>.
                </span>
              </template>
            </template>
          </p>
          <nuxt-link :to="`/missions-benevolat?structure.name=${organisation.name}`">
            <Button size="lg">
              Trouvez une mission <span class="hidden sm:inline">de bénévolat</span>
            </Button>
          </nuxt-link>
          <p class="text-base lg:text-lg mt-4">
            <template v-if="organisation.places_left > 0">
              Plus de <span class="font-bold">{{ organisation.places_left|formatNumber }} {{ organisation.places_left|pluralize('bénévole','bénévoles', false) }}</span> {{ organisation.places_left|pluralize('recherché', 'recherchés', false) }}
            </template>
            <temoignage v-else>
              Plus de place disponible
            </temoignage>
          </p>
        </div>
      </div>
    </div>
    <div class="hidden lg:block">
      <img
        :srcset="srcSet"
        class="min-h-[700px] w-auto object-cover"
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
  computed: {
    hasMissionsDistanceAndPresentiel () {
      return this.organisation.statistics.missions_available_distance_count > 0 && this.organisation.statistics.missions_available_presentiel_count > 0
    },
    hasMissionsDistance () {
      return this.organisation.statistics.missions_available_distance_count
    },
    hasMissionsPresentiel () {
      return this.organisation.statistics.missions_available_presentiel_count
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
