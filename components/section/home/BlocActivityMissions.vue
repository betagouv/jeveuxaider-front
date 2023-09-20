<template>
  <div>
    <div class="py-6 xl:py-12 overflow-hidden">
      <div class="container">
        <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
          <div>
            <DsfrHeading as="h3" size="alt-sm" class="tracking-[-.5px]">
              <span aria-hidden="true">{{ activity.icon }} </span>
              <span>{{ activity.name }}</span>
            </DsfrHeading>
          </div>
          <div class="hidden lg:block">
            <div class="flex space-x-2">
              <div :id="`slideshowActivityMission_${activity.key}_arrows`" />

              <DsfrButton
                class="flex-none text-jva-blue-500 border-jva-blue-500 hover:bg-[#EFECE8]"
                type="transparent"
                @click="onViewMoreClick(activity)"
              >
                Plus de missions
              </DsfrButton>
            </div>
          </div>
        </div>
        <div class="mt-12">
          <AlgoliaSlideshowMissions
            :navigation-id="`slideshowActivityMission_${activity.key}_arrows`"
            navigation-button-class="hover:bg-[#EFECE8]"
            :search-parameters="{
              hitsPerPage: 6,
              aroundPrecision: 2000,
              aroundLatLngViaIP: true,
              aroundRadius: 'all',
              facetFilters: [`activities.name:${activity.name}`],
            }"
            @slide-click="onSlideClick(activity)"
          />
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
    activity: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      missions: [],
    }
  },
  methods: {
    onViewMoreClick(activity) {
      this.$plausible.trackEvent('Homepage - CTA - Plus de missions - Activité', {
        props: {
          activity: activity.name,
          isLogged: this.$stores.auth.isLogged,
        },
      })
      this.$router.push(
        `/missions-benevolat?activities.name=${encodeURIComponent(this.activity.name)}`
      )
    },
    onSlideClick(activity) {
      this.$plausible.trackEvent('Homepage - Clique - Mission - Activité', {
        props: {
          activity: activity.name,
          isLogged: this.$stores.auth.isLogged,
        },
      })
    },
  },
})
</script>
