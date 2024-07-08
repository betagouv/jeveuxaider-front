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
            { text: 'Conversions' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Conversions">
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <ParticipationsStatistics ref="participationsStatistics" />
      <!-- <ParticipationsByDate
        ref="participationsByDate"
      /> -->
      <!-- <ParticipationsByPeriod ref="participationsByPeriod" /> -->
      <!-- <ParticipationsConversionByDate
        v-if="['admin'].includes($stores.auth.contextRole)"
        ref="participationsConversionByDate"
      /> -->
      <div class="flex flex-col gap-12">
        <ParticipationsConversionByDate ref="participationsConversionByDate" />
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatisticsButton from '@/components/custom/FiltersStatisticsButton.vue'
import FiltersStatisticsActive from '@/components/custom/FiltersStatisticsActive.vue'
import ParticipationsByDate from '@/components/numbers/ParticipationsByDate.vue'
import ParticipationsConversionByDate from '@/components/numbers/ParticipationsConversionByDate.vue'

import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatisticsButton,
    FiltersStatisticsActive,
    ParticipationsByDate,
    ParticipationsConversionByDate,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-admin',
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (!['admin'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
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
        return ['department', 'reseau', 'structure']
      }

      return []
    },
  },
  methods: {
    refetch() {
      this.$refs.participationsByDate?.fetch()
      this.$refs.participationsConversionByDate?.fetch()
    },
  },
})
</script>

<style></style>
