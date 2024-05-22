<template>
  <div class="flex w-full bg-white border-b justify-between items-center px-4 py-2 lg:px-6 lg:py-4">
    <div class="flex w-full items-center gap-4 lg:gap-8">
      <div class="lg:border-r pr-4 lg:pr-8 py-2">
        <nuxt-link
          no-prefetch
          :to="mission ? `/admin/missions/${mission.id}` : '/dashboard'"
          class="flex gap-4 lg:gap-10 items-center group"
        >
          <RiArrowLeftLine
            class="hidden lg:block flex-none h-6 w-6 lg:h-8 lg:w-8 text-[#929292] fill-current group-hover:text-jva-blue-500 transition-colors"
          />
          <img src="@/assets/images/jeveuxaider-logo-short.svg" alt="" width="59" height="44" />
        </nuxt-link>
      </div>
      <div class="flex-1">
        <div class="flex">
          <h1 class="text-lg lg:text-[22px] font-bold">{{ title }}</h1>
          <Badges v-if="mission" class="ml-3" :mission="$stores.formMission.mission" />
        </div>

        <div class="flex" v-if="mission">
          <div class="text-[#666666]">
            #{{ $stores.formMission.mission?.id }} - {{ $stores.formMission.mission?.name }}
          </div>
        </div>
      </div>
      <div class="ml-auto flex gap-2">
        <SelectMissionState
          v-if="canEditStatut"
          :mission="mission"
          :mission-stats="statistics"
          @selected="handleChangeState($event)"
          @updated="$emit('updated', $event)"
        />
        <Actions
          :mission="mission"
          @showModalSwitchIsOnline="$emit('showModalSwitchIsOnline')"
          @missionDeleted="handleDeleted"
        />
      </div>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'
import Badges from '@/components/section/mission/Badges.vue'
import Actions from '@/components/section/mission/Actions.vue'
import SelectMissionState from '@/components/custom/SelectMissionState.vue'

export default defineNuxtComponent({
  mixins: [MixinMission],
  props: {
    title: {
      type: String,
      default: 'Publier une mission',
    },
  },
  components: { Badges, Actions, SelectMissionState },
  computed: {
    mission() {
      return this.$stores.formMission.mission
    },
    statistics() {
      return this.$stores.formMission.statistics
    },
  },
  methods: {
    handleDeleted() {
      this.$router.push('/admin/missions')
    },
  },
})
</script>
