<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Statistiques', to: '/stats' },
          { text: 'API Engagement' },
        ]"
      />
    </portal>

    <SectionHeading
      title="API Engagement"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatisticsPublic :filters="['daterange']" @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <Box>Statistiques à venir...</Box>
      <!-- <ApiEngagementStatistics ref="apiEngagementStatistics" /> -->
    </div>
  </div>
</template>

<script>
import FiltersStatisticsPublic from '@/components/custom/FiltersStatisticsPublic'
// import ApiEngagementStatistics from '@/components/statistics/ApiEngagementStatistics.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FiltersStatisticsPublic,
    // ApiEngagementStatistics
    Breadcrumb
  },
  layout: 'statistics-public',
  data () {
    return {}
  },
  methods: {
    refetch () {
      // this.$refs.apiEngagementStatistics.$fetch()
    }
  }
}
</script>

<style>

</style>
