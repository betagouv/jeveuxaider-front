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
    <OverviewBenevoles ref="overviewBenevoles" />
    <OverviewOrganisations ref="overviewOrganisations" />
  </div>
</template>

<script>
import OverviewOrganisations from '@/components/numbers/OverviewOrganisations'
import OverviewMissions from '@/components/numbers/OverviewMissions'
import OverviewQuickGlance from '@/components/numbers/OverviewQuickGlance'
import OverviewBenevoles from '@/components/numbers/OverviewBenevoles'
import FiltersStatistics from '@/components/custom/FiltersStatistics'

export default {
  components: {
    FiltersStatistics,
    OverviewQuickGlance,
    OverviewOrganisations,
    OverviewMissions,
    OverviewBenevoles
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.overviewQuickGlance.$fetch()
      this.$refs.overviewBenevoles.$fetch()
      this.$refs.overviewMissions.$fetch()
      this.$refs.overviewOrganisations.$fetch()
    }
  }
}
</script>

<style>

</style>
