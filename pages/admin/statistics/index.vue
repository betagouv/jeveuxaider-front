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
            { text: 'Plus de chiffres' },
            { text: 'Vue d’ensemble' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      title="Vue d’ensemble"
      secondaryTitleBottom="L’activité sur JeVeuxAider.gouv.fr en détail"
    >
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <!-- <OverviewQuickGlance ref="overviewQuickGlance" /> -->

    <!-- <BaseHeading as="h2" :level="2"> L’activité sur JeVeuxAider.gouv.fr en détail </BaseHeading> -->
    <OverviewPlaces ref="overviewPlaces" />
    <OverviewParticipations ref="overviewParticipations" />
    <OverviewUtilisateurs
      v-if="['admin'].includes($stores.auth.contextRole)"
      ref="overviewUtilisateurs"
    />
    <OverviewMissions ref="overviewMissions" />

    <OverviewOrganisations
      ref="overviewOrganisations"
      v-if="['admin', 'referent', 'tete_de_reseau'].includes($stores.auth.contextRole)"
    />
    <!-- <OverviewAPIEngagement v-if="['admin'].includes($stores.auth.contextRole)" ref="overviewAPIEngagement" /> -->
  </div>
</template>

<script>
import OverviewOrganisations from '@/components/numbers/OverviewOrganisations.vue'
import OverviewMissions from '@/components/numbers/OverviewMissions.vue'
import OverviewParticipations from '@/components/numbers/OverviewParticipations.vue'
import OverviewQuickGlance from '@/components/numbers/OverviewQuickGlance.vue'
import OverviewUtilisateurs from '@/components/numbers/OverviewUtilisateurs.vue'
import OverviewPlaces from '@/components/numbers/OverviewPlaces.vue'
// import OverviewAPIEngagement from '@/components/numbers/OverviewAPIEngagement.vue'
// import FiltersStatistics from '@/components/custom/FiltersStatistics.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    // FiltersStatistics,
    OverviewQuickGlance,
    OverviewOrganisations,
    OverviewParticipations,
    OverviewMissions,
    OverviewUtilisateurs,
    OverviewPlaces,
    // OverviewAPIEngagement,
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
        return ['department']
      }
      if (this.$stores.auth.contextRole === 'referent') {
        return []
      }
      if (this.$stores.auth.contextRole === 'tete_de_reseau') {
        return ['department']
      }
      if (this.$stores.auth.contextRole === 'responsable') {
        return []
      }

      return []
    },
  },
  methods: {
    refetch() {
      if (this.$refs.overviewQuickGlance) this.$refs.overviewQuickGlance.fetch()
      if (this.$refs.overviewParticipations) this.$refs.overviewParticipations.fetch()
      if (this.$refs.overviewUtilisateurs) this.$refs.overviewUtilisateurs.fetch()
      if (this.$refs.overviewOrganisations) this.$refs.overviewOrganisations.fetch()
      if (this.$refs.overviewMissions) this.$refs.overviewMissions.fetch()
      if (this.$refs.overviewPlaces) this.$refs.overviewPlaces.fetch()
    },
  },
})
</script>

<style></style>
