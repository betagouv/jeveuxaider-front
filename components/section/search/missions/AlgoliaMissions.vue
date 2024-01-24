<template>
  <div>
    <div v-if="displayMode === 'full'" class="flex flex-col gap-8">
      <template v-if="$stores.algoliaSearch.results.nbHits > 0">
        <nuxt-link
          no-prefetch
          v-for="mission in $stores.algoliaSearch.results.hits"
          :key="mission.id"
          class="flex min-w-0 transition"
          :to="
            mission.provider == 'api_engagement'
              ? `/missions-benevolat/${mission.id}`
              : `/missions-benevolat/${mission.id}/${mission.slug}`
          "
          @click.native="handleClickCard(mission)"
        >
          <CardMissionFull :mission="mission" />
        </nuxt-link>
      </template>
      <CustomEmptyState v-else>
        <template #description>
          <div class="text-gray-600">
            Il n'y a aucune mission à cette date avec les filtres actuels
          </div>
        </template>
      </CustomEmptyState>
    </div>
  </div>
</template>

<script>
import CardMissionFull from '@/components/card/CardMissionFull.vue'

export default defineNuxtComponent({
  components: {
    CardMissionFull,
  },
  props: {
    displayMode: {
      type: String,
      default: 'full',
      validator: (v) => ['full', 'teaser'].includes(v),
    },
    searchParameters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      missions: [],
    }
  },
  async setup(props) {
    const { $stores } = useNuxtApp()
    const runtimeConfig = useRuntimeConfig()
    const route = useRoute()

    $stores.algoliaSearch.reset()
    $stores.algoliaSearch.indexKey = 'missionsIndex'
    $stores.algoliaSearch.indexName = runtimeConfig.public.algolia.missionsIndex

    $stores.algoliaSearch.hitsPerPage = props.searchParameters.hitsPerPage
    $stores.algoliaSearch.initialFilters = props.searchParameters.filters

    const { search } = useAlgoliaMissionsQueryBuilder()

    await search()

    return {
      search,
    }
  },

  watch: {
    async $route(newVal, oldVal) {
      if (newVal.name !== oldVal.name) {
        return
      }
      await this.search()
    },
  },
  methods: {
    async handleClickCard(item) {
      this.$plausible.trackEvent('En ce moment - Card Missions - Liste résultat', {
        props: {
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
