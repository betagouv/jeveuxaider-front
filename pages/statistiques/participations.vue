<template>
  <div class="h-full">
    <div class="container">
      <Breadcrumb
        :items="[
          { label: 'Statistiques', link: '/statistiques' },
          { label: 'Participations' },
        ]"
      />
      <div class="grid lg:grid-cols-5 gap-6 lg:gap-12 py-6 lg:py-12">
        <aside class="relative lg:col-span-1">
          <div class="lg:block">
            <SecondaryMenuPublicStatistics />
          </div>
        </aside>
        <div class="lg:col-span-4 min-w-0">
          <SectionHeading
            :title="`Statistiques des participations`"
            class="mb-12"
          >
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <FiltersYears @refetch="refetch()" />
              </div>
            </template>
          </SectionHeading>
          <div class="space-y-8">
            <ParticipationsByDomaines ref="participationsByDomaines" />
            <ParticipationsByActivities ref="participationsByActivities" />
          </div>
          <portal-target name="drawer" class="relative z-20" multiple />
        </div>
      </div>
    </div>

    <client-only>
      <portal-target name="body-end" multiple />
    </client-only>
  </div>
</template>

<script>

import SecondaryMenuPublicStatistics from '@/components/menu/SecondaryMenuPublicStatistics'
import ParticipationsByDomaines from '@/components/statistics/ParticipationsByDomaines'
import ParticipationsByActivities from '@/components/statistics/ParticipationsByActivities'
import FiltersYears from '@/components/custom/FiltersYears'

export default {
  name: 'Dashboard',
  components: {
    SecondaryMenuPublicStatistics,
    FiltersYears,
    ParticipationsByDomaines,
    ParticipationsByActivities
  },
  methods: {
    refetch () {
      this.$refs.participationsByDomaines.$fetch()
      this.$refs.participationsByActivities.$fetch()
    }
  }
}
</script>

<style scoped>

</style>
