<template>
  <div class="h-full">
    <div class="container">
      <Breadcrumb
        :items="[
          { label: 'Statistiques', link: '/statistiques' },
          { label: 'Utilisateurs' },
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
            :title="`Statistiques des utilisateurs`"
            class="mb-12"
          >
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <FiltersYears @refetch="refetch()" />
              </div>
            </template>
          </SectionHeading>
          <div class="space-y-8">
            <OverviewUtilisateurs ref="overviewUtilisateurs" />
            <div class="flex flex-col lg:flex-row gap-12">
              <div class="space-y-12 w-1/2">
                <UtilisateursByAge ref="utilisateursByAge" />
              </div>
              <div class="space-y-12 w-1/2" />
            </div>
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
import OverviewUtilisateurs from '@/components/statistics/OverviewUtilisateurs'
import UtilisateursByAge from '@/components/statistics/UtilisateursByAge'
import FiltersYears from '@/components/custom/FiltersYears'

export default {
  name: 'Dashboard',
  components: {
    SecondaryMenuPublicStatistics,
    FiltersYears,
    OverviewUtilisateurs,
    UtilisateursByAge
  },
  methods: {
    refetch () {
      this.$refs.overviewUtilisateurs.$fetch()
      this.$refs.utilisateursByAge.$fetch()
    }
  }
}
</script>

<style scoped>

</style>
