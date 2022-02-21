<template>
  <Drawer :is-open="Boolean(missionId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="mission" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/missions/${missionId}`" class="hover:underline">
          {{ mission.name }}
        </nuxt-link>
      </Heading>
    </template>
    <div v-if="mission">
      <OnlineIndicator :published="hasPageOnline" :link="`/missions-benevolat/${mission.id}/${mission.slug}`" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/missions/${mission.id}`" class="inline-flex">
          <Button variant="white" size="sm" icon="EyeIcon">
            Détails
          </Button>
        </nuxt-link>
        <nuxt-link :to="`/admin/missions/${mission.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
        <Button v-if="$store.getters.contextRole === 'responsable'" class="opacity-25" variant="white" size="sm" icon="DuplicateIcon">
          Dupliquer
        </Button>
      </div>
      <div class="border-t -mx-6 my-6" />
      <div class="text-sm  uppercase font-semibold text-gray-600">
        Statut de la mission
      </div>
      <SelectMissionState
        v-if="canEditStatut"
        :value="mission.state"
        :mission-stats="missionStats"
        class="mt-4"
        @selected="handleChangeState($event)"
      />
      <div v-else class="mt-4 font-medium text-gray-800">
        {{ mission.state }}
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxPlace class="mb-8" :mission="mission" />
      <BoxInformations class="mb-8" :mission="mission" />
      <BoxResponsable class="mb-8" :profile="mission.responsable" />
      <div class="flex justify-center mb-10">
        <Link :to="`/admin/missions/${mission.id}`" class="uppercase font-semibold text-sm hover:underline">
          Détails de la mission
        </Link>
      </div>
    </div>
  </Drawer>
</template>

<script>
import SelectMissionState from '@/components/custom/SelectMissionState'
import BoxPlace from '@/components/section/mission/BoxPlace'
import BoxResponsable from '@/components/section/mission/BoxResponsable'
import BoxInformations from '@/components/section/mission/BoxInformations'
import MixinMission from '@/mixins/mission'
import OnlineIndicator from '~/components/custom/OnlineIndicator'

export default {
  components: {
    SelectMissionState,
    BoxPlace,
    BoxResponsable,
    BoxInformations,
    OnlineIndicator
  },
  mixins: [MixinMission],
  props: {
    missionId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      mission: null,
      missionStats: null
    }
  },
  async fetch () {
    if (!this.missionId) {
      return null
    }

    const { data } = await this.$axios.get(`/missions/${this.missionId}`)
    this.$axios.get(`/statistics/missions/${this.missionId}`).then(({ data }) => {
      this.missionStats = data
    })

    this.mission = data
  },
  watch: {
    missionId: '$fetch'
  },
  methods: {
    async handleChangeState (option) {
      this.mission.state = option.key
      await this.$axios.put(`/missions/${this.mission.id}`, this.mission)
      this.$fetch()
      this.$emit('updated')
    },
    async handleChangePriority (option) {
      this.mission.is_priority = option.key
      await this.$axios.put(`/missions/${this.mission.id}`, this.mission)
      this.$fetch()
      this.$emit('updated')
    }
  }
}
</script>
