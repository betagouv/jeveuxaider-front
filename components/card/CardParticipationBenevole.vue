<template>
  <div class="p-4 lg:p-6 border hover:shadow-md cursor-pointer w-full transition">
    <DsfrBadge size="sm" type="warning">
      {{ participation.state }}
    </DsfrBadge>
    <div class="font-bold my-4 leading-6">{{ mission.name }}</div>
    <div class="flex flex-wrap gap-6">
      <div class="text-xs text-[#666666] leading-tight">
        🗓️ à partir du {{ $dayjs(participation.mission.start_date).format('D MMMM YYYY') }}
      </div>
      <div class="text-xs text-[#666666] leading-tight">
        📍

        <template v-if="mission.type === 'Mission à distance'"> Mission à distance </template>
        <template v-else>
          {{ uniqueCities.join(',') }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'
import ParticipationBenevoleActions from '@/components/custom/ParticipationBenevoleActions.vue'
import mission from '@/mixins/mission'

export default defineNuxtComponent({
  components: {
    ParticipationBenevoleActions,
  },
  mixins: [MixinMission],
  props: {
    participation: {
      type: Object,
      default: null,
    },
    display: {
      type: String,
      default: 'benevole',
    },
    showTags: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mission() {
      return this.participation.mission
    },
  },
})
</script>
