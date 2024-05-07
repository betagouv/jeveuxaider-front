<template>
  <BaseDrawer :is-open="Boolean(territoireId)" @close="$emit('close')">
    <template #title>
      <BaseHeading v-if="territoire" :level="3" class="text-jva-blue-500">
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/territoires/${territoireId}`"
          class="hover:underline"
          target="_blank"
        >
          {{ territoire.name }}
        </nuxt-link>
      </BaseHeading>
    </template>
    <template v-if="territoire">
      <DsfrLink :to="`/villes/${territoire.slug}`" :is-external="true" class="text-xs font-normal">
        Voir le territoire
      </DsfrLink>
      <Badges class="mt-5" :territoire="territoire" />
      <div class="flex flex-wrap gap-1 mt-6">
        <DsfrButton
          :to="`/admin/contenus/territoires/${territoire.id}`"
          type="tertiary"
          icon="RiEyeLine"
          size="sm"
        >
          Détails
        </DsfrButton>

        <DsfrButton
          :to="`/admin/contenus/territoires/${territoire.id}/edit`"
          type="tertiary"
          icon="RiPencilLine"
          size="sm"
        >
          Modifier
        </DsfrButton>

        <Actions
          v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
          :territoire="territoire"
          @territoireDeleted="handleDeleted"
          buttonSize="sm"
        />
      </div>

      <div class="border-t -mx-6 my-6" />
      <div class="text-sm uppercase font-semibold text-gray-600">Statut du territoire</div>
      <SelectTerritoireState
        v-if="canEditStatut"
        :modelValue="territoire.state"
        class="mt-4"
        @selected="handleChangeState($event)"
      />
      <div v-else class="mt-4 font-medium text-gray-800">
        {{ $filters.label(territoire.state, 'territoire_workflow_states') }}
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :territoire="territoire" />
      <BoxMission class="mb-8" :territoire="territoire" :stats="stats" />
      <BoxParticipation class="mb-8" :territoire="territoire" :stats="stats" />
      <BoxResponsable
        v-for="responsable in territoire.responsables"
        :key="responsable.id"
        class="mb-8"
        :responsable="responsable.profile"
      />

      <div class="flex justify-center mb-10">
        <BaseLink
          :to="`/admin/contenus/territoires/${territoire.id}`"
          class="uppercase font-semibold text-sm hover:underline"
        >
          Détails du territoire
        </BaseLink>
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
import BoxInformations from '@/components/section/territoire/BoxInformations.vue'
import BoxMission from '@/components/section/territoire/BoxMission.vue'
import BoxParticipation from '@/components/section/territoire/BoxParticipation.vue'
import BoxResponsable from '@/components/section/BoxResponsable.vue'
import SelectTerritoireState from '@/components/custom/SelectTerritoireState.vue'
import MixinTerritoire from '@/mixins/territoire'
import Badges from '@/components/section/territoire/Badges.vue'
import Actions from '@/components/section/territoire/Actions.vue'

export default defineNuxtComponent({
  emits: ['loaded', 'refetch', 'close'],
  components: {
    BoxInformations,
    BoxMission,
    BoxParticipation,
    BoxResponsable,
    SelectTerritoireState,
    Badges,
    Actions,
  },
  mixins: [MixinTerritoire],
  props: {
    territoireId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      territoire: null,
      stats: null,
      showAlert: false,
    }
  },

  watch: {
    territoireId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.territoireId) {
        return null
      }
      const territoire = await apiFetch(`/territoires/${this.territoireId}`)
      this.territoire = territoire
      const stats = await apiFetch(`/territoires/${this.territoireId}/statistics`)
      this.stats = stats
      this.$emit('loaded', territoire)
    },
    async handleChangeState(option) {
      this.territoire.state = option.key
      await apiFetch(`/territoires/${this.territoireId}`, {
        method: 'PUT',
        body: this.territoire,
      }).catch(() => {})
      this.fetch()
      this.$emit('refetch')
    },
    // async handleConfirmDelete() {
    //   await apiFetch(`/territoires/${this.territoireId}`, { method: 'DELETE' })
    //     .then((res) => {
    //       this.showAlert = false
    //       this.$emit('close')
    //       this.$emit('refetch')
    //     })
    //     .catch(() => {})
    // },
    handleDeleted() {
      this.$emit('close')
      this.$emit('refetch')
    },
  },
})
</script>
