<template>
  <div
    class="relative lg:grid lg:grid-cols-2"
    :class="$filters.label(domaine.id, 'domaines', 'bg')"
  >
    <div class="container col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
      <div class="lg:max-w-3xl lg:ml-auto lg:w-full">
        <div class="py-8 lg:p-8">
          <h1
            class="text-white relative mb-8 text-3xl lg:text-[56px] sm:!leading-[1.1] tracking-tighter font-bold"
          >
            <span> {{ domaine.title }}</span>
            <img
              src="/images/home/sparkle-left.svg"
              alt=""
              aria-hidden="true"
              class="hidden lg:block absolute w-[31px] h-[33px] lg:w-[61px] lg:h-[67px] top-[-9px] left-[-30px] lg:top-[-38px] lg:left-[-45px] pointer-events-none"
            />
          </h1>
          <p class="text-white text-lg lg:text-2xl lg:leading-10 mb-8">
            {{ domaine.description }}
          </p>
          <div class="hidden sm:block">
            <DsfrButton size="lg" @click="onClickFindMissions" type="tertiary">
              Trouver une mission <span class="hidden sm:inline">de bénévolat</span>
            </DsfrButton>
            <p class="text-base text-white lg:text-lg mt-4">
              <template v-if="placesLeft > 0">
                Plus de
                <span class="font-bold"
                  >{{ $numeral(placesLeft) }}
                  {{ $filters.pluralize(placesLeft, 'bénévole', 'bénévoles', false) }}</span
                >
                {{ $filters.pluralize(placesLeft, 'recherché', 'recherchés', false) }}
              </template>
            </p>
          </div>

          <!-- CTA MOBILE -->
          <div
            :class="[
              'sm:hidden fixed bottom-0 px-4 py-4 bg-white z-50 w-full left-0 right-0 text-center',
            ]"
            style="box-shadow: 0 25px 20px 30px rgb(0 0 0 / 25%)"
          >
            <DsfrButton size="lg" class="w-full" @click="onClickFindMissions">
              Trouver une mission
            </DsfrButton>
            <div v-if="placesLeft > 0" class="mt-1 text-sm font-normal text-center">
              Plus de
              <span class="font-bold"
                >{{ $numeral(placesLeft) }}
                {{ $filters.pluralize(placesLeft, 'bénévole', 'bénévoles', false) }}</span
              >
              {{ $filters.pluralize(placesLeft, 'recherché', 'recherchés', false) }}
            </div>
          </div>
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
    domaine: {
      type: Object,
      required: true,
    },
    placesLeft: {
      type: Number,
      default: 0,
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
  computed: {},
  methods: {
    onIllustrationError() {
      this.$refs.illustration.$el.srcset = '/images/organisation-default-2.webp'
    },
    onClickFindMissions() {
      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.redirectParameters,
          type:
            this.hasMissionsDistance && !this.hasMissionsPresentiel
              ? 'Mission à distance'
              : undefined,
        },
      })
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
