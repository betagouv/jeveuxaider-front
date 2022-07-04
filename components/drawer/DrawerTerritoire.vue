<template>
  <Drawer :is-open="Boolean(territoireId)" @close="$emit('close')">
    <AlertDialog
      v-if="territoire"
      theme="danger"
      title="Supprimer le territoire"
      :text="`Vous êtes sur le point de supprimer le territoire ${territoire.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <Heading v-if="territoire" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/contenus/territoires/${territoireId}`" class="hover:underline" target="_blank">
          {{ territoire.name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="territoire">
      <OnlineIndicator :published="territoire.is_published" :link="territoire.full_url" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/territoires/${territoire.id}`" class="inline-flex">
          <Button variant="white" size="sm" icon="EyeIcon">
            Détails
          </Button>
        </nuxt-link>
        <nuxt-link :to="`/admin/contenus/territoires/${territoire.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
        <Button variant="white" size="sm" icon="TrashIcon" @click.native="() => showAlert = true" />
      </div>

      <div class="border-t -mx-6 my-6" />
      <div class="text-sm  uppercase font-semibold text-gray-600">
        Statut du territoire
      </div>
      <SelectTerritoireState v-if="canEditStatut" :value="territoire.state" class="mt-4" @selected="handleChangeState($event)" />
      <div v-else class="mt-4 font-medium text-gray-800">
        {{ $options.filters.label(territoire.state,'territoire_workflow_states') }}
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :territoire="territoire" />
      <BoxMission class="mb-8" :territoire="territoire" :stats="stats" />
      <BoxParticipation class="mb-8" :territoire="territoire" :stats="stats" />
      <BoxResponsable v-for="responsable in territoire.responsables" :key="responsable.id" class="mb-8" :responsable="responsable" />

      <div class="flex justify-center mb-10">
        <Link :to="`/admin/contenus/territoires/${territoire.id}`" class="uppercase font-semibold text-sm hover:underline">
          Détails du territoire
        </Link>
      </div>
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/territoire/BoxInformations'
import BoxMission from '@/components/section/territoire/BoxMission'
import BoxParticipation from '@/components/section/territoire/BoxParticipation'
import BoxResponsable from '@/components/section/BoxResponsable'
import SelectTerritoireState from '@/components/custom/SelectTerritoireState'
import OnlineIndicator from '@/components/custom/OnlineIndicator'
import MixinTerritoire from '@/mixins/territoire'

export default {
  components: {
    BoxInformations,
    OnlineIndicator,
    BoxMission,
    BoxParticipation,
    BoxResponsable,
    SelectTerritoireState
  },
  mixins: [MixinTerritoire],
  props: {
    territoireId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      territoire: null,
      stats: null,
      showAlert: false
    }
  },
  async fetch () {
    if (!this.territoireId) {
      return null
    }
    const { data: territoire } = await this.$axios.get(`/territoires/${this.territoireId}`)
    this.territoire = territoire
    const { data: territoireStats } = await this.$axios.get(`/territoires/${this.territoireId}/statistics`)
    this.stats = territoireStats
    this.$emit('loaded', territoire)
  },
  watch: {
    territoireId: '$fetch'
  },
  methods: {
    async handleChangeState (option) {
      this.territoire.state = option.key
      await this.$axios.put(`/territoires/${this.territoireId}`, this.territoire).catch(() => {})
      this.$fetch()
    },
    async handleConfirmDelete () {
      await this.$axios.delete(`/territoires/${this.territoireId}`).then((res) => {
        this.showAlert = false
        this.$emit('close')
        this.$emit('refetch')
      }).catch(() => {})
    }
  }
}
</script>
