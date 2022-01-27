<template>
  <Drawer :is-open="Boolean(participationId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="participation" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/utilisateurs/${participationId}`" class="hover:underline">
          {{ participation.id }}
        </nuxt-link>
      </Heading>
    </template>
    <div v-if="participation">
      <div class="mt-1 text-gray-500">
        {{ participation.profile.full_name }}
      </div>
      <div class="border-t -mx-6 my-6" />
      <div class="text-sm  uppercase font-semibold text-gray-600">
        Statut de la participation
      </div>
      <!-- <SelectMissionState v-if="canEditStatut" :value="participation.state" class="mt-4" @selected="handleChangeState($event)" /> -->
      <div class="mt-4 font-medium text-gray-800">
        {{ participation.state }}
      </div>
    </div>
  </Drawer>
</template>

<script>

export default {
  components: {
  },
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
  }
}
</script>
