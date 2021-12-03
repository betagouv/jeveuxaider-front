<template>
  <div class="px-6 xl:px-0 max-w-[1313px] mx-auto">
    <Breadcrumb
      :items="[{ label: 'Tableau de bord' }]"
    />
    <div class="py-12">
      <DashboardBenevole v-if="$store.getters.contextRole == 'volontaire'" />
      <DashboardAdmin v-if="$store.getters.contextRole == 'admin'" />
      <DashboardResponsable v-if="$store.getters.contextRole == 'responsable'" />
      <DashboardReferent v-if="['referent','referent_regional'].includes($store.getters.contextRole)" />
    </div>
  </div>
</template>

<script>
import DashboardBenevole from '@/components/dashboard/Benevole'
import DashboardAdmin from '@/components/dashboard/Admin'
import DashboardResponsable from '@/components/dashboard/Responsable'
import DashboardReferent from '@/components/dashboard/Referent'

export default {
  components: {
    DashboardBenevole,
    DashboardAdmin,
    DashboardResponsable,
    DashboardReferent
  },
  middleware: 'authenticated'
}
</script>

<style>

</style>
