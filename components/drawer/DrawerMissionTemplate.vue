<template>
  <BaseDrawer :is-open="Boolean(missionTemplateId)" @close="$emit('close')">
    <BaseAlertDialog
      v-if="missionTemplate"
      theme="danger"
      title="Supprimer le modèle de mission"
      :text="`Vous êtes sur le point de supprimer le modèle de mission ${missionTemplate.title}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <BaseHeading v-if="missionTemplate" :level="3" class="text-jva-blue-500">
        {{ missionTemplate.title }}
      </BaseHeading>
    </template>
    <template v-if="missionTemplate">
      <div class="inline-flex items-center space-x-2 mt-2">
        <div
          :class="[
            'h-3 w-3 rounded-full',
            missionTemplate.published ? 'bg-jva-green-500' : 'bg-jva-red-500',
          ]"
        />
        <div class="underline text-sm">
          {{ missionTemplate.published ? 'En ligne' : 'Hors ligne' }}
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/modeles-mission/${missionTemplate.id}/edit`"
          class="inline-flex"
        >
          <BaseButton variant="white" size="sm" icon="RiPencilLine"> Modifier </BaseButton>
        </nuxt-link>
        <BaseButton
          variant="white"
          size="sm"
          icon="RiDeleteBinLine"
          @click.native="() => (showAlert = true)"
        />
      </div>

      <div class="border-t -mx-6 my-6" />
      <div class="text-sm uppercase font-semibold text-gray-600">Statut du modèle</div>
      <SelectMissionTemplateState
        v-if="canEditStatut"
        :modelValue="missionTemplate.state"
        class="mt-4"
        @selected="handleChangeState($event)"
      />
      <div v-else class="mt-4 font-medium text-gray-800">
        {{ $filters.label(missionTemplate.state, 'mission_template_workflow_states') }}
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :mission-template="missionTemplate" />
      <BoxMission class="mb-8" :mission-template="missionTemplate" :stats="stats" />
      <BoxParticipation class="mb-8" :mission-template="missionTemplate" :stats="stats" />
      <BoxReseau v-if="missionTemplate.reseau" class="mb-8" :mission-template="missionTemplate" />

      <div class="flex justify-center mb-10">
        <BaseLink
          :to="`/admin/contenus/modeles-mission/${missionTemplate.id}/edit`"
          class="uppercase font-semibold text-sm hover:underline"
        >
          Détails du modèle
        </BaseLink>
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
import BoxInformations from '@/components/section/mission-template/BoxInformations.vue'
import BoxReseau from '@/components/section/mission-template/BoxReseau.vue'
import BoxMission from '@/components/section/mission-template/BoxMission.vue'
import BoxParticipation from '@/components/section/mission-template/BoxParticipation.vue'
import SelectMissionTemplateState from '@/components/custom/SelectMissionTemplateState.vue'
import MixinMissionTemplate from '@/mixins/mission-template'

export default defineNuxtComponent({
  emits: ['close', 'refetch', 'loaded', 'updated'],
  components: {
    BoxInformations,
    BoxReseau,
    BoxMission,
    BoxParticipation,
    SelectMissionTemplateState,
  },
  mixins: [MixinMissionTemplate],
  props: {
    missionTemplateId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      missionTemplate: null,
      stats: null,
      showAlert: false,
    }
  },

  watch: {
    missionTemplateId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.missionTemplateId) {
        return null
      }
      const missionTemplate = await apiFetch(`/mission-templates/${this.missionTemplateId}`)
      this.missionTemplate = missionTemplate
      const stats = await apiFetch(`/mission-templates/${this.missionTemplateId}/statistics`)
      this.stats = stats
      this.$emit('loaded', missionTemplate)
    },
    async handleChangeState(option) {
      this.missionTemplate.state = option.key
      await apiFetch(`/mission-templates/${this.missionTemplateId}`, {
        method: 'PUT',
        body: this.missionTemplate,
      }).catch(() => {})
      this.fetch()
      this.$emit('updated')
    },
    async handleConfirmDelete() {
      await apiFetch(`/mission-templates/${this.missionTemplateId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          this.showAlert = false
          this.$emit('close')
          this.$emit('refetch')
        })
        .catch(() => {})
    },
  },
})
</script>
