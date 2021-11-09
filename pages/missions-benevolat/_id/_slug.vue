<template>
  <div>
    <div class="absolute w-full" style="height: 360px">
      <nuxt-img
        src="/images/bg_header_mission.jpg"
        alt="Mission bénévolat"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="px-4">
      <Breadcrumb
        theme="transparent"
        class="relative z-10"
        :items="[
          { label: 'Missions de bénévolat', link: '/missions-benevolat' },
          {
            label: domainName,
            link: `/missions-benevolat?refinementList[domaines][0]=${domainName}`,
          },
          {
            label:
              mission.type == 'Mission en présentiel'
                ? `Bénévolat ${mission.structure.name} à ${mission.city}`
                : `Bénévolat ${mission.structure.name} à distance`,
            h1: true,
          },
        ]"
      />
      <Box class="relative z-10">
        <Heading as="h1" :level="1">
          {{ mission.name }}
        </Heading>
      </Box>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/layout/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },
  async asyncData ({ $api, params, error, store }) {
    const { data: mission } = await $api.getMission(params.id).catch((err) => {
      return error({ statusCode: err.response.status, message: err.response.statusText })
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
  },
  computed: {
    domainName () {
      return (
        this.mission?.domaine?.name.fr ??
        this.mission?.template?.domaine?.name.fr ??
        null
      )
    }
  }
}
</script>
