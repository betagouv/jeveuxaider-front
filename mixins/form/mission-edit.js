export default {
  // async setup() {
  //   definePageMeta({
  //     layout: 'form-mission-edit',
  //     middleware: ['authenticated', 'agreed-responsable-terms'],
  //   })
  //   const { $stores } = useNuxtApp()
  //   const route = useRoute()
  //   if (
  //     !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
  //       $stores.auth.contextRole
  //     )
  //   ) {
  //     return showError({ statusCode: 403 })
  //   }
  //   const mission = await apiFetch(`/missions/${route.params.id}`)
  //   if (!mission) {
  //     return showError({ statusCode: 404 })
  //   }
  //   if ($stores.auth.contextRole == 'responsable') {
  //     if ($stores.auth.contextableId != mission.structure_id) {
  //       return showError({ statusCode: 403 })
  //     }
  //   }
  //   return {
  //     mission,
  //   }
  // },
}
