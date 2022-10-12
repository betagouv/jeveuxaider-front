<template>
  <Drawer :is-open="Boolean(participationId)" @close="$emit('close')">
    <template #title>
      <div v-if="participation" class="text-xl">
        Participation de <br>
        <span class="font-extrabold">{{ participation.profile.full_name }}</span>
      </div>
    </template>
    <template v-if="participation">
      <SelectParticipationState v-if="canEditStatut" :value="participation.state" :participation="participation" class="mt-4" @selected="handleChangeState($event)" />
      <div v-else class="mt-4 font-medium text-gray-800">
        {{ participation.state }}
      </div>
      <template v-if="participation.conversation && canEditStatut">
        <div class="border-t -mx-6 my-6" />
        <nuxt-link :to="`/messages/${participation.conversation.id}`" class="text-jva-blue-500 flex items-center text-sm font-bold">
          <ChatAltIcon class="h-4 w-4 mr-4" /> Accéder à la messagerie
        </nuxt-link>
      </template>
      <div class="border-t -mx-6 my-6" />
      <BoxInformationsProfile class="mb-8" :profile="participation.profile" title="Bénévole" :show-action="false" />
      <BoxUtm v-if="$store.getters.contextRole === 'admin'" class="mb-8" :model="participation" />
      <BoxInformationsMission class="mb-8" :mission="participation.mission" title="Mission">
        <template #action>
          <Link :to="`/admin/missions/${participation.mission.id}`" icon="ChevronRightIcon">
            Consulter
          </Link>
        </template>
      </BoxInformationsMission>
      <BoxResponsable :responsable="participation.mission.responsable" />
    </template>
  </Drawer>
</template>

<script>
import SelectParticipationState from '@/components/custom/SelectParticipationState'
import MixinParticipation from '@/mixins/participation'
import BoxInformationsProfile from '@/components/section/profile/BoxInformations'
import BoxInformationsMission from '@/components/section/mission/BoxInformations'
import BoxResponsable from '@/components/section/BoxResponsable'
import BoxUtm from '@/components/section/BoxUtm'

export default {
  components: {
    SelectParticipationState,
    BoxInformationsProfile,
    BoxInformationsMission,
    BoxResponsable,
    BoxUtm
  },
  mixins: [MixinParticipation],
  props: {
    participationId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      participation: null
    }
  },
  async fetch () {
    if (!this.participationId) {
      return null
    }
    const { data: participation } = await this.$axios.get(`/participations/${this.participationId}`)
    this.participation = participation
    this.$emit('loaded', participation)
  },
  watch: {
    participationId: '$fetch'
  },
  methods: {
    async handleChangeState (payload) {
      this.participation.state = payload.key
      payload.key == 'Refusée'
        ? await this.$axios.put(`/participations/${this.participation.id}/decline`, payload.form).catch(() => {})
        : await this.$axios.put(`/participations/${this.participation.id}`, this.participation).catch(() => {})
      this.$fetch()
      this.$emit('updated')
    }
  }
}
</script>
