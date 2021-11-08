<template>
  <div>
    Page mission
  </div>
</template>

<script>
export default {
  async asyncData ({ $api, params, error, store }) {
    const { data: mission } = await $api.getMission(params.id).catch(() => {
      return error({ statusCode: 404 })
    })
    console.log('mission', mission)

    // if (['Brouillon', 'En attente de validation'].includes(mission.state)) {
    //   // Si on est pas modérateur
    //   // Ou si on n'est pas responsable de la structure
    //   if (store.getters.isLogged) {
    //     if (
    //       store.getters.user.context_role != 'admin' &&
    //       !store.getters.user.profile.structures.filter(
    //         structure => structure.id == mission.structure_id
    //       ).length
    //     ) {
    //       return error({ statusCode: 403 })
    //     }
    //   } else {
    //     return error({ statusCode: 403 })
    //   }
    // }

    // // Si mission signalée ou organisation désinscrite / signalée / en attente de validation
    // if (
    //   ['Signalée'].includes(mission.state) ||
    //   ['Désinscrite', 'Signalée', 'En attente de validation'].includes(
    //     mission.structure.state
    //   )
    // ) {
    //   if (store.getters.isLogged) {
    //     // Si on est pas modérateur
    //     // Si on ne participe pas à cette mission
    //     // Ou si on n'est pas responsable de la structure
    //     if (
    //       store.getters.user.context_role != 'admin' &&
    //       !store.getters.user.profile.participations.filter(
    //         participation => participation.mission_id == mission.id
    //       ).length &&
    //       !store.getters.user.profile.structures.filter(
    //         structure => structure.id == mission.structure_id
    //       ).length
    //     ) {
    //       return error({ statusCode: 403 })
    //     }
    //   } else {
    //     return error({ statusCode: 403 })
    //   }
    // }

    return {
      mission
    }
  }
}
</script>
