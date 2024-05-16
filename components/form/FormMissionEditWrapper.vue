<template>
  <div class="flex flex-col">
    <div class="flex-1">
      <div class="max-w-[648px] mx-auto">
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
    const { $stores } = useNuxtApp()
    const route = useRoute()
    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }

    console.log('FormMissionEditWrapper setup')
    const mission = await apiFetch(`/missions/${route.params.id}`)

    console.log('mission', mission)
    if (!mission) {
      return showError({ statusCode: 404 })
    }
    if ($stores.auth.contextRole == 'responsable') {
      if ($stores.auth.contextableId != mission.structure_id) {
        return showError({ statusCode: 403 })
      }
    }

    $stores.formMission.setMission(mission)
  },
  // beforeUnmount() {
  //   this.$stores.formMission.reset()
  // },
})
</script>
