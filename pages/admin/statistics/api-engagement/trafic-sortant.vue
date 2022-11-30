<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Plus de chiffres', to: '/admin/statistics' },
          { text: 'API Engagement' },
          { text: 'Trafic sortant' }
        ]"
      />
    </portal>

    <SectionHeading
      title="Trafic sortant"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics :filters="['daterange']" @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <OverviewApiEngagementSortant ref="apiEngagementStatisticSortant" />
      <OverviewApiEngagementSortantDetails ref="apiEngagementStatisticsSortantDetails" />
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import OverviewApiEngagementSortant from '@/components/numbers/OverviewApiEngagementSortant.vue'
import OverviewApiEngagementSortantDetails from '@/components/numbers/OverviewApiEngagementSortantDetails.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FiltersStatistics,
    OverviewApiEngagementSortant,
    OverviewApiEngagementSortantDetails,
    Breadcrumb
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.apiEngagementStatisticSortant.$fetch()
      this.$refs.apiEngagementStatisticsSortantDetails.$fetch()
    }
  }
}
</script>
