<template>
  <div class="relative bg-white lg:grid lg:grid-cols-2">
    <div class="col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
      <div class="px-4 lg:px-0 lg:max-w-3xl lg:ml-auto lg:w-full">
        <div class="py-8 lg:p-8">
          <h1 class="mb-8 text-3xl lg:text-[56px] sm:!leading-[1.1] tracking-tighter font-bold">
            <span class="relative">
              <span class="font-semibold">{{ suffixTitle }}</span>
              <img
                src="/images/home/sparkle-right.svg"
                alt=""
                aria-hidden="true"
                class="hidden lg:block absolute w-[31px] h-[33px] lg:w-[61px] lg:h-[67px] top-[-9px] right-[-30px] lg:top-[-14px] lg:right-[-47px] pointer-events-none"
              /> </span
            ><br />
            <span>{{ organisation.name }}</span>
          </h1>
          <p class="text-lg lg:text-2xl lg:leading-10 mb-8">
            Rejoignez le mouvement <span class="font-bold">{{ organisation.name }}</span>
            <template v-if="organisation.missions_available_count >= 1">
              <span v-if="organisation.missions_available_count === 1">
                et sa mission de bénévolat réalisable</span
              >
              <span v-else>
                et ses {{ $numeral(organisation.missions_available_count) }} missions de bénévolat
                réalisables</span
              >
            </template>
            <template v-else>. </template>
            <template v-if="hasMissionsDistanceAndPresentiel">
              <span>
                en <span class="font-bold">présentiel</span> ou en
                <span class="font-bold">télébénévolat</span></span
              >.
            </template>
            <template v-else>
              <template v-if="hasMissionsDistance">
                <span> en <span class="font-bold">télébénévolat</span>. </span>
              </template>
              <template v-if="hasMissionsPresentiel">
                <span> en <span class="font-bold">présentiel</span>. </span>
              </template>
            </template>
          </p>
          <DsfrButton size="lg" @click="onClickFindMissions">
            Trouver une mission <span class="hidden sm:inline">de bénévolat</span>
          </DsfrButton>
          <p class="text-base lg:text-lg mt-4">
            <template v-if="organisation.places_left > 0">
              Plus de
              <span class="font-bold"
                >{{ $numeral(organisation.places_left) }}
                {{
                  $filters.pluralize(organisation.places_left, 'bénévole', 'bénévoles', false)
                }}</span
              >
              {{ $filters.pluralize(organisation.places_left, 'recherché', 'recherchés', false) }}
            </template>
          </p>
        </div>
      </div>
    </div>
    <div class="hidden lg:block">
      <NuxtImg
        ref="illustration"
        src="/images/organisation-default-2.webp"
        :srcset="srcSet"
        class="min-h-[700px] w-auto object-cover"
        @error="onIllustrationError"
      />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    suffixTitle: {
      type: String,
      default: 'Découvrez l’association',
    },
    organisation: {
      type: Object,
      required: true,
    },
    srcSet: {
      type: String,
      required: true,
    },
    redirectParameters: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasMissionsDistanceAndPresentiel() {
      return (
        this.organisation.statistics.missions_available_distance_count > 0 &&
        this.organisation.statistics.missions_available_presentiel_count > 0
      )
    },
    hasMissionsDistance() {
      return this.organisation.statistics.missions_available_distance_count
    },
    hasMissionsPresentiel() {
      return this.organisation.statistics.missions_available_presentiel_count
    },
  },
  methods: {
    onIllustrationError() {
      this.$refs.illustration.$el.srcset = '/images/organisation-default-2.webp'
    },
    onClickFindMissions() {
      if (this.organisation.missions_available_count > 1) {
        this.$router.push({
          path: '/missions-benevolat',
          query: {
            ...this.redirectParameters,
          },
        })
      } else {
        this.$router.push({
          path: '/missions-benevolat',
        })
      }
    },
  },
})
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
