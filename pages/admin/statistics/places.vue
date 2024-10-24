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
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <PlacesStatistics ref="placesStatistics" />
      <div class="flex flex-col gap-12">
        <BaseHeading as="h2" :level="2" class="mt-8"> L'offre actuelle en détail </BaseHeading>

        <PlacesByActivities
          ref="placesByActivities"
          v-if="
            ['admin', 'referent', 'tete_de_reseau', 'responsable'].includes(
              $stores.auth.contextRole
            )
          "
        />
        <PlacesByOrganisations
          ref="placesByOrganisations"
          v-if="['admin', 'referent', 'tete_de_reseau'].includes($stores.auth.contextRole)"
        />
        <PlacesByReseaux
          ref="placesByReseaux"
          v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
        />
        <PlacesByDomaines
          ref="placesByDomaines"
          v-if="
            ['admin', 'referent', 'tete_de_reseau', 'responsable'].includes(
              $stores.auth.contextRole
            )
          "
        />
        <PlacesByMissions
          ref="placesByMissions"
          v-if="
            ['admin', 'referent', 'tete_de_reseau', 'responsable'].includes(
              $stores.auth.contextRole
            )
          "
        />
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
// import FiltersStatistics from '@/components/custom/FiltersStatistics.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    // FiltersStatistics,
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

    if (
      !['admin', 'referent', 'tete_de_reseau', 'responsable'].includes($stores.auth.contextRole)
    ) {
      return showError({ statusCode: 403 })
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        this.refetch()
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    filters() {
      if (this.$stores.auth.contextRole === 'admin') {
        return ['department', 'reseau', 'structure']
      }
      if (this.$stores.auth.contextRole === 'referent') {
        return []
      }
      if (this.$stores.auth.contextRole === 'tete_de_reseau') {
        return ['department']
      }
      if (this.$stores.auth.contextRole === 'responsable') {
        return ['department']
      }

      return []
    },
  },
  methods: {
    refetch() {
      if (this.$refs.placesByActivities) {
        this.$refs.placesByActivities.fetch()
      }
      if (this.$refs.placesByDomaines) {
        this.$refs.placesByDomaines.fetch()
      }
      if (this.$refs.placesByReseaux) {
        this.$refs.placesByReseaux.fetch()
      }
      if (this.$refs.placesByMissions) {
        this.$refs.placesByMissions.fetch()
      }
      if (this.$refs.placesByOrganisations) {
        this.$refs.placesByOrganisations.fetch()
      }
      if (this.$refs.placesStatistics) {
        this.$refs.placesStatistics.fetch()
      }
    },
  },
})
</script>

<style></style>
