<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'API Engagement' },
          { label: 'Missions' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Missions"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <ApiEngagementMissionsStatistics ref="missionsStatistics" />
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import ApiEngagementMissionsStatistics from '@/components/numbers/ApiEngagementMissionsStatistics.vue'

export default {
  components: {
    FiltersStatistics,
    ApiEngagementMissionsStatistics
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.missionsStatistics.$fetch()
    }
  }
}
</script>

<style>

</style>
