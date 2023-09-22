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
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatisticsPublic @refetch="refetch()" />
        </div>
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <ParticipationsStatistics ref="participationsStatistics" class="lg:col-span-2" />
      <BaseHeading as="h2" :level="2"> Les mises en relation en détail </BaseHeading>
      <ParticipationsByDate ref="participationsByDate" class="lg:col-span-2" />

      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 lg:w-1/2">
          <ParticipationsByActivities ref="participationsByActivities" />
          <ParticipationsByReseaux ref="participationsByReseaux" />
        </div>
        <div class="space-y-12 lg:w-1/2">
          <ParticipationsByDomaines ref="participationsByDomaines" />
          <ParticipationsByOrganisations ref="participationsByOrganisations" />
        </div>
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
  methods: {
    refetch() {
      this.$refs.participationsByDate.fetch()
      this.$refs.participationsStatistics.fetch()
      this.$refs.participationsByDomaines.fetch()
      this.$refs.participationsByOrganisations.fetch()
      this.$refs.participationsByReseaux.fetch()
      this.$refs.participationsByActivities.fetch()
    },
  },
})
</script>

<style></style>
