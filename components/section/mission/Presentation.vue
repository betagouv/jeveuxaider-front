<template>
  <Box class="relative z-10">
    <div class="flex justify-between mb-6">
      <div class="flex flex-wrap gap-2">
        <Badge
          v-if="domaine"
          class="uppercase"
          :color="domaine.id"
        >
          {{ domaine.name }}
        </Badge>
        <Badge
          v-if="mission.domaine_secondary"
          class="uppercase"
          color="gray-light"
        >
          {{ mission.domaine_secondary.name }}
        </Badge>
      </div>
      <div
        class="absolute sm:static bg-white flex-none rounded-full h-8 w-8 flex items-center justify-center p-2 border-2 transform will-change-transform hover:scale-110 focus:scale-110 !outline-none transition cursor-pointer"
        style="right: -8px; top: -46px"
        @click="handleClickShare"
      >
        <ShareIcon class="text-gray-500 h-10 w-10" />
      </div>
    </div>
    <Heading as="h1" :level="1" class="line-clamp-4">
      {{ mission.name }}
    </Heading>
    <div v-if="mission.responsable" class="my-6 text-cool-gray-500 font-medium">
      <span>Publié par </span>
      <img
        v-if="mission.responsable.image"
        :src="
          mission.responsable.image.thumb
            ? mission.responsable.image.thumb
            : mission.responsable.image.original
        "
        :alt="mission.responsable.full_name"
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
    <div v-if="mission.publics_beneficiaires && mission.publics_beneficiaires.length" class="flex items-center gap-4 mb-4">
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
        v-html="mission.skills.map((skill) => skill.name).join(`<span class='mx-2'>•</span>`)"
      />
    </template>

    <template v-if="mission.isFromApi">
      <hr class="border-gray-200 my-8">

      <div>
        <h2 class="text-lg font-medium">
          <span>L'organisation</span>
          <b class="text-[#070191]">
            {{ mission.structure.name }}
          </b>
        </h2>
      </div>
      <div class="mt-4">
        <span>Mission proposée par</span>
        <span class="font-bold text-black">
          {{ mission.publisher_name }}
        </span>
        <div class="text-gray-600 text-base">
          Vous serez redirigé vers {{ mission.publisher_url }}
        </div>
      </div>
    </template>
  </Box>
</template>

<script>
import MixinMission from '@/mixins/mission'

export default {
  mixins: [MixinMission],
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClickShare () {
      this.$store.commit('missionShare/showOverlay')
      this.$store.commit('missionShare/setSelectedMission', this.mission)
    }
  }
}
</script>
