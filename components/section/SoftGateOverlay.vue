<template>
  <div class="fixed inset-0 w-full h-full z-50">
    <FocusLoop :is-visible="true" @keydown.native.esc="onClose">
      <div class="w-full h-full flex flex-col items-center justify-center bg-jva-blue-500/95">
        <div class="flex flex-col w-full h-full px-4">
          <button
            class="p-4 -mr-4 lg:m-0 lg:p-8 cursor-pointer ml-auto lg:absolute lg:right-0"
            @click="onClose"
          >
            <RiCloseFill class="text-white h-10 w-10 fill-current" />
          </button>

          <div v-scroll-lock="true" class="overflow-y-auto flex-1 flex flex-col lg:justify-center">
            <div class="pb-32 lg:pb-0">
              <div class="text-center text-white text-lg tracking-tight">#ChacunPourTous</div>
              <div class="text-center text-white font-bold mb-4 text-4xl tracking-tight">
                <template v-if="step != 'share'"> Participez à cette mission </template>
                <template v-else> Merci pour votre engagement </template>
              </div>
              <div class="bg-gray-100 max-w-full lg:max-w-xl mx-auto px-2 py-6 sm:p-6 lg:p-10">
                <SoftGateEmail v-if="step == 'email'" @login="goToLogin" @register="goToRegister" />
                <SoftGateLogin
                  v-if="step == 'login'"
                  :datas="datas"
                  @next="
                    step = hasPrerequisites
                      ? 'prerequisites'
                      : hasCreneaux
                      ? 'select-creneaux'
                      : 'participate'
                  "
                  @anti-flood="step = 'anti-flood'"
                  @close="onClose"
                />
                <SoftGateRegister
                  v-if="step == 'register'"
                  :datas="datas"
                  @next="
                    step = hasPrerequisites
                      ? 'prerequisites'
                      : hasCreneaux
                      ? 'select-creneaux'
                      : 'participate'
                  "
                />
                <SoftGateAntiFlood
                  v-if="step == 'anti-flood'"
                  @next="
                    step = hasPrerequisites
                      ? 'prerequisites'
                      : hasCreneaux
                      ? 'select-creneaux'
                      : 'participate'
                  "
                  @close="onClose"
                />
                <SoftGatePrerequisites
                  :check-distance="needToCheckDistance"
                  v-if="step == 'prerequisites'"
                  @next="step = hasCreneaux ? 'select-creneaux' : 'participate'"
                  @close="onClose"
                />
                <SoftGateSelectCreneaux
                  v-if="$stores.softGate.selectedMission && step == 'select-creneaux'"
                  @next="step = 'participate'"
                />
                <SoftGateParticipate
                  v-if="step == 'participate'"
                  @next="step = 'share'"
                  @back="step = 'select-creneaux'"
                />
                <SoftGateShare v-if="step == 'share'" @next="onClose" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusLoop>
  </div>
</template>

<script>
import { FocusLoop } from '@vue-a11y/focus-loop'
import SoftGateEmail from '@/components/section/soft-gate/Email.vue'
import SoftGateLogin from '@/components/section/soft-gate/Login.vue'
import SoftGateRegister from '@/components/section/soft-gate/Register.vue'
import SoftGateAntiFlood from '@/components/section/soft-gate/AntiFlood.vue'
import SoftGateParticipate from '@/components/section/soft-gate/Participate.vue'
import SoftGateSelectCreneaux from '@/components/section/soft-gate/SelectCreneaux.vue'
import SoftGateShare from '@/components/section/soft-gate/Share.vue'
import SoftGatePrerequisites from '@/components/section/soft-gate/Prerequisites.vue'

export default defineNuxtComponent({
  name: 'SoftGateOverlay',
  components: {
    SoftGateEmail,
    SoftGateLogin,
    SoftGateRegister,
    SoftGateAntiFlood,
    SoftGateParticipate,
    SoftGateSelectCreneaux,
    SoftGateShare,
    SoftGatePrerequisites,
    FocusLoop,
  },
  data() {
    // let firstStep = 'email'
    // const selectedMission = this.$stores.softGate.selectedMission
    // if (this.$stores.auth.isLogged) {
    //   if (this.$stores.auth.user.statistics.new_participations_today >= 3) {
    //     firstStep = 'anti-flood'
    //   } else if (selectedMission.prerequisites) {
    //     firstStep = 'prerequisites'
    //   } else if (
    //     selectedMission.dates?.filter(
    //       (date) =>
    //         this.$dayjs(date.id).isAfter(this.$dayjs()) ||
    //         this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
    //     ).length > 0
    //   ) {
    //     firstStep = 'select-creneaux'
    //   } else {
    //     firstStep = 'participate'
    //   }
    // }

    return {
      datas: null,
      selectedMission: this.$stores.softGate.selectedMission,
      step: 'email',
    }
  },
  created() {
    this.step = this.firstStepResolver()
  },
  computed: {
    nextDates() {
      return this.selectedMission.dates?.filter(
        (date) =>
          this.$dayjs(date.id).isAfter(this.$dayjs()) ||
          this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
      )
    },
    hasCreneaux() {
      return this.nextDates?.length > 0
    },
    hasPrerequisites() {
      return this.selectedMission?.prerequisites?.length > 0 || this.needToCheckDistance
    },
    needToCheckDistance() {
      if (this.selectedMission.type === 'Mission à distance') {
        return false
      }
      if (this.selectedMission.is_autonomy) {
        return false
      }
      if (this.selectedMission.latitude === null || this.selectedMission.longitude === null) {
        return false
      }
      if (
        this.$stores.auth.user.profile.latitude === null ||
        this.$stores.auth.user.profile.longitude === null
      ) {
        return false
      }

      return (
        this.$utils.haversineDistanceBetweenPoints(
          this.$stores.auth.user.profile.latitude,
          this.$stores.auth.user.profile.longitude,
          this.selectedMission.latitude,
          this.selectedMission.longitude
        ) > 30000
      )
    },
  },
  methods: {
    firstStepResolver() {
      if (!this.$stores.auth.isLogged) {
        return 'email'
      }
      if (this.$stores.auth.user.statistics.new_participations_today >= 3) {
        return 'anti-flood'
      }
      if (this.hasPrerequisites) {
        return 'prerequisites'
      }
      if (this.hasCreneaux) {
        return 'select-creneaux'
      }
      return 'participate'
    },
    goToLogin(datas) {
      this.step = 'login'
      this.datas = datas
    },
    goToRegister(datas) {
      this.step = 'register'
      this.datas = datas
    },
    onClose() {
      if (this.step == 'share') {
        this.$stores.softGate.closeOverlay()
        this.$router.push('/profile/missions')
      } else {
        this.$stores.softGate.closeOverlay()
      }
    },
  },
})
</script>
