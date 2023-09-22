<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb :links="[{ text: 'Statistiques', to: '/stats' }, { text: 'API Engagement' }]" />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="API Engagement">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatisticsPublic :filters="['daterange']" @refetch="refetch()" />
        </div>
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <BaseBox>Statistiques à venir...</BaseBox>
      <!-- <ApiEngagementStatistics ref="apiEngagementStatistics" /> -->
    </div>
  </div>
</template>

<script>
import FiltersStatisticsPublic from '@/components/custom/FiltersStatisticsPublic.vue'
// import ApiEngagementStatistics from '@/components/statistics/ApiEngagementStatistics.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatisticsPublic,
    // ApiEngagementStatistics
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-public',
    })
  },
  data() {
    return {}
  },
  methods: {
    refetch() {
      // this.$refs.apiEngagementStatistics.$fetch()
    },
  },
})
</script>

<style></style>
