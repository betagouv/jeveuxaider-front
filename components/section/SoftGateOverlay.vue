<template>
  <BaseOverlay :is-open="$stores.softGate.showOverlay" @close="onClose">
    <template v-if="$stores.softGate.waitingList">
      <SoftGateEmail v-if="step == 'email'" @login="goToLogin" @register="goToRegister" />
      <SoftGateLogin
        v-if="step == 'login'"
        :datas="datas"
        @next="handleNextResolver"
        @anti-flood="step = 'anti-flood'"
        @close="onClose"
      />
      <SoftGateRegister
        v-if="step == 'register'"
        :datas="datas"
        @next="handleRegisterNextStepResolver"
      />
      <SoftGateWaitingList v-if="step == 'waiting-list'" @next="onClose" />
    </template>
    <template v-else>
      <SoftGateEmail v-if="step == 'email'" @login="goToLogin" @register="goToRegister" />
      <SoftGateLogin
        v-if="step == 'login'"
        :datas="datas"
        @next="handleNextResolver"
        @anti-flood="step = 'anti-flood'"
        @close="onClose"
      />
      <SoftGateRegister
        v-if="step == 'register'"
        :datas="datas"
        @next="handleRegisterNextStepResolver"
      />
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
        @next="step = 'invitations'"
        @back="step = 'select-creneaux'"
      />
      <SoftGateInvitations v-if="step == 'invitations'" @next="onStepInvitationsNext" />
      <SoftGateCompleteProfile v-if="step == 'complete-profile'" @next="onClose" />
      <!-- <SoftGateShare v-if="step == 'share'" @next="onClose" :emails="emails" /> -->
    </template>
  </BaseOverlay>
</template>

<script>
import SoftGateEmail from '@/components/section/soft-gate/Email.vue'
import SoftGateLogin from '@/components/section/soft-gate/Login.vue'
import SoftGateRegister from '@/components/section/soft-gate/Register.vue'
import SoftGateAntiFlood from '@/components/section/soft-gate/AntiFlood.vue'
import SoftGateParticipate from '@/components/section/soft-gate/Participate.vue'
import SoftGateSelectCreneaux from '@/components/section/soft-gate/SelectCreneaux.vue'
import SoftGateInvitations from '@/components/section/soft-gate/Invitations.vue'
// import SoftGateShare from '@/components/section/soft-gate/Share.vue'
import SoftGateCompleteProfile from '@/components/section/soft-gate/CompleteProfile.vue'
import SoftGatePrerequisites from '@/components/section/soft-gate/Prerequisites.vue'
import SoftGateWaitingList from '@/components/section/soft-gate/WaitingList.vue'
import Toast from '@/components/Toast.vue'

export default defineNuxtComponent({
  name: 'SoftGateOverlay',
  components: {
    SoftGateEmail,
    SoftGateLogin,
    SoftGateRegister,
    SoftGateAntiFlood,
    SoftGateParticipate,
    SoftGateSelectCreneaux,
    SoftGateInvitations,
    SoftGateCompleteProfile,
    // SoftGateShare,
    SoftGatePrerequisites,
    SoftGateWaitingList,
  },
  data() {
    return {
      datas: null,
      selectedMission: this.$stores.softGate.selectedMission,
      step: 'email',
      emails: [],
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
      if (
        this.selectedMission.addresses[0].latitude === null ||
        this.selectedMission.addresses[0].longitude === null
      ) {
        return false
      }
      if (
        this.$stores.auth.user?.profile?.latitude === null ||
        this.$stores.auth.user?.profile?.longitude === null
      ) {
        return false
      }
      return this.isOneOfAddressesDistanceMoreThan(30000)
    },
    profile() {
      return this.$stores.auth?.user?.profile
    },
    isProfileCompleted() {
      if (!this.profile) return false
      return (
        !!this.profile?.email &&
        !!this.profile?.mobile &&
        !!this.profile?.type &&
        !!this.profile?.birthday &&
        !!this.profile?.zip &&
        !!this.profile?.commitment &&
        this.profile?.activities?.length > 0 &&
        !!this.profile?.type_missions &&
        !!this.profile?.description &&
        !!this.profile?.avatar &&
        (this.profile?.skills?.length > 0 || this.profile?.certifications?.length > 0)
      )
    },
  },
  methods: {
    isOneOfAddressesDistanceMoreThan(maxDistance) {
      for (let i = 0; i < this.selectedMission.addresses.length; i++) {
        const address = this.selectedMission.addresses[i]
        const distance = this.$utils.haversineDistanceBetweenPoints(
          this.$stores.auth.user.profile.latitude,
          this.$stores.auth.user.profile.longitude,
          address.latitude,
          address.longitude
        )
        if (distance > maxDistance) {
          // console.log(
          //   `Address at index ${i} is more than ${maxDistance} kms away: ${distance.toFixed(2)} kms`
          // )
          return true
        } else {
          // console.log(
          //   `Address at index ${i} is within ${maxDistance} kms: ${distance.toFixed(2)} kms`
          // )
        }
      }
      return false
    },
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
    onStepInvitationsNext(payload) {
      this.emails = payload

      if (this.emails.length > 0) {
        if (this.emails.length > 1) {
          this.$toast.success({
            component: Toast,
            props: {
              title: 'Les invitations ont été envoyées',
              message: `${this.emails.join(', ')} vont bientôt recevoir un email`,
            },
          })
        } else {
          this.$toast.success({
            component: Toast,
            props: {
              title: 'L’invitation a été envoyée',
              message: `${this.emails[0]} va bientôt recevoir un email`,
            },
          })
        }
      }

      this.step = 'complete-profile'
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
    handleRegisterNextStepResolver() {
      // API Engagement - Commande pour compter une création de compte
      try {
        window.apieng && window.apieng('trackAccount', this.$stores.softGate.selectedMission?.id)
      } catch (error) {
        console.error('API ENGAGEMENT - trackAccount', error)
      }

      this.handleNextResolver()
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
      if (['invitations', 'complete-profile'].includes(this.step)) {
        this.$stores.softGate.closeOverlay()
        this.$router.push('/profile/missions')
      } else {
        this.$stores.softGate.closeOverlay()
      }
    },
  },
})
</script>
