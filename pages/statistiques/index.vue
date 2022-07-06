<template>
  <div class="h-full">
    <div class="container">
      <Breadcrumb
        :items="[
          { label: 'Statistiques' },
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
            :title="`Statistiques globales`"
            class="mb-12"
          >
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <FiltersYears @refetch="refetch()" />
              </div>
            </template>
          </SectionHeading>
          <div class="space-y-8">
            <Overview ref="overview" />
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
import Overview from '@/components/statistics/Overview'
// import ParticipationsByDomaines from '@/components/statistics/ParticipationsByDomaines'
// import ParticipationsByActivities from '@/components/statistics/ParticipationsByActivities'
import FiltersYears from '@/components/custom/FiltersYears'

export default {
  name: 'Dashboard',
  components: {
    SecondaryMenuPublicStatistics,
    Overview,
    FiltersYears
    // ParticipationsByDomaines
    // ParticipationsByActivities
  },
  methods: {
    refetch () {
      this.$refs.overview.$fetch()
    }
  }
}
</script>

<style scoped>

</style>
