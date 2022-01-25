<template>
  <div v-if="missionTemplate">
    <div class="inline-flex items-center space-x-2 mt-2">
      <div
        :class="['h-3 w-3 rounded-full', missionTemplate.published ? 'bg-jva-green-500' : 'bg-jva-red-500']"
      />
      <div class="underline text-sm">
        {{ missionTemplate.published ? 'En ligne' : 'Hors ligne' }}
      </div>
    </div>
    <div class="flex gap-2 mt-4">
      <nuxt-link :to="`/admin/contenus/modeles-mission/${missionTemplate.id}/edit`" class="inline-flex">
        <Button variant="white" size="sm" icon="PencilIcon">
          Modifier
        </Button>
      </nuxt-link>
    </div>

    <div class="border-t -mx-6 my-6" />
    <div class="text-sm  uppercase font-semibold text-gray-600">
      Statut du modèle
    </div>
    <SelectMissionTemplateState :value="missionTemplate.state" class="mt-4" @selected="handleChangeState($event)" />

    <div class="border-t -mx-6 my-6" />
    <BoxInformations class="mb-8" :mission-template="missionTemplate" />
    <BoxMission class="mb-8" :mission-template="missionTemplate" :stats="stats" />
    <BoxParticipation class="mb-8" :mission-template="missionTemplate" :stats="stats" />
    <BoxReseau v-if="missionTemplate.reseau" class="mb-8" :mission-template="missionTemplate" />

    <div class="flex justify-center mb-10">
      <Link :to="`/admin/contenus/modeles-mission/${missionTemplate.id}/edit`" class="uppercase font-semibold text-sm hover:underline">
        Détails du modèle
      </Link>
    </div>
  </div>
</template>

<script>
import BoxInformations from '@/components/section/mission-template/BoxInformations'
import BoxReseau from '@/components/section/mission-template/BoxReseau'
import BoxMission from '@/components/section/mission-template/BoxMission'
import BoxParticipation from '@/components/section/mission-template/BoxParticipation'
import SelectMissionTemplateState from '@/components/custom/SelectMissionTemplateState'

export default {
  components: {
    BoxInformations,
    BoxReseau,
    BoxMission,
    BoxParticipation,
    SelectMissionTemplateState
  },
  props: {
    missionTemplateId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      missionTemplate: null,
      stats: null
    }
  },
  async fetch () {
    if (!this.missionTemplateId) {
      return null
    }
    const { data: missionTemplate } = await this.$axios.get(`/mission-templates/${this.missionTemplateId}`)
    this.missionTemplate = missionTemplate
    const { data: missionTemplateStats } = await this.$axios.get(`/mission-templates/${this.missionTemplateId}/statistics`)
    this.stats = missionTemplateStats
    this.$emit('loaded', missionTemplate)
  },
  watch: {
    missionTemplateId: '$fetch'
  },
  methods: {
    async handleChangeState (option) {
      this.missionTemplate.state = option.key
      await this.$axios.put(`/mission-templates/${this.missionTemplate.id}`, this.missionTemplate)
      this.$fetch()
    }
  }
}
</script>
