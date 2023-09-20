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
            { text: 'Départements' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Départements">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics :filters="['department']" @refetch="refetch()" />
        </div>
      </template>
    </BaseSectionHeading>

    <BaseTabs
      :tabs="[
        {
          name: 'Organisations à valider',
          to: '/admin/statistics/departements/organisations-a-valider',
        },
        {
          name: 'Missions à valider',
          to: '/admin/statistics/departements/missions-a-valider',
        },
        {
          name: 'Missions périmées',
          to: '/admin/statistics/departements/missions-perimees',
          current: true,
        },
      ]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <MissionsOutdatedByDepartments ref="missionsOutdatedByDepartments" />
    </div>
  </div>
</template>

<script>
import MissionsOutdatedByDepartments from '@/components/numbers/MissionsOutdatedByDepartments.vue'
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatistics,
    MissionsOutdatedByDepartments,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-admin',
      middleware: ['admin'],
    })
  },
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.missionsOutdatedByDepartments.$fetch()
    },
  },
})
</script>

<style></style>
