<template>
  <div class="flex flex-col h-full">
    <ClientOnly>
      <Teleport to="#teleport-header"> <slot name="header"></slot></Teleport>
    </ClientOnly>

    <div id="content" class="flex-1 overflow-y-auto overflow-x-hidden h-full custom-scrollbar-gray">
      <div class="px-4 max-w-[696px] mx-auto">
        <div class="py-14"><slot></slot></div>
      </div>
    </div>
    <div class="border-t py-4 px-6 flex justify-end">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  async setup() {
    // const { $stores } = useNuxtApp()
    // const route = useRoute()
    // if (
    //   !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
    //     $stores.auth.contextRole
    //   )
    // ) {
    //   return showError({ statusCode: 403 })
    // }
    // if (route.name == 'admin-organisations-id-missions-add') {
    //   $stores.formMission.setMission(null)
    // }
    // console.log('FormMissionWrapper setup', route.name, route.params.id)
    // if (route.name != 'admin-organisations-id-missions-add') {
    //   if (!$stores.formMission.mission) {
    //     const mission = await apiFetch(`/missions/${route.params.id}/show`)
    //     $stores.formMission.setMission(mission)
    //   }
    //   if (!$stores.formMission.mission) {
    //     return showError({ statusCode: 404 })
    //   }
    //   if ($stores.auth.contextRole == 'responsable') {
    //     if ($stores.auth.contextableId != $stores.formMission.mission.structure_id) {
    //       return showError({ statusCode: 403 })
    //     }
    //   }
    //   if (!$stores.formMission.statistics) {
    //     const statistics = await apiFetch(`/statistics/missions/${route.params.id}`)
    //     $stores.formMission.setStatistics(statistics)
    //   }
    // }
  },
  // watch: {
  //   $route(to, from) {
  //     if (to.name == 'admin-organisations-id-missions-add') {
  //       this.$stores.formMission.setMission(null)
  //     }
  //   },
  // },
  // watch: {
  //   $route: {
  //     async handler(newVal, oldVal) {
  //       if (newVal.params.id && newVal.params.id !== oldVal.params.id) {
  //         console.log('FormMissionWrapper $route.params.id', newVal.params.id, oldVal.params.id)
  //         const mission = await apiFetch(`/missions/${newVal.params.id}/show`)
  //         this.$stores.formMission.setMission(mission)
  //       } else {
  //         console.log('Reset store mission null')
  //         this.$stores.formMission.reset()
  //       }
  //     },
  //   },
  // },
  // beforeUnmount() {
  //   console.log('FormMissionWrapper beforeUnmount')
  //   this.$stores.formMission.reset()
  // },
})
</script>
