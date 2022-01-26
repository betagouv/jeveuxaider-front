<template>
  <div v-if="mission">
    <nuxt-link class="inline-flex items-center space-x-2 mt-2" target="_blank" :to="`/missions-benevolat/${mission.id}/${mission.slug}`">
      <div
        :class="['h-3 w-3 rounded-full', hasPageOnline ? 'bg-jva-green-500' : 'bg-jva-red-500']"
      />
      <div class="underline text-sm">
        {{ hasPageOnline ? 'En ligne' : 'Hors ligne' }}
      </div>
      <ExternalLinkIcon class="h-4 w-4" />
    </nuxt-link>
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
      <!-- <SelectWithDescription
        v-if="$store.getters.contextRole === 'admin'"
        :options="[
          {key: true, label: 'Prioritaire', description: 'Passer en prioritaire pour l\'afficher sur la page d\'accueil'},
          {key: false, label: 'Non prioritaire', description: 'Ne plus l\'afficher sur le page d\'accueil'}
        ]"
        :value="mission.is_priority"
        size="sm"
        @selected="handleChangePriority($event)"
      /> -->
      <Button v-if="$store.getters.contextRole === 'responsable'" class="opacity-25" variant="white" size="sm" icon="DuplicateIcon">
        Dupliquer
      </Button>
    </div>
    <div class="border-t -mx-6 my-6" />
    <div class="text-sm  uppercase font-semibold text-gray-600">
      Statut de la mission
    </div>
    <SelectMissionState v-if="canEditStatut" :value="mission.state" class="mt-4" @selected="handleChangeState($event)" />
    <div v-else class="mt-4 font-medium text-gray-800">
      {{ mission.state }}
    </div>
    <div class="border-t -mx-6 my-6" />
    <BoxPlace class="mb-8" :mission="mission" />
    <BoxInformations class="mb-8" :mission="mission" />
    <BoxResponsable class="mb-8" :mission="mission" />
    <div class="flex justify-center mb-10">
      <Link :to="`/admin/missions/${mission.id}`" class="uppercase font-semibold text-sm hover:underline">
        Détails de la mission
      </Link>
    </div>
  </div>
</template>

<script>
import SelectMissionState from '@/components/custom/SelectMissionState'
import BoxPlace from '@/components/section/mission/BoxPlace'
import BoxResponsable from '@/components/section/mission/BoxResponsable'
import BoxInformations from '@/components/section/mission/BoxInformations'
import MixinMission from '@/mixins/mission'

export default {
  components: {
    SelectMissionState,
    BoxPlace,
    BoxResponsable,
    BoxInformations
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
      mission: null
    }
  },
  async fetch () {
    if (!this.missionId) {
      return null
    }
    const { data } = await this.$axios.get(`/mission/${this.missionId}`)
    this.mission = data
    this.$emit('loaded', data)
  },
  watch: {
    missionId: '$fetch'
  },
  methods: {
    async handleChangeState (option) {
      this.mission.state = option.key
      await this.$axios.put(`/mission/${this.mission.id}`, this.mission)
      this.$fetch()
    },
    async handleChangePriority (option) {
      this.mission.is_priority = option.key
      await this.$axios.put(`/mission/${this.mission.id}`, this.mission)
      this.$fetch()
    }
  }
}
</script>
