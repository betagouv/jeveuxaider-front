<template>
  <BaseBox>
    <BaseHeading as="h2" :level="3" class="text-black"> {{ title }} </BaseHeading>
    <slot name="subtitle" />
    <div class="">
      <div class="flex items-center gap-6 my-8">
        <div class="text-[22px] text-[#161616] font-bold">{{ totalPoints }}%</div>
        <BaseGauge
          :percentage="totalPoints"
          color="gradient"
          size="xl"
          class="rounded-full overflow-hidden"
        />
      </div>
      <div v-if="showSteps && totalPoints < 100" class="flex flex-col gap-6 pt-6">
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
      <slot name="footer" />
    </div>
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
    }
  },
  watch: {
    totalPoints(newValue, oldValue) {
      if (oldValue < 100 && newValue === 100) {
        confetti({
          particleCount: 500,
          spread: 360,
          // origin: { y: 0.6 },
        })
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
      return this.profile?.activities?.length > 0
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
  },
  methods: {},
})
</script>
