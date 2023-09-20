<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb :links="[{ text: 'Statistiques', to: '/stats' }, { text: 'Places' }]" />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Places disponibles">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatisticsPublic :filters="['department']" @refetch="refetch()" />
        </div>
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <PlacesStatistics ref="placesStatistics" />
      <BaseHeading as="h2" :level="2"> L'offre actuelle en détail </BaseHeading>
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 lg:w-1/2">
          <PlacesByActivities ref="placesByActivities" />
          <PlacesByOrganisations ref="placesByOrganisations" />
          <PlacesByReseaux ref="placesByReseaux" />
        </div>
        <div class="space-y-12 lg:w-1/2">
          <PlacesByDomaines ref="placesByDomaines" />
          <PlacesByMissions ref="placesByMissions" />
        </div>
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
import PlacesStatistics from '@/components/statistics/PlacesStatistics'
import FiltersStatisticsPublic from '@/components/custom/FiltersStatisticsPublic'
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
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.placesByActivities.fetch()
      this.$refs.placesByDomaines.fetch()
      this.$refs.placesByReseaux.fetch()
      this.$refs.placesByMissions.fetch()
      this.$refs.placesByOrganisations.fetch()
      this.$refs.placesStatistics.fetch()
    },
  },
})
</script>

<style></style>
