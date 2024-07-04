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
            { text: 'Vue d\'ensemble' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      title="Vue d'ensemble"
      secondaryTitleBottom="L’activité sur JeVeuxAider.gouv.fr en détail"
    >
    </BaseSectionHeading>

    <!-- <OverviewQuickGlance ref="overviewQuickGlance" /> -->

    <!-- <BaseHeading as="h2" :level="2"> L’activité sur JeVeuxAider.gouv.fr en détail </BaseHeading> -->

    <OverviewParticipations ref="overviewParticipations" />
    <OverviewUtilisateurs
      v-if="['admin'].includes($stores.auth.contextRole)"
      ref="overviewUtilisateurs"
    />
    <OverviewOrganisations
      ref="overviewOrganisations"
      v-if="['admin', 'referent', 'tete_de_reseau'].includes($stores.auth.contextRole)"
    />
    <OverviewMissions ref="overviewMissions" />
    <OverviewPlaces ref="overviewPlaces" />
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
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.overviewQuickGlance.fetch()
      this.$refs.overviewParticipations.fetch()
      this.$refs.overviewUtilisateurs.fetch()
      this.$refs.overviewOrganisations.fetch()
      this.$refs.overviewMissions.fetch()
      this.$refs.overviewPlaces.fetch()
    },
  },
})
</script>

<style></style>
