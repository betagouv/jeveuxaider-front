<template>
  <div class="py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div class="">
          <DsfrHeading as="h3" size="alt-sm" class="mb-6 md:mb-2">
            {{ title }}
          </DsfrHeading>
        </div>
        <div class="hidden lg:block flex-none">
          <div class="flex space-x-2">
            <ClientOnly>
              <div :id="`slideshowMissionsArrows-${uuid}`" />
            </ClientOnly>
            <DsfrButton
              class="flex-none text-jva-blue-500 border-jva-blue-500 hover:bg-[#F6F6F6]"
              type="transparent"
              @click="onViewMoreClick()"
            >
              Plus de missions
            </DsfrButton>
          </div>
        </div>
      </div>
      <div class="mt-12 xl:mt-20">
        <AlgoliaSlideshowMissions
          :navigation-id="`slideshowMissionsArrows-${uuid}`"
          navigation-button-class="hover:bg-[#F6F6F6]"
          aria-labelledby="label-slideshow-organisation-missions"
          :search-parameters="searchParameters"
          @slide-click="onSlideClick"
        />
      </div>

      <div class="lg:hidden mt-6 text-center">
        <DsfrButton type="tertiary" @click="onViewMoreClick()"> Plus de missions </DsfrButton>
      </div>
      <div
        v-if="showDisponibilities"
        class="mt-8 flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-6"
      >
        <p class="font-bold text-xl xl:text-2xl">Quelles sont vos disponibilités ?</p>
        <div class="flex flex-wrap gap-4">
          <DsfrTag
            v-for="(diponibility, i) in disponibilities"
            :key="i"
            size="md"
            context="clickable"
            @click.native="onDisponibilityClick(diponibility)"
          >
            {{ diponibility.label }}
          </DsfrTag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlgoliaSlideshowMissions from '@/components/section/search/missions/AlgoliaSlideshowMissions.vue'

export default defineNuxtComponent({
  components: {
    AlgoliaSlideshowMissions,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    searchParameters: {
      type: Object,
      required: true,
    },
    redirectParameters: {
      type: Object,
      required: true,
    },
    plausibleParameters: {
      type: Object,
      default: () => {},
    },
    showDisponibilities: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      uuid: useId(),
    }
  },
  data() {
    return {
      disponibilities: [
        {
          label: 'Quelques heures',
          parameters: {
            commitment: 'few_hours',
          },
        },
        {
          label: 'Quelques jours',
          parameters: {
            commitment: 'few_days',
          },
        },
        {
          label: 'De manière récurrente',
          parameters: {
            commitment: 'few_hours_a_week|few_hours_a_month|few_days_a_week|few_days_a_month',
          },
        },
      ],
    }
  },
  methods: {
    onViewMoreClick() {
      this.$plausible.trackEvent('Association - CTA - Plus de missions', {
        props: {
          ...this.plausibleParameters,
        },
      })
      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.redirectParameters,
        },
      })
    },
    onSlideClick() {
      this.$plausible.trackEvent('Association - Clique - Missions', {
        props: {
          ...this.plausibleParameters,
        },
      })
    },
    onDisponibilityClick(diponibility) {
      this.$plausible.trackEvent('Association - CTA - Disponibilités - Missions', {
        props: {
          ...this.plausibleParameters,
          commitment__total: diponibility.parameters.commitment__total,
        },
      })
      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.redirectParameters,
          ...diponibility.parameters,
        },
      })
    },
  },
})
</script>
