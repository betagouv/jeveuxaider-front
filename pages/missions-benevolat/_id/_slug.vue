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
            label: mission.domaine.name.fr,
            link: `/missions-benevolat?refinementList[domaines][0]=${mission.domaine.name.fr}`,
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
        <div class="flex justify-between mb-4">
          <div class="flex flex-wrap gap-2">
            <Badge
              v-if="mission.domaine"
              class="uppercase"
              :color="mission.domaine.slug.fr"
            >
              {{ mission.domaine.name.fr }}
            </Badge>
            <Badge
              v-if="mission.domaine_secondaire"
              class="uppercase"
            >
              {{ mission.domaine_secondaire.name.fr }}
            </Badge>
          </div>
          <div>Share todo</div>
        </div>
        <Heading as="h1" :level="1">
          {{ mission.name }}
        </Heading>
        <div class="mt-2 mb-5 text-base text-[#777E90] font-medium">
          <span>Publié par </span>
          <img
            v-if="mission.responsable.image"
            :src="
              mission.responsable.image.thumb
                ? mission.responsable.image.thumb
                : mission.responsable.image.original
            "
            :alt="`Portrait de ${mission.responsable.full_name}`"
            class="inline-flex w-7 h-7 rounded-full border-2 border-gray-200"
          >
          <span class="text-[#171725]">
            {{ mission.responsable.full_name }}
          </span>
          <span>de structureType todo</span>
          <component
            :is="
              mission.structure.statut_juridique == 'Association' &&
                mission.structure.state == 'Validée'
                ? 'nuxt-link'
                : 'span'
            "
            :to="`/organisations/${mission.structure.slug}`"
            target="_blank"
            class="font-bold uppercase text-[#070191]"
          >
            <h2 class="inline">
              {{ mission.structure.name }}
            </h2>
          </component>
        </div>
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
  }
}
</script>
