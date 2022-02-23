<template>
  <div class="fixed inset-0 w-full h-full z-50">
    <div
      id="soft-gate"
      class="w-full h-full flex flex-col items-center justify-center"
    >
      <div class="flex flex-col w-full h-full px-4">
        <button
          class="p-4 -mr-4 lg:m-0 lg:p-8 cursor-pointer ml-auto lg:absolute lg:right-0"
          @click="onClose"
        >
          <XIcon class="text-white h-10 w-10" />
        </button>

        <div
          v-scroll-lock="true"
          class="overflow-y-auto flex-1 flex flex-col lg:justify-center"
        >
          <div class="pb-32 lg:pb-0">
            <div class="text-center text-white text-lg">
              #ChacunPourTous
            </div>
            <div class="title text-center text-white font-extrabold mb-4">
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
              class="bg-gray-100 rounded-lg max-w-full lg:max-w-xl mx-auto p-6 lg:p-10"
            >
              <SoftGateEmail
                v-if="step == 'email'"
                @login="goToLogin"
                @register="goToRegister"
              />
              <SoftGateLogin
                v-if="step == 'login'"
                :datas="datas"
                @next="step = 'participate'"
                @too-many-participations="step = 'too-many-participations'"
              />
              <!-- <SoftGateRegister
                v-if="step == 'register'"
                :datas="datas"
                @next="step = 'participate'"
                @too-many-participations="step = 'too-many-participations'"
              />

              <SoftGateTooManyParticipations
                v-if="step == 'too-many-participations'"
                @next="step = 'participate'"
                @close="onClose"
              /> -->
              <SoftGateParticipate
                v-if="step == 'participate'"
                @next="step = 'share'"
              />
              <!-- <SoftGateShare v-if="step == 'share'" @next="onClose" /> -->
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
// import SoftGateRegister from '@/components/section/soft-gate/Register'
// import SoftGateTooManyParticipations from '@/components/section/soft-gate/TooManyParticipations'
import SoftGateParticipate from '@/components/section/soft-gate/Participate'
// import SoftGateShare from '@/components/section/soft-gate/Share'

export default {
  name: 'SoftGateOverlay',
  components: {
    SoftGateEmail,
    SoftGateLogin,
    // SoftGateRegister,
    // SoftGateTooManyParticipations,
    SoftGateParticipate
    // SoftGateShare
  },
  data () {
    return {
      step: 'email',
      datas: null
    }
  },
  created () {
    if (this.$store.getters.isLogged) {
      if (
        this.$store.state.auth.user.statistics.new_participations_today >= 3
      ) {
        this.step = 'too-many-participations'
      } else {
        this.step = 'participate'
      }
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
      console.log('close soft gate')
      this.$store.commit('setSoftGateMissionSelected', null)
      this.$store.commit('toggleSoftGateOverlay')

      // this.$emit('closed')
      if (this.step == 'share') {
        this.$router.push('/profile/missions')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
#soft-gate {
  background-color: rgba(25, 22, 130, 0.95);
  .title {
    font-size: 24px;
    @screen lg {
      font-size: 50px;
      letter-spacing: -1px;
    }
  }
}
</style>
