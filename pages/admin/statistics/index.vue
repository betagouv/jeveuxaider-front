<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Plus de chiffres' },
          { text: 'Vue d\'ensemble' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Vue d'ensemble"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <OverviewQuickGlance ref="overviewQuickGlance" />

    <Heading as="h2" :level="2">
      L’activité sur JeVeuxAider.gouv.fr en détail
    </Heading>

    <OverviewParticipations ref="overviewParticipations" />
    <OverviewUtilisateurs ref="overviewUtilisateurs" />
    <OverviewOrganisations ref="overviewOrganisations" />
    <OverviewMissions ref="overviewMissions" />
    <OverviewPlaces ref="overviewPlaces" />
    <OverviewAPIEngagement v-if="['admin'].includes($store.getters.contextRole)" ref="overviewAPIEngagement" />
  </div>
</template>

<script>
import OverviewOrganisations from '@/components/numbers/OverviewOrganisations'
import OverviewMissions from '@/components/numbers/OverviewMissions'
import OverviewParticipations from '@/components/numbers/OverviewParticipations'
import OverviewQuickGlance from '@/components/numbers/OverviewQuickGlance'
import OverviewUtilisateurs from '@/components/numbers/OverviewUtilisateurs'
import OverviewPlaces from '@/components/numbers/OverviewPlaces'
import OverviewAPIEngagement from '@/components/numbers/OverviewAPIEngagement'
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FiltersStatistics,
    OverviewQuickGlance,
    OverviewOrganisations,
    OverviewParticipations,
    OverviewMissions,
    OverviewUtilisateurs,
    OverviewPlaces,
    OverviewAPIEngagement,
    Breadcrumb
  },
  layout: 'statistics',
  middleware: 'authenticated',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.overviewQuickGlance.$fetch()
      this.$refs.overviewParticipations.$fetch()
      this.$refs.overviewUtilisateurs.$fetch()
      this.$refs.overviewOrganisations.$fetch()
      this.$refs.overviewMissions.$fetch()
      this.$refs.overviewPlaces.$fetch()
    }
  }
}
</script>

<style>

</style>
