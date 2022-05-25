<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'Places' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Places disponibles"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics no-period @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <OverviewPlaces ref="overviewPlaces" />
      <Heading as="h2" :level="2">
        L'offre actuel en détail
      </Heading>
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 w-1/2">
          <PlacesByActivities ref="placesByActivities" />
          <PlacesByOrganisations ref="placesByOrganisations" />
          <PlacesByReseaux ref="placesByReseaux" />
        </div>
        <div class="space-y-12 w-1/2">
          <PlacesByDomaines ref="placesByDomaines" />
          <PlacesByMissions ref="placesByMissions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlacesByReseaux from '@/components/numbers/PlacesByReseaux.vue'
import PlacesByOrganisations from '@/components/numbers/PlacesByOrganisations.vue'
import PlacesByMissions from '@/components/numbers/PlacesByMissions.vue'
import PlacesByDomaines from '@/components/numbers/PlacesByDomaines.vue'
import PlacesByActivities from '@/components/numbers/PlacesByActivities.vue'
import OverviewPlaces from '@/components/numbers/OverviewPlaces'
import FiltersStatistics from '@/components/custom/FiltersStatistics'

export default {
  components: {
    FiltersStatistics,
    PlacesByReseaux,
    PlacesByOrganisations,
    PlacesByMissions,
    PlacesByDomaines,
    PlacesByActivities,
    OverviewPlaces
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.placesByActivities.$fetch()
      this.$refs.placesByDomaines.$fetch()
      this.$refs.placesByReseaux.$fetch()
      this.$refs.placesByMissions.$fetch()
      this.$refs.placesByOrganisations.$fetch()
      this.$refs.overviewPlaces.$fetch()
    }
  }
}
</script>

<style>

</style>
