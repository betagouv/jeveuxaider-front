<template>
  <Box class="relative z-10">
    <div class="flex justify-between mb-6">
      <div class="flex flex-wrap gap-2">
        <Tag v-if="domaine" size="md">
          {{ domaine.name }}
        </Tag>
        <Tag v-if="mission.template?.domaine_secondary" size="md">
          {{ mission.template.domaine_secondary.name }}
        </Tag>
        <Tag v-else-if="!mission.template && mission.domaine_secondary" size="md">
          {{ mission.domaine_secondary.name }}
        </Tag>
      </div>

      <Tag
        :icon-only="true"
        size="md"
        icon="RiShareFill"
        context="clickable"
        class="absolute sm:static flex-none w-8 h-8"
        style="right: 0; top: -48px"
        as="button"
        @click.native="handleClickShare"
      />
    </div>

    <Heading as="h2" size="xl" class="line-clamp-4">
      {{ mission.name }}
    </Heading>

    <div v-if="mission.responsable" class="mt-8 text-[#666666]">
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
      <span class="text-black"> {{ mission.responsable.full_name }} </span>
      <span class="lowercase"> de {{ mission.structure.statut_juridique|label('structure_legal_status')|prefix }} </span>

      <Link
        v-if="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'"
        :is-external="true"
        :to="`/organisations/${mission.structure.slug}`"
        :title="mission.structure.name"
        class="font-bold text-jva-blue-500"
      >
        <h3 class="inline">
          {{ mission.structure.name }}
        </h3>
      </Link>

      <span v-else class="font-bold text-jva-blue-500">
        <h3 class="inline">
          {{ mission.structure.name }}
        </h3>
      </span>
    </div>

    <div v-if="mission.publics_beneficiaires?.length" class="mt-10">
      <HrTitle>
        Publics aidés
      </HrTitle>
      <div class="flex flex-wrap gap-2">
        <Badge
          v-for="(publicBeneficiaire, key) in mission.publics_beneficiaires"
          :key="key"
          :no-icon="true"
          type="info"
          size="sm"
        >
          {{ publicBeneficiaire|label('mission_publics_beneficiaires') }}
        </Badge>
      </div>
    </div>

    <div v-if="mission.activity?.name" class="mt-10">
      <HrTitle>
        Activité
      </HrTitle>
      <Badge size="sm">
        {{ mission.activity.name }}
      </Badge>
    </div>

    <div v-if="mission.skills?.length" class="mt-10">
      <HrTitle>
        Compétences recherchées
      </HrTitle>
      <div class="flex flex-wrap gap-2">
        <Badge
          v-for="(skill, key) in mission.skills"
          :key="key"
          :no-icon="true"
          type="new"
          size="sm"
        >
          {{ skill.name }}
        </Badge>
      </div>
    </div>

    <template v-if="mission.isFromApi">
      <hr class="border-gray-200 my-8">

      <div>
        <h2 class="text-lg">
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
        <div class="text-[#666666]">
          Vous serez redirigé vers {{ mission.publisher_url }}
        </div>
      </div>
    </template>
  </Box>
</template>

<script>
import MixinMission from '@/mixins/mission'
import Tag from '@/components/dsfr/Tag.vue'
import Heading from '@/components/dsfr/Heading.vue'
import Link from '@/components/dsfr/Link.vue'
import Badge from '@/components/dsfr/Badge.vue'

export default {
  components: {
    Tag,
    Heading,
    Link,
    Badge
  },
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
