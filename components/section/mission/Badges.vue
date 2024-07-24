<template>
  <div class="flex items-center flex-wrap gap-3">
    <DsfrBadge size="sm" :type="badgeTypeMissionSate">
      {{ mission.state }}
    </DsfrBadge>
    <DsfrBadge size="sm" type="gray">
      <div class="flex items-center">
        <div
          :class="['h-2 w-2  rounded-full mr-1', mission.is_online ? 'bg-green-600' : 'bg-red-600']"
        ></div>
        {{ mission.is_online ? 'En ligne' : 'Hors ligne' }}
      </div>
    </DsfrBadge>
    <DsfrBadge v-if="mission.state == 'Validée' && mission.is_online" size="sm" type="gray">
      {{ mission.is_registration_open ? 'Inscriptions ouvertes' : 'Inscriptions fermées' }}
    </DsfrBadge>
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'

export default defineNuxtComponent({
  mixins: [MixinMission],
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
})
</script>
