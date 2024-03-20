<template>
  <BaseOverlay :is-open="$stores.softGate.showOverlay" @close="onClose">
    <SoftGateEmail v-if="step == 'email'" @login="goToLogin" @register="goToRegister" />
    <SoftGateLogin
      v-if="step == 'login'"
      :datas="datas"
      @next="handleNextResolver"
      @anti-flood="step = 'anti-flood'"
      @close="onClose"
    />
    <SoftGateRegister v-if="step == 'register'" :datas="datas" @next="handleNextResolver" />
    <SoftGateAntiFlood v-if="step == 'anti-flood'" @next="handleNextResolver" @close="onClose" />
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
  </BaseOverlay>
</template>

<script>
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
  },
  data() {
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
      if (this.selectedMission?.type !== 'Mission en présentiel') {
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
    handleNextResolver() {
      if (this.hasPrerequisites) {
        this.step = 'prerequisites'
      } else if (this.hasCreneaux) {
        this.step = 'select-creneaux'
      } else {
        this.step = 'participate'
      }
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
