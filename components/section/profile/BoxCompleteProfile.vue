<template>
  <BaseBox v-if="showBox">
    <div ref="boxProfileCompletion">
      <BaseHeading as="h2" :level="3" class="text-black">
        <div :class="['relative text-balance', { 'min-h-[66px]': totalToShow === 100 }]">
          <div
            :class="[
              'transition duration-300',
              totalToShow === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100',
            ]"
          >
            {{ title }}
          </div>
          <div
            :class="[
              'transition duration-300 delay-300 absolute inset-0',
              totalToShow === 100 ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ]"
          >
            {{ titleToShow }}
          </div>
        </div>
      </BaseHeading>

      <template v-if="totalToShow !== 100">
        <slot name="subtitle" />
      </template>

      <div class="flex items-center gap-6 mt-8">
        <div class="text-[22px] text-[#161616] font-bold">{{ totalToShow }}%</div>
        <BaseGauge
          :percentage="totalToShow"
          color="gradient"
          size="xl"
          class="rounded-full overflow-hidden"
        />
      </div>
    </div>

    <div v-if="showSteps && totalPoints < 100" class="flex flex-col gap-6 pt-8">
      <CustomTodoListItem :isCompleted="isContactInformationsCompleted">
        Remplissez vos informations de contact
      </CustomTodoListItem>
      <hr class="border-[#DDDDDD]" />
      <CustomTodoListItem :isCompleted="isDisponibilitiesCompleted">
        Définissez votre disponibilité
      </CustomTodoListItem>
      <hr class="border-[#DDDDDD]" />
      <CustomTodoListItem :isCompleted="isPreferencesCompleted">
        Définissez vos préférences de mission
      </CustomTodoListItem>
      <hr class="border-[#DDDDDD]" />
      <CustomTodoListItem :isCompleted="isMotMotivationCompleted">
        Écrivez un petit mot de motivation
      </CustomTodoListItem>
      <hr class="border-[#DDDDDD]" />
      <CustomTodoListItem :isCompleted="isProfilePictureCompleted">
        Ajoutez une photo
      </CustomTodoListItem>
      <hr class="border-[#DDDDDD]" />
      <CustomTodoListItem :isCompleted="isSkillsAndCertificationsCompleted">
        Indiquez vos compétences et certifications
      </CustomTodoListItem>
    </div>

    <template v-if="totalToShow !== 100">
      <slot name="footer" />
    </template>
  </BaseBox>
</template>

<script>
import confetti from 'canvas-confetti'

export default defineNuxtComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    showSteps: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      fakeTotal: null,
      showBox: true,
    }
  },
  created() {
    if (this.totalPoints === 100) {
      this.showBox = false
    }
  },
  watch: {
    async totalPoints(newValue, oldValue) {
      if (oldValue < 100 && newValue === 100) {
        this.fakeTotal = oldValue
        const el = this.$refs.boxProfileCompletion

        if (this.$utils.isElementInViewport(el)) {
          this.onProfileCompletion()
        } else {
          await this.$scrollTo(el, 300, {
            offset: -150,
            cancelable: false,
            onDone: async (element) => {
              this.onProfileCompletion()
            },
          })
        }
      } else if (oldValue === 100 && newValue < 100) {
        this.showBox = true
      }
    },
  },
  computed: {
    profile() {
      return this.$stores.auth?.user?.profile
    },
    totalPoints() {
      let points = 0
      if (!!this.profile?.first_name) points += 5
      if (!!this.profile?.last_name) points += 5
      if (!!this.profile?.birthday) points += 10
      if (!!this.profile?.zip) points += 10
      if (!!this.profile?.type) points += 5
      if (!!this.profile?.description) points += 5
      if (!!this.profile?.avatar) points += 5
      if (!!this.profile?.type_missions) points += 10
      if (this.isDisponibilitiesCompleted) points += 15
      if (this.isPreferencesCompleted) points += 20
      if (this.isSkillsAndCertificationsCompleted) points += 10
      return points
    },
    isContactInformationsCompleted() {
      return (
        !!this.profile?.email &&
        !!this.profile?.mobile &&
        !!this.profile?.type &&
        !!this.profile?.birthday &&
        !!this.profile?.zip
      )
    },
    isDisponibilitiesCompleted() {
      return !!this.profile?.commitment__duration && this.profile?.disponibilities?.length > 0
    },
    isPreferencesCompleted() {
      return this.profile?.activities?.length > 0 && !!this.profile?.type_missions
    },
    isMotMotivationCompleted() {
      return !!this.profile?.description
    },
    isProfilePictureCompleted() {
      return !!this.profile?.avatar
    },
    isSkillsAndCertificationsCompleted() {
      return this.profile?.skills?.length > 0 || this.profile?.certifications?.length > 0
    },
    totalToShow() {
      return this.totalPoints === 100 && this.totalPoints !== this.fakeTotal
        ? this.fakeTotal
        : this.totalPoints
    },
    titleToShow() {
      return this.totalToShow === 100 ? 'Bravo ! Vous avez complété votre profil 🎉' : this.title
    },
  },
  methods: {
    async onProfileCompletion() {
      await new Promise((resolve) => setTimeout(resolve, 150))
      this.fakeTotal = 100
      await new Promise((resolve) => setTimeout(resolve, 600))

      confetti({
        particleCount: 500,
        spread: 360,
        // origin: { x: 0.9, y: 0.1 },
      })
    },
  },
})
</script>
