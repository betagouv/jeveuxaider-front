<template>
  <BaseBox class="relative z-10">
    <div class="flex justify-between mb-6">
      <div class="flex flex-wrap gap-2">
        <DsfrTag v-if="domaine" size="md">
          {{ domaine.name }}
        </DsfrTag>
        <DsfrTag v-if="mission.template?.domaine_secondary" size="md">
          {{ mission.template.domaine_secondary.name }}
        </DsfrTag>
        <DsfrTag v-else-if="!mission.template && mission.domaine_secondary" size="md">
          {{ mission.domaine_secondary.name }}
        </DsfrTag>
      </div>

      <DsfrTag
        :icon-only="true"
        size="md"
        icon="RiShareFill"
        context="clickable"
        class="absolute sm:static flex-none w-8 h-8"
        style="right: 0; top: -48px"
        as="button"
        title="partager la mission"
        @click.native="handleClickShare"
      />
    </div>

    <DsfrHeading as="h2" size="xl" class="line-clamp-4">
      {{ mission.name }}
    </DsfrHeading>

    <p v-if="mission.responsable" class="mt-8 text-[#666666]">
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
      />
      <span class="text-black">
        {{ mission.responsable.first_name }}
        {{ mission.responsable.last_name[0] }}.
      </span>
      <span class="lowercase">
        de
        {{
          `${$filters.prefix(
            $filters.label(mission.structure.statut_juridique, 'structure_legal_status')
          )} `
        }}
      </span>

      <DsfrLink
        v-if="
          mission.structure.statut_juridique == 'Association' &&
          mission.structure.state == 'Validée'
        "
        :is-external="true"
        :to="`/organisations/${mission.structure.slug}`"
        :title="mission.structure.name"
        class="font-bold text-jva-blue-500"
      >
        {{ mission.structure.name }}
      </DsfrLink>

      <span v-else class="font-bold text-jva-blue-500">
        {{ mission.structure.name }}
      </span>
    </p>

    <div v-if="mission.publics_beneficiaires?.length" class="mt-10">
      <BaseHrTitle>
        {{
          $filters.pluralize(
            mission.publics_beneficiaires.length,
            'Public aidé',
            'Publics aidés',
            false
          )
        }}
      </BaseHrTitle>
      <div class="flex flex-wrap gap-2">
        <DsfrBadge
          v-for="(publicBeneficiaire, key) in mission.publics_beneficiaires"
          :key="key"
          :no-icon="true"
          type="info"
          as="p"
        >
          {{ $filters.label(publicBeneficiaire, 'mission_publics_beneficiaires') }}
        </DsfrBadge>
      </div>
    </div>

    <div v-if="activities?.length" class="mt-10">
      <BaseHrTitle>
        {{ $filters.pluralize(activities.length, 'Activité', 'Activités', false) }}
      </BaseHrTitle>
      <div class="flex flex-wrap gap-2">
        <template v-for="activity in activities" :to="activity.full_url">
          <nuxt-link
            no-prefetch
            v-if="activity.full_url"
            :key="activity.id"
            :to="activity.full_url"
          >
            <DsfrBadge>
              {{ activity.name }}
            </DsfrBadge>
          </nuxt-link>
        </template>
      </div>
    </div>

    <div v-if="mission.skills?.length" class="mt-10">
      <BaseHrTitle>
        {{
          $filters.pluralize(
            mission.skills.length,
            'Compétence recherchée',
            'Compétences recherchées',
            false
          )
        }}
      </BaseHrTitle>
      <div class="flex flex-wrap gap-2">
        <DsfrBadge
          v-for="(skill, key) in mission.skills"
          :key="key"
          :no-icon="true"
          type="new"
          as="p"
        >
          {{ skill.name }}
        </DsfrBadge>
      </div>
    </div>

    <template v-if="['admin'].includes($stores.auth.contextRole)">
      <div v-if="mission.tags?.length" class="mt-10">
        <BaseHrTitle>
          {{ $filters.pluralize(mission.tags.length, 'Tag', 'Tags', false) }}
        </BaseHrTitle>
        <div class="flex flex-wrap gap-2">
          <DsfrBadge v-for="(tag, key) in mission.tags" :key="key" :no-icon="true" as="p">
            {{ tag.name }}
          </DsfrBadge>
        </div>
      </div>
    </template>

    <template v-if="mission.isFromApi">
      <hr class="border-gray-200 my-8" />

      <div>
        <h2 class="text-lg">
          <span>L'organisation </span>
          <b class="text-[#070191]">
            {{ mission.structure.name }}
          </b>
        </h2>
      </div>
      <div class="mt-4">
        <span>Mission proposée par </span>
        <span class="font-bold text-black">
          {{ mission.publisher_name }}
        </span>
        <div class="text-[#666666]">Vous serez redirigé vers {{ mission.publisher_url }}</div>
      </div>
    </template>
  </BaseBox>
</template>

<script>
import MixinMission from '@/mixins/mission'

export default defineNuxtComponent({
  mixins: [MixinMission],
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClickShare() {
      this.$stores.missionShare.selectedMission = this.mission
      this.$stores.missionShare.showOverlay = true
    },
  },
})
</script>
