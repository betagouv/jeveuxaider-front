<template>
  <div class="fixed inset-0 w-full h-full z-50">
    <div class="w-full h-full flex flex-col items-center justify-center bg-jva-blue-500/95">
      <div class="flex flex-col w-full h-full px-4">
        <button
          class="p-4 -mr-4 lg:m-0 lg:p-8 cursor-pointer ml-auto lg:absolute lg:right-0"
          @click="onClose"
        >
          <RiCloseFill class="text-white h-10 w-10 fill-current" />
        </button>

        <div
          v-scroll-lock="true"
          class="overflow-y-auto flex-1 flex flex-col lg:justify-center"
        >
          <div class="pb-32 lg:pb-0">
            <div class="text-center text-white text-lg tracking-tight">
              #ChacunPourTous
            </div>
            <div class="text-center text-white font-bold mb-4 text-4xl tracking-tight">
              <template
                v-if="step != 'share'"
              >
                Participez à cette mission
              </template>
              <template v-else>
                Merci pour votre engagement
              </template>
            </div>
            <div
              class="bg-gray-100 max-w-full lg:max-w-xl mx-auto px-2 py-6 sm:p-6 lg:p-10"
            >
              <SoftGateEmail
                v-if="step == 'email'"
                @login="goToLogin"
                @register="goToRegister"
              />
              <SoftGateLogin
                v-if="step == 'login'"
                :datas="datas"
                @next="step = hasCreneaux ? 'select-creneaux' : 'participate'"
                @anti-flood="step = 'anti-flood'"
                @close="onClose"
              />
              <SoftGateRegister
                v-if="step == 'register'"
                :datas="datas"
                @next="step = hasCreneaux ? 'select-creneaux' : 'participate'"
              />
              <SoftGateAntiFlood
                v-if="step == 'anti-flood'"
                @next="step = hasCreneaux ? 'select-creneaux' : 'participate'"
                @close="onClose"
              />
              <SoftGateSelectCreneaux
                v-if="$store.state.softGate.selectedMission && step == 'select-creneaux'"
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
  </div>
</template>

<script>
import SoftGateEmail from '@/components/section/soft-gate/Email'
import SoftGateLogin from '@/components/section/soft-gate/Login'
import SoftGateRegister from '@/components/section/soft-gate/Register'
import SoftGateAntiFlood from '@/components/section/soft-gate/AntiFlood'
import SoftGateParticipate from '@/components/section/soft-gate/Participate'
import SoftGateSelectCreneaux from '@/components/section/soft-gate/SelectCreneaux'
import SoftGateShare from '@/components/section/soft-gate/Share'

export default {
  name: 'SoftGateOverlay',
  components: {
    SoftGateEmail,
    SoftGateLogin,
    SoftGateRegister,
    SoftGateAntiFlood,
    SoftGateParticipate,
    SoftGateSelectCreneaux,
    SoftGateShare
  },
  data () {
    let firstStep = 'email'
    const selectedMission = this.$store.state.softGate.selectedMission
    if (this.$store.getters.isLogged) {
      if (
        this.$store.state.auth.user.statistics.new_participations_today >= 3
      ) {
        firstStep = 'anti-flood'
      } else if (selectedMission.dates?.filter(date =>
        this.$dayjs(date.id).isAfter(this.$dayjs()) || this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
      ).length > 0) {
        firstStep = 'select-creneaux'
      } else {
        firstStep = 'participate'
      }
    }

    return {
      datas: null,
      selectedMission,
      step: firstStep
    }
  },
  computed: {
    nextDates () {
      return this.selectedMission.dates?.filter(date =>
        this.$dayjs(date.id).isAfter(this.$dayjs()) || this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
      )
    },
    hasCreneaux () {
      return this.nextDates?.length > 0
    }
  },
  methods: {
    goToLogin (datas) {
      this.step = 'login'
      this.datas = datas
    },
    goToRegister (datas) {
      this.step = 'register'
      this.datas = datas
    },
    onClose () {
      console.log(this.step)
      if (this.step == 'share') {
        this.$store.commit('softGate/hideOverlay')
        this.$router.push('/profile/missions')
      } else {
        this.$store.commit('softGate/hideOverlay')
      }
    }
  }
}
</script>
