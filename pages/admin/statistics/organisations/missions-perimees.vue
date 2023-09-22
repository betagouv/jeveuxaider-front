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
            { text: 'Organisations' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Organisations">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics :filters="['department']" @refetch="refetch()" />
        </div>
      </template>
    </BaseSectionHeading>

    <BaseTabs
      :tabs="[
        {
          name: 'Participations à valider',
          to: '/admin/statistics/organisations/participations-a-valider',
        },
        {
          name: 'Missions périmées',
          to: '/admin/statistics/organisations/missions-perimees',
          current: true,
        },
        {
          name: 'Participations refusées / annulées',
          to: '/admin/statistics/organisations/participations-refusees-annulees',
        },
      ]"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <MissionsOutdatedByOrganisations ref="missionsOutdatedByOrganisations" />
    </div>
  </div>
</template>

<script>
import MissionsOutdatedByOrganisations from '@/components/numbers/MissionsOutdatedByOrganisations.vue'
import FiltersStatistics from '@/components/custom/FiltersStatistics.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatistics,
    MissionsOutdatedByOrganisations,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-admin',
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (!['admin', 'referent'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
  },
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.missionsOutdatedByOrganisations.$fetch()
    },
  },
})
</script>

<style></style>
