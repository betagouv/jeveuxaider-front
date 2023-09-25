<template>
  <BaseDrawer :is-open="Boolean(territoireId)" @close="$emit('close')">
    <BaseAlertDialog
      v-if="territoire"
      theme="danger"
      title="Supprimer le territoire"
      :text="`Vous êtes sur le point de supprimer le territoire ${territoire.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
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
      <OnlineIndicator
        :published="territoire.is_published"
        :link="territoire.full_url"
        class="mt-2"
      />
      <div class="flex gap-2 mt-4">
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/territoires/${territoire.id}`"
          class="inline-flex"
        >
          <BaseButton variant="white" size="sm" icon="RiEyeLine"> Détails </BaseButton>
        </nuxt-link>
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/territoires/${territoire.id}/edit`"
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
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import MixinTerritoire from '@/mixins/territoire'

export default defineNuxtComponent({
  emits: ['loaded', 'refetch', 'close'],
  components: {
    BoxInformations,
    OnlineIndicator,
    BoxMission,
    BoxParticipation,
    BoxResponsable,
    SelectTerritoireState,
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
    async handleConfirmDelete() {
      await apiFetch(`/territoires/${this.territoireId}`, { method: 'DELETE' })
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
