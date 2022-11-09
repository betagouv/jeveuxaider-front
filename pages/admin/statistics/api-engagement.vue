<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Plus de chiffres', to: '/admin/statistics' },
          { text: 'API Engagement' }
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
      <ApiEngagementStatistics ref="apiEngagementStatistics" />
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import ApiEngagementStatistics from '@/components/numbers/ApiEngagementStatistics.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FiltersStatistics,
    ApiEngagementStatistics,
    Breadcrumb
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
