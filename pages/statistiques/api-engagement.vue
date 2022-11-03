<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Statistiques', link: '/statistiques' },
          { label: 'API Engagement' },
        ]"
      />
    </portal>

    <SectionHeading
      title="API Engagement"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics :filters="['daterange']" @refetch="refetch()" />
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
import FiltersStatistics from '@/components/custom/FiltersStatistics'
// import ApiEngagementStatistics from '@/components/statistics/ApiEngagementStatistics.vue'

export default {
  components: {
    FiltersStatistics
    // ApiEngagementStatistics
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
