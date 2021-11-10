<template>
  <div>
    <div class="absolute w-full" style="height: 360px">
      <img
        src="/images/bg_header_mission.jpg"
        alt="Mission bénévolat"
        class="object-cover w-full h-full"
      >
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
      <div class="space-y-6">
        <Box class="relative z-10">
          <div class="flex justify-between mb-6">
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
                color="gray-light"
              >
                {{ mission.domaine_secondaire.name.fr }}
              </Badge>
            </div>
            <div>Share todo</div>
          </div>
          <Heading as="h1" :level="1">
            {{ mission.name }}
          </Heading>
          <div class="my-6 text-cool-gray-500 font-medium">
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
            <span class="text-gray-900">{{ mission.responsable.full_name }} </span>
            <span class="lowercase">de {{ mission.structure.statut_juridique|label('structure_legal_status')|prefix }}</span>
            <component
              :is="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'
                ? 'nuxt-link'
                : 'span'
              "
              :to="`/organisations/${mission.structure.slug}`"
              target="_blank"
              class="font-bold uppercase text-jva-blue-500"
            >
              <h2 class="inline">
                {{ mission.structure.name }}
              </h2>
            </component>
          </div>
          <div class="flex items-center gap-4 mb-4">
            <div
              class="flex-none font-bold text-xs uppercase text-gray-500"
            >
              Publics aidés
            </div>
            <hr class="text-gray-200 w-full">
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="(
                publicBeneficiaire, key
              ) in mission.publics_beneficiaires"
              :key="key"
              class="uppercase"
            >
              {{ publicBeneficiaire|label('mission_publics_beneficiaires') }}
            </Badge>
          </div>
          <template v-if="mission.skills && mission.skills.length">
            <div class="flex items-center gap-4 mt-8 mb-4">
              <div
                class="flex-none font-bold text-xs uppercase text-gray-500"
              >
                Compétences recherchées
              </div>
              <hr class="text-gray-200 w-full">
            </div>
            <div
              class="text-cool-gray-500"
              v-html="mission.skills.map((skill) => skill.name.fr).join(`<span class='mx-2'>•</span>`)"
            />
          </template>
        </Box>

        <Box v-if="mission.type == 'Mission en présentiel'" :padding="false">
          <iframe
            width="100%"
            height="100%"
            style="border: 0; min-height: 190px"
            loading="lazy"
            allowfullscreen
            :src="`https://www.google.com/maps/embed/v1/place?key=${$config.google.places}&q=${mission.full_address}`"
          />
          <div class="text-sm px-6 py-4">
            <span class="font-bold text-gray-800 uppercase">Mission sur le terrain</span> <br>
            📍 <span class="text-gray-500">{{ mission.full_address }}</span>
          </div>
        </Box>

        <Box v-else class="relative" :padding="false">
          <img
            src="/images/mission_a_distance.jpg"
            srcset="/images/mission_a_distance@2x.jpg 2x"
            alt="Personne assise devant un ordinateur portable"
            class="absolute inset-0 w-full h-full object-cover"
          >

          <div class="absolute inset-0 custom-gradient" />

          <div class="text-white relative px-6 xl:px-16 py-8">
            <div class="font-extrabold text-2xl mb-2">
              Mission à distance
            </div>
            <div>
              Réalisez cette mission de bénévolat<br>
              <strong>depuis chez vous</strong> ou
              <strong>en autonomie</strong>
            </div>
          </div>
        </Box>

        <Box>
          <Heading as="div" :level="3" class="mb-4">
            Présentation de la mission
          </Heading>

          <TextFormatted :max-lines="2" :text="mission.objectif" class="text-cool-gray-500" />

          <div
            v-if="mission.information"
            class="mt-6 p-6 md:p-8 xl:p-12 rounded-xl custom-gradient-2 relative min-h-[120px]"
          >
            <img
              class="absolute right-0 bottom-0 p-6"
              src="/images/quote.svg"
              alt="Guillemets"
            >

            <h3 class="relative z-10 citation text-lg" v-html="mission.information " />
          </div>

          <Heading as="div" :level="3" class="mb-4 mt-10">
            Précisions
          </Heading>

          <TextFormatted :max-lines="2" :text="mission.description" class="text-cool-gray-500" />
        </Box>
      </div>
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
      expandDescription: false,
      mission
    }
  },
  computed: {
  }
}
</script>

<style lang="postcss" scoped>
  .custom-gradient {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 70.1%
    );
  }
  .custom-gradient-2 {
    background: linear-gradient(to right, #070191 5px, #eeedf7 5px);
  }
  .citation {
    display: flex;
    &::before {
      content: '“\00A0';
    }
    &::after {
      content: '\00A0”';
    }
  }

</style>
