<template>
  <Drawer :is-open="Boolean(territoireId)" @close="$emit('close')">
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
      </div>

      <div class="border-t -mx-6 my-6" />
      <div class="text-sm  uppercase font-semibold text-gray-600">
        Statut du territoire
      </div>
      <SelectTerritoireState :value="territoire.state" class="mt-4" @selected="handleChangeState($event)" />

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :territoire="territoire" />
      <BoxMission class="mb-8" :territoire="territoire" :stats="stats" />
      <BoxParticipation class="mb-8" :territoire="territoire" :stats="stats" />
      <!-- <BoxReseau v-if="territoire.reseau" class="mb-8" :mission-template="territoire" /> -->

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
import SelectTerritoireState from '@/components/custom/SelectTerritoireState'
import OnlineIndicator from '@/components/custom/OnlineIndicator'

export default {
  components: {
    BoxInformations,
    OnlineIndicator,
    BoxMission,
    BoxParticipation,
    SelectTerritoireState
  },
  props: {
    territoireId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      territoire: null,
      stats: null
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
      await this.$axios.put(`/territoires/${this.territoire.id}`, this.territoire)
      this.$fetch()
    }
  }
}
</script>
