<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/statistics' },
          { label: 'API Engagement' },
          { label: 'Trafic & candidatures' },
        ]"
      />
    </portal>

    <SectionHeading
      title="API Engagement"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <ApiEngagementStatistics ref="apiEngagementStatistics" />
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import ApiEngagementStatistics from '@/components/numbers/ApiEngagementStatistics.vue'

export default {
  components: {
    FiltersStatistics,
    ApiEngagementStatistics
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.apiEngagementStatistics.$fetch()
    }
  }
}
</script>

<style>

</style>
