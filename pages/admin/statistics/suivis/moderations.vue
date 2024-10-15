<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            {
              text: 'Administration',
              to: ['admin'].includes($stores.auth.contextRole) ? '/admin' : null,
            },
            { text: 'Plus de chiffres', to: '/admin/statistics' },
            { text: 'Modérations' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      title="Modérations"
      secondary-title-bottom="Changements de statut des missions et organisations"
    >
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <ActivityLogsModerationsStatistics ref="activityLogsModerationsStatistics" />
      <ActivityLogsAdminsVsReferentsCumul ref="activityLogsAdminsVsReferentsCumul" />
      <ActivityLogsAdminsVsReferents ref="activityLogsAdminsVsReferents" />
    </div>
  </div>
</template>

<script>
import FiltersStatisticsButton from '@/components/custom/FiltersStatisticsButton.vue'
import FiltersStatisticsActive from '@/components/custom/FiltersStatisticsActive.vue'
import ActivityLogsModerationsStatistics from '@/components/numbers/ActivityLogsModerationsStatistics.vue'
import ActivityLogsAdminsVsReferents from '@/components/numbers/ActivityLogsAdminsVsReferents.vue'
import ActivityLogsAdminsVsReferentsCumul from '@/components/numbers/ActivityLogsAdminsVsReferentsCumul.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatisticsButton,
    FiltersStatisticsActive,
    ActivityLogsAdminsVsReferents,
    ActivityLogsAdminsVsReferentsCumul,
    ActivityLogsModerationsStatistics,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-admin',
      middleware: ['admin'],
    })
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        this.refetch()
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    filters() {
      if (this.$stores.auth.contextRole === 'admin') {
        return ['department', 'daterange', 'region']
      }
      return []
    },
  },
  methods: {
    refetch() {
      this.$refs.activityLogsModerationsStatistics?.fetch()
      this.$refs.activityLogsAdminsVsReferents?.fetch()
      this.$refs.activityLogsAdminsVsReferentsCumul?.fetch()
    },
  },
})
</script>

<style></style>
