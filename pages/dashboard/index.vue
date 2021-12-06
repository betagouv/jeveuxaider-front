<template>
  <div class="px-6 xl:px-0 max-w-[1313px] mx-auto">
    <Breadcrumb
      :items="[{ label: 'Tableau de bord' }]"
    />
    <div class="py-12">
      <DashboardBenevole v-if="$store.getters.contextRole == 'volontaire'" />
      <DashboardAdmin v-if="$store.getters.contextRole == 'admin'" />
      <DashboardResponsable v-if="$store.getters.contextRole == 'responsable'" />
      <DashboardReferent v-if="$store.getters.contextRole == 'referent'" />
      <DashboardReferentRegional v-if="$store.getters.contextRole == 'referent_regional'" />
    </div>
  </div>
</template>

<script>
import DashboardBenevole from '@/components/dashboard/home/Benevole'
import DashboardAdmin from '@/components/dashboard/home/Admin'
import DashboardResponsable from '@/components/dashboard/home/Responsable'
import DashboardReferent from '@/components/dashboard/home/Referent'
import DashboardReferentRegional from '@/components/dashboard/home/ReferentRegional'

export default {
  components: {
    DashboardBenevole,
    DashboardAdmin,
    DashboardResponsable,
    DashboardReferent,
    DashboardReferentRegional
  },
  layout: 'dashboard',
  middleware: 'authenticated'
}
</script>

<style>

</style>
