<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[{ text: 'Statistiques', to: '/stats' }, { text: 'Mises en relation' }]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Mises en relation">
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <ParticipationsStatistics ref="participationsStatistics" class="lg:col-span-2" />
      <BaseHeading as="h2" :level="2"> Les mises en relation en détail </BaseHeading>
      <!-- <ParticipationsByDate ref="participationsByDate" class="lg:col-span-2" /> -->

      <div class="flex flex-col gap-12">
        <ParticipationsByActivities ref="participationsByActivities" />
        <ParticipationsByReseaux ref="participationsByReseaux" />
        <ParticipationsByDomaines ref="participationsByDomaines" />
        <ParticipationsByOrganisations ref="participationsByOrganisations" />
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatisticsPublic from '@/components/custom/FiltersStatisticsPublic.vue'
import ParticipationsStatistics from '@/components/statistics/ParticipationsStatistics.vue'
import ParticipationsByDate from '@/components/statistics/ParticipationsByDate.vue'
import ParticipationsByOrganisations from '@/components/statistics/ParticipationsByOrganisations.vue'
import ParticipationsByDomaines from '@/components/statistics/ParticipationsByDomaines.vue'
import ParticipationsByReseaux from '@/components/statistics/ParticipationsByReseaux.vue'
import ParticipationsByActivities from '@/components/statistics/ParticipationsByActivities.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatisticsPublic,
    ParticipationsStatistics,
    ParticipationsByDate,
    ParticipationsByOrganisations,
    ParticipationsByDomaines,
    ParticipationsByReseaux,
    ParticipationsByActivities,
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
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        this.refetch()
      },
    },
  },
  computed: {
    filters() {
      return ['department', 'daterange']
    },
  },
  methods: {
    refetch() {
      this.$refs.participationsByDate?.fetch()
      this.$refs.participationsStatistics?.fetch()
      this.$refs.participationsByDomaines?.fetch()
      this.$refs.participationsByOrganisations?.fetch()
      this.$refs.participationsByReseaux?.fetch()
      this.$refs.participationsByActivities?.fetch()
    },
  },
})
</script>

<style></style>
