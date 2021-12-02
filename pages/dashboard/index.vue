<template>
  <div class="max-w-[1313px] mx-auto">
    <Breadcrumb
      :items="[{ label: 'Tableau de bord' }]"
    />
    <div class="py-12">
      <DashboardBenevole v-if="$store.getters.contextRole == 'volontaire'" />
      <DashboardAdmin v-if="$store.getters.contextRole == 'admin'" />
    </div>
  </div>
</template>

<script>
import DashboardBenevole from '@/components/dashboard/Benevole'
import DashboardAdmin from '@/components/dashboard/Admin'

export default {
  components: {
    DashboardBenevole,
    DashboardAdmin
  },
  middleware: 'authenticated'
}
</script>

<style>

</style>
