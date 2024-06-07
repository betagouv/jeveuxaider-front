<template>
  <div
    ref="menuActions"
    :class="[isPinned ? 'bg-white shadow-lg !z-[51]' : '']"
    class="z-40 sticky top-0 py-4 -mt-4"
  >
    <div class="container">
      <div
        :class="[
          'flex justify-between flex-col lg:flex-row',
          isPinned ? 'lg:items-center' : 'lg:items-start',
        ]"
      >
        <div>
          <div :class="['mr-4', isPinned ? 'flex items-center space-x-3' : 'flex-col']">
            <BaseHeading :level="1" :class="['flex-shrink-0', isPinned && '!text-2xl']">
              Mission
              <span class="font-normal text-gray-500">#{{ mission.id }}</span>
            </BaseHeading>
            <div :class="['flex items-center gap-3 flex-wrap', isPinned ? '' : 'mt-2']">
              <Badges :class="[isPinned ? 'hidden xl:flex' : '']" :mission="mission" />
              <DsfrLink
                :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
                :is-external="false"
                class="text-xs font-normal flex-shrink-0"
              >
                Voir la mission
              </DsfrLink>
            </div>
          </div>
        </div>

        <div class="flex-col sm:flex-row flex gap-3 mt-4 lg:mt-0">
          <slot name="actions">
            <nuxt-link no-prefetch :to="`/admin/missions/${mission.id}/edit`">
              <DsfrButton type="primary">
                <RiPencilLine class="h-5 w-5 fill-current" /> Modifier
              </DsfrButton>
            </nuxt-link>
            <SelectMissionState
              v-if="canEditStatut"
              :mission="mission"
              :mission-stats="missionStats"
              @selected="handleChangeState($event)"
              @updated="$emit('updated', $event)"
            />
            <Actions
              :mission="mission"
              @showModalSwitchIsOnline="$emit('showModalSwitchIsOnline')"
              @missionDeleted="handleDeleted"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>

  <div :class="['container pt-4', { 'opactity-0 lg:!pt-7 xl:!pt-[38px]': isPinned }]">
    <hr :class="['pb-8']" />
  </div>
</template>

<script>
import Actions from '@/components/section/mission/Actions.vue'
import Badges from '@/components/section/mission/Badges.vue'
import SelectMissionState from '@/components/custom/SelectMissionState.vue'
import MixinMission from '@/mixins/mission'

export default defineNuxtComponent({
  emits: ['showModalSwitchIsOnline', 'updated'],
  data() {
    return {
      isPinned: false,
      waitingOnAnimRequest: false,
    }
  },
  components: {
    Actions,
    Badges,
    SelectMissionState,
  },
  props: {
    mission: {
      type: Object,
      required: true,
    },
    missionStats: {
      type: Object,
      default: null,
    },
  },
  mixins: [MixinMission],
  mounted() {
    window.addEventListener('scroll', this.handleScroll, false)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (!this.waitingOnAnimRequest) {
        window.requestAnimationFrame(() => {
          if (!this.$refs.menuActions) {
            return
          }
          this.isPinned = this.$refs.menuActions.getBoundingClientRect().top <= 0
          this.waitingOnAnimRequest = false
        })
      }
      this.waitingOnAnimRequest = true
    },
    handleDeleted() {
      this.$router.push('/admin/missions')
    },
  },
})
</script>
