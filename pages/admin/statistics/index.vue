<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres' },
          { label: 'Vue d\'ensemble' },
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

    <OverviewMissions ref="overviewMissions" />
    <OverviewUtilisateurs ref="overviewUtilisateurs" />
    <OverviewOrganisations ref="overviewOrganisations" />
  </div>
</template>

<script>
import OverviewOrganisations from '@/components/numbers/OverviewOrganisations'
import OverviewMissions from '@/components/numbers/OverviewMissions'
import OverviewQuickGlance from '@/components/numbers/OverviewQuickGlance'
import OverviewUtilisateurs from '@/components/numbers/OverviewUtilisateurs'
import FiltersStatistics from '@/components/custom/FiltersStatistics'

export default {
  components: {
    FiltersStatistics,
    OverviewQuickGlance,
    OverviewOrganisations,
    OverviewMissions,
    OverviewUtilisateurs
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.overviewQuickGlance.$fetch()
      this.$refs.overviewUtilisateurs.$fetch()
      this.$refs.overviewMissions.$fetch()
      this.$refs.overviewOrganisations.$fetch()
    }
  }
}
</script>

<style>

</style>
