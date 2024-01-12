<template>
  <BaseDrawer :is-open="Boolean(participationId)" @close="$emit('close')">
    <template #title>
      <div v-if="participation" class="text-xl">
        Participation de <br />
        <span class="font-extrabold">{{ participation.profile.full_name }}</span>
      </div>
    </template>
    <template v-if="participation">
      <div v-if="loading">
        <LoadingIndicator class="mt-8" />
      </div>
      <div v-else>
        <SelectParticipationState
          v-if="canEditStatut"
          :modelValue="participation.state"
          :participation="participation"
          class="mt-4"
          @selected="handleChangeState($event)"
        />
        <div v-else class="mt-4 font-medium text-gray-800">
          {{ participation.state }}
        </div>
        <template v-if="participation.conversation && canEditStatut">
          <div class="border-t -mx-6 my-6" />
          <nuxt-link
            no-prefetch
            :to="`/messages/${participation.conversation.id}`"
            class="text-jva-blue-500 flex items-center text-sm font-bold"
          >
            <RiMessage3Line class="h-4 w-4 mr-4" /> Accéder à la messagerie
          </nuxt-link>
        </template>
        <div class="border-t -mx-6 my-6" />
        <div class="text-sm uppercase font-semibold text-gray-600">
          <span>Tags</span>
          <span
            v-tooltip="{
              content:
                'Cela permet de mieux catégoriser et suivre les participations. 100% personnalisable, mais commun à l’organisation.',
            }"
            class="p-1 cursor-help group"
          >
            <RiInformationLine
              class="inline h-4 w-4 group-hover:text-gray-900 mb-[2px] fill-current"
            />
          </span>
        </div>

        <BoxTags
          :tags="participation.tags"
          :structure-tags-endpoint="`/structures/${participation.mission.structure_id}/tags`"
          :taggable-endpoint="`/participations/${participation.id}/tags`"
          @update-selected-tags="onUpdateSelectedTags"
        />

        <div class="border-t -mx-6 my-6" />
        <HistoryStateChanges
          v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
          :model-id="participation.id"
          model-type="participation"
          class="mb-8"
        />

        <BoxInformationsProfile
          class="mb-8"
          :profile="participation.profile"
          title="Bénévole"
          :show-action="false"
        />
        <BoxUtm v-if="$stores.auth.contextRole === 'admin'" class="mb-8" :model="participation" />
        <BoxInformationsMission class="mb-8" :mission="participation.mission" title="Mission">
          <template #action>
            <BaseLink :to="`/admin/missions/${participation.mission.id}`" icon="RiArrowRightSLine">
              Consulter
            </BaseLink>
          </template>
        </BoxInformationsMission>
        <BoxResponsable :responsable="participation.mission.responsable" />
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
import SelectParticipationState from '@/components/custom/SelectParticipationState.vue'
import MixinParticipation from '@/mixins/participation'
import BoxInformationsProfile from '@/components/section/profile/BoxInformations.vue'
import BoxInformationsMission from '@/components/section/mission/BoxInformations.vue'
import BoxResponsable from '@/components/section/BoxResponsable.vue'
import BoxUtm from '@/components/section/BoxUtm.vue'
import HistoryStateChanges from '@/components/section/HistoryStateChanges.vue'
import LoadingIndicator from '@/components/custom/LoadingIndicator.vue'
import BoxTags from '@/components/tag/BoxTags.vue'

export default defineNuxtComponent({
  emits: ['close', 'updated', 'loaded', 'update-selected-tags'],
  components: {
    LoadingIndicator,
    SelectParticipationState,
    BoxInformationsProfile,
    BoxInformationsMission,
    BoxResponsable,
    BoxUtm,
    HistoryStateChanges,
    BoxTags,
  },
  mixins: [MixinParticipation],
  props: {
    participationId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      participation: null,
    }
  },

  watch: {
    participationId: 'fetch',
  },
  methods: {
    async fetch() {
      this.loading = true
      if (!this.participationId) {
        return null
      }
      const participation = await apiFetch(`/participations/${this.participationId}`)
      this.participation = participation
      this.loading = false
      this.$emit('loaded', participation)
    },
    onUpdateSelectedTags(payload) {
      this.participation.tags = payload
      this.$emit('update-selected-tags', payload)
    },
    async handleChangeState(payload) {
      this.participation.state = payload.key
      payload.key == 'Refusée'
        ? await apiFetch(`/participations/${this.participation.id}/decline`, {
            method: 'PUT',
            body: payload.form,
          }).catch(() => {})
        : await apiFetch(`/participations/${this.participation.id}`, {
            method: 'PUT',
            body: this.participation,
          }).catch(() => {})
      this.fetch()
      this.$emit('updated')
    },
  },
})
</script>
