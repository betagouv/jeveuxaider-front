<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb :links="[{ text: 'Statistiques', to: '/stats' }, { text: 'Places' }]" />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Places disponibles">
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <PlacesStatistics ref="placesStatistics" />
      <BaseHeading as="h2" :level="2"> L'offre actuelle en détail </BaseHeading>
      <div class="flex flex-col gap-12">
        <PlacesByActivities ref="placesByActivities" />
        <PlacesByOrganisations ref="placesByOrganisations" />
        <PlacesByReseaux ref="placesByReseaux" />
        <PlacesByDomaines ref="placesByDomaines" />
        <PlacesByMissions ref="placesByMissions" />
      </div>
    </div>
  </div>
</template>

<script>
import PlacesByReseaux from '@/components/statistics/PlacesByReseaux.vue'
import PlacesByOrganisations from '@/components/statistics/PlacesByOrganisations.vue'
import PlacesByMissions from '@/components/statistics/PlacesByMissions.vue'
import PlacesByDomaines from '@/components/statistics/PlacesByDomaines.vue'
import PlacesByActivities from '@/components/statistics/PlacesByActivities.vue'
import PlacesStatistics from '@/components/statistics/PlacesStatistics.vue'
import FiltersStatisticsPublic from '@/components/custom/FiltersStatisticsPublic.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatisticsPublic,
    PlacesByReseaux,
    PlacesByOrganisations,
    PlacesByMissions,
    PlacesByDomaines,
    PlacesByActivities,
    PlacesStatistics,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-public',
    })
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        this.refetch()
      },
    },
  },
  computed: {
    filters() {
      return ['department']
    },
  },
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.placesByActivities?.fetch()
      this.$refs.placesByDomaines?.fetch()
      this.$refs.placesByReseaux?.fetch()
      this.$refs.placesByMissions?.fetch()
      this.$refs.placesByOrganisations?.fetch()
      this.$refs.placesStatistics?.fetch()
    },
  },
})
</script>

<style></style>
