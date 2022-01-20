<template>
  <div v-if="loading">
    <LoadingIndicator class="mt-8" />
  </div>
  <div v-else>
    <nuxt-link class="flex items-center space-x-2 mt-2" target="_blank" :to="`/organisations/${organisation.slug}`">
      <div
        :class="['h-3 w-3 rounded-full', hasPageOnline ? 'bg-jva-green-500' : 'bg-jva-red-500']"
      />
      <div class="underline text-sm">
        {{ hasPageOnline ? 'En ligne' : 'Hors ligne' }}
      </div>
      <ExternalLinkIcon class="h-4 w-4" />
    </nuxt-link>
    <div class="mt-4 space-x-2">
      <nuxt-link :to="`/admin/organisations/${organisation.id}`">
        <Button variant="white" size="sm" icon="EyeIcon">
          Détails
        </Button>
      </nuxt-link>
      <nuxt-link :to="`/admin/organisations/${organisation.id}/edit`">
        <Button variant="white" size="sm" icon="PencilIcon">
          Modifier
        </Button>
      </nuxt-link>
    </div>
    <div class="border-t -mx-6 my-6" />
    <div class="text-sm  uppercase font-semibold text-gray-600">
      Statut de l'organisation
    </div>
    <SelectOrganisationState v-if="canEditStatut" :value="organisation.state" class="mt-4" @selected="handleChangeState($event)" />
    <div v-else class="mt-4 font-medium text-gray-800">
      {{ organisation.state }}
    </div>
    <div class="border-t -mx-6 my-6" />
    <BoxMission class="mb-8" :organisation="organisation" :organisation-stats="organisationStats" />
    <BoxParticipation class="mb-8" :organisation="organisation" :organisation-stats="organisationStats" />
    <BoxInformations class="mb-8" :organisation="organisation" />
  </div>
</template>

<script>
import MixinOrganisation from '@/mixins/organisation'
import SelectOrganisationState from '@/components/custom/SelectOrganisationState'
import BoxMission from '@/components/section/organisation/BoxMission'
import BoxParticipation from '@/components/section/organisation/BoxParticipation'
import BoxInformations from '@/components/section/organisation/BoxInformations'
import LoadingIndicator from '@/components/custom/LoadingIndicator'

export default {
  components: {
    SelectOrganisationState,
    BoxMission,
    BoxParticipation,
    BoxInformations,
    LoadingIndicator
  },
  mixins: [MixinOrganisation],
  props: {
    organisationId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      organisation: null,
      organisationStats: null,
      loading: false
    }
  },
  async fetch () {
    this.loading = true
    this.organisationStats = null
    if (!this.organisationId) {
      return null
    }
    const { data } = await this.$axios.get(`/structure/${this.organisationId}`)
    this.organisation = data
    this.loading = false
    this.$emit('loaded', data)
    this.$axios.get(`/statistics/organisations/${this.organisationId}`).then(({ data: stats }) => { this.organisationStats = stats })
  },
  watch: {
    organisationId: '$fetch'
  },
  methods: {
    // async handleChangeState (option) {
    //   this.mission.state = option.key
    //   await this.$axios.put(`/mission/${this.mission.id}`, this.mission)
    //   this.$fetch()
    // }
  }
}
</script>
