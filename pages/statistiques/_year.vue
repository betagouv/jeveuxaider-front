<template>
  <div class="h-full">
    <div class="container">
      <Breadcrumb
        :items="[
          { label: 'Statistiques' },
          { label: $route.params.year },
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
            :title="`Statistiques sur l'année ${$route.params.year}`"
            class="mb-12"
          />
          <div class="space-y-8">
            <Overview />
            <ParticipationsByDomaines />
            <!-- <ParticipationsByActivities /> -->
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
import ParticipationsByDomaines from '@/components/statistics/ParticipationsByDomaines'
// import ParticipationsByActivities from '@/components/statistics/ParticipationsByActivities'

export default {
  name: 'Dashboard',
  components: {
    SecondaryMenuPublicStatistics,
    Overview,
    ParticipationsByDomaines
    // ParticipationsByActivities
  }
}
</script>

<style scoped>

</style>
