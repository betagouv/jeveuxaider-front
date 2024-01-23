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
    return {}
  },
  async setup(props, { emit }) {
    const { $algolia } = useNuxtApp()
    const response = await $algolia.missionsIndex.search('', props.searchParameters)
    emit('results', response)
    return {
      missions: response.hits,
    }
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
  watch: {},
})
</script>
