<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            {
              text: 'Administration',
              to: ['admin'].includes($stores.auth.contextRole) ? '/admin' : null,
            },
            { text: 'Plus de chiffres', to: '/admin/statistics' },
            { text: 'Places' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Places disponibles">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics :filters="['department']" @refetch="refetch()" />
        </div>
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <PlacesStatistics ref="placesStatistics" />
      <BaseHeading as="h2" :level="2"> L'offre actuelle en détail </BaseHeading>
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
import PlacesStatistics from '@/components/numbers/PlacesStatistics.vue'
import FiltersStatistics from '@/components/custom/FiltersStatistics.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatistics,
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
      layout: 'statistics-admin',
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (!['admin', 'referent'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
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
