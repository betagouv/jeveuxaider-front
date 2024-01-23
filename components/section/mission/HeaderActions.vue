<template>
  <div
    ref="menuActions"
    :class="[isPinned ? 'bg-white shadow-lg' : '']"
    class="z-50 sticky top-0 py-4 -mt-4"
  >
    <div class="container">
      <div class="flex justify-between flex-col lg:flex-row lg:items-center">
        <div>
          <div class="flex items-center space-x-3 mr-4">
            <BaseHeading :level="1" class="" :class="['flex-shrink-0', isPinned && '!text-2xl']">
              Mission
              <span class="font-normal text-gray-500">#{{ mission.id }}</span>
            </BaseHeading>
            <Badges class="hidden xl:flex" :mission="mission" v-if="isPinned" />
            <DsfrLink
              :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
              :is-external="true"
              class="text-xs font-normal ml-2 flex-shrink-0"
            >
              Voir la mission
            </DsfrLink>
          </div>
          <Badges v-if="!isPinned" :mission="mission" />
        </div>

        <div class="flex space-x-3 mt-4 lg:mt-0">
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
  data() {
    return {
      isPinned: false,
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
    let timeout
    window.addEventListener(
      'scroll',
      () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(() => {
          this.handleScroll()
        })
      },
      false
    )
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      if (!this.$refs.menuActions) {
        return
      }
      this.isPinned = this.$refs.menuActions.getBoundingClientRect().top <= 0
    },
    handleDeleted() {
      this.$router.push('/admin/missions')
    },
  },
})
</script>
