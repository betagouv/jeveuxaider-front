<template>
  <div>
    <div v-if="displayMode === 'full'" class="flex flex-col gap-8">
      <template v-if="missions.length > 0">
        <nuxt-link
          no-prefetch
          v-for="mission in missions"
          :key="mission.id"
          class="flex min-w-0 transition"
          :to="
            mission.provider == 'api_engagement'
              ? `/missions-benevolat/${mission.id}?origin=${origin}`
              : `/missions-benevolat/${mission.id}/${mission.slug}?origin=${origin}`
          "
          @click.native="handleClickCard(mission)"
        >
          <CardMission class="lg:hidden flex" :mission="mission" />
          <CardMissionFull class="hidden lg:flex" :mission="mission" />
        </nuxt-link>
        <div class="flex justify-center mt-6">
          <DsfrButton
            v-if="hasMoreResults"
            type="transparent"
            class="flex-none text-jva-blue-500 border-jva-blue-500 hover:bg-[#EFECE8]"
            @click="onViewMoreClick()"
          >
            Plus de missions
          </DsfrButton>
        </div>
      </template>
      <CustomEmptyState v-else>
        <template #description>
          <div class="text-gray-600 text-center">
            Il n'y a aucune mission à cette date avec les filtres actuels
          </div>
        </template>
      </CustomEmptyState>
    </div>
  </div>
</template>

<script>
import CardMission from '@/components/card/CardMission.vue'
import CardMissionFull from '@/components/card/CardMissionFull.vue'

export default defineNuxtComponent({
  components: {
    CardMission,
    CardMissionFull,
  },
  props: {
    indexKey: {
      type: String,
      default: 'missionsIndex',
    },
    displayMode: {
      type: String,
      default: 'full',
      validator: (v) => ['full', 'teaser'].includes(v),
    },
    searchParameters: {
      type: Object,
      required: true,
    },
    redirectParameters: {
      type: Object,
      default: () => {},
    },
    origin: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const { $algolia } = useNuxtApp()
    const response = await $algolia[props.indexKey].search('', props.searchParameters)
    return {
      missions: toRef(response.hits),
      nbHits: toRef(response.nbHits),
    }
  },
  watch: {
    searchParameters: {
      async handler(newVal) {
        const response = await this.$algolia[this.indexKey].search('', newVal)
        this.missions = response.hits
        this.nbHits = response.nbHits
        this.$emit('update')
      },
    },
  },
  computed: {
    hasMoreResults() {
      return this.nbHits > this.missions.length
    },
  },
  methods: {
    onViewMoreClick() {
      this.$plausible.trackEvent('En ce moment - Plus de missions', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          ...this.redirectParameters,
        },
      })
      this.$router.push({
        path: 'missions-benevolat',
        query: {
          ...this.redirectParameters,
          ...this.$route.query,
          start: this.$route.query.start ?? this.$dayjs().format('YYYY-MM-DD'),
          end: this.$route.query.end ?? this.$dayjs().format('YYYY-MM-DD'),
          page: undefined,
        },
      })
    },
    async handleClickCard(item) {
      this.$plausible.trackEvent('En ce moment - Card Missions - Liste résultat', {
        props: {
          ...this.redirectParameters,
          isLogged: this.$stores.auth.isLogged,
          isFromApi: item.provider === 'api_engagement',
          isRegistrationOpen: item.is_registration_open,
          hasPlacesLeft: item.has_places_left,
          isOutdated: item.is_outdated,
        },
      })
      await this.$gtm?.trackEvent({ event: 'calendrier-benevole-clic-carte-mission' })
    },
  },
})
</script>
