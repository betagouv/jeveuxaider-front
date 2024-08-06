<script>
export default defineNuxtComponent({
  emits: ['close'],
  props: {
    isOpen: { type: Boolean, default: false },
  },
  setup() {
    const {
      profile,
      totalPoints,
      isContactInformationsCompleted,
      isDisponibilitiesCompleted,
      isPreferencesCompleted,
      isMotMotivationCompleted,
      isProfilePictureCompleted,
      isSkillsAndCertificationsCompleted,
      isMissionTypeCompleted,
      isActivitiesCompleted,
    } = useProfileCompletion()

    const steps = []
    if (!isDisponibilitiesCompleted.value) {
      steps.push('disponibilities')
    }
    if (!isMissionTypeCompleted.value) {
      steps.push('missionType')
    }
    if (!isActivitiesCompleted.value) {
      steps.push('activities')
    }
    if (!!profile.value.type || !isMotMotivationCompleted.value) {
      steps.push('stepSelection')
      steps.push('moreAboutYou')
    }
    if (!isSkillsAndCertificationsCompleted.value) {
      if (!steps.includes('stepSelection')) {
        steps.push('stepSelection')
      }
      steps.push('skillsAndCertifications')
    }
    if (!isProfilePictureCompleted.value) {
      if (!steps.includes('stepSelection')) {
        steps.push('stepSelection')
      }
      steps.push('picture')
    }
    steps.push('communicationPreferences')

    return {
      steps,
      totalPoints,
    }
  },
  data() {
    return {
      loading: false,
      currentStep: this.steps?.[0],
    }
  },
  computed: {
    currentStepIndex() {
      return this.steps.findIndex((s) => s === this.currentStep)
    },
  },
  methods: {
    async handleValidation() {
      if (this.loading) {
        return
      }
      await this.$refs.form.handleValidation()
    },
    async handleSubmit(payload) {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$stores.auth.updateProfile({
        id: this.$stores.auth.profile?.id,
        ...payload,
      })
      this.goToNextStep()
      this.loading = false
    },
    goToNextStep() {
      this.currentStep = this.steps[this.currentStepIndex + 1]
      this.scrollToTop()
    },
    goToPreviousStep() {
      this.currentStep = this.steps[this.currentStepIndex - 1]
      this.scrollToTop()
    },
    scrollToTop() {
      if (this.$refs.modal?.$refs.scrollContainer) {
        this.$refs.modal.$refs.scrollContainer.scrollTop = 0
      }
    },
  },
})
</script>

<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <BaseModal
          ref="modal"
          :is-open="isOpen"
          :prevent-click-outside="true"
          :sticky-header="true"
          :sticky-footer="true"
          container-class="sm:max-h-[calc(100svh_-_8rem)]"
          scroll-container-class="h-[100svh] flex-grow sm:h-[initial]"
          @close="$emit('close')"
        >
          <template #overlay>
            <div class="fixed inset-0 bg-jva-blue-500/95">
              <!-- OVERLAY CLOSE - DESKTOP -->
              <button
                class="hidden sm:flex items-center absolute right-8 top-6 pl-2 pr-1 py-1 transition ease-out hover:bg-jva-blue-300/50"
                @click="$emit('close')"
              >
                <span class="text-white mr-1">Fermer</span>
                <RiCloseFill
                  class="text-white h-6 w-6 fill-current relative top-[1px] right-[0px]"
                />
              </button>
            </div>
          </template>

          <template #header>
            <div class="shadow-[0px_3px_10px_0px_#00000014] bg-white">
              <!-- HEADER - MOBILE -->
              <div class="sm:hidden p-2 flex items-center justify-between">
                <DsfrHeading class="text-[#666666]" size="xs">{{ totalPoints }}%</DsfrHeading>
                <DsfrButton
                  type="tertiary"
                  :icon-only="true"
                  icon="RiCloseFill"
                  size="lg"
                  class="size-12"
                  @click="$emit('close')"
                />
              </div>

              <!-- HEADER - DESKTOP -->
              <div class="hidden sm:block p-6 relative">
                <DsfrHeading class="text-center" size="xs">Complétez votre profil</DsfrHeading>
                <DsfrHeading class="text-[#666666] absolute right-6 top-6" size="xs"
                  >{{ totalPoints }}%</DsfrHeading
                >
              </div>

              <!-- GAUGE -->
              <BaseGauge :percentage="totalPoints" color="gradient" size="lg" />
            </div>
          </template>

          <template #footer>
            <template v-if="currentStep === 'moreAboutYou'">
              <!-- TODO -->
              <DsfrButton
                type="secondary"
                class="flex-grow"
                :disabled="currentStep === steps[0]"
                @click="goToPreviousStep"
                >Précédent</DsfrButton
              >
              <DsfrButton
                :loading="loading"
                type="primary"
                class="flex-grow"
                @click="handleValidation"
                >Suivant</DsfrButton
              >
            </template>

            <template v-else>
              <DsfrButton
                type="secondary"
                class="flex-grow"
                :disabled="currentStep === steps[0]"
                @click="goToPreviousStep"
                >Précédent</DsfrButton
              >
              <DsfrButton
                :loading="loading"
                type="primary"
                class="flex-grow"
                @click="handleValidation"
                >Suivant</DsfrButton
              >
            </template>
          </template>

          <!-- CONTENT -->
          <div class="sm:px-4 sm:py-8">
            <div
              :class="[
                '@container mx-auto initial:max-w-[585px]',
                { 'max-w-full': currentStep === 'activities' },
              ]"
            >
              <SectionProfileOverlayCompletionDisponibilities
                v-if="currentStep === 'disponibilities'"
                ref="form"
                @submit="handleSubmit($event)"
              />

              <SectionProfileOverlayCompletionMissionType
                v-else-if="currentStep === 'missionType'"
                ref="form"
                @submit="handleSubmit($event)"
              />

              <SectionProfileOverlayCompletionActivities
                v-else-if="currentStep === 'activities'"
                ref="form"
                @submit="handleSubmit($event)"
              />

              <SectionProfileOverlayCompletionStepSelection
                v-else-if="currentStep === 'stepSelection'"
                @update="currentStep = $event"
              />

              <SectionProfileOverlayCompletionMoreAboutYou
                v-else-if="currentStep === 'moreAboutYou'"
                ref="form"
                @submit="handleSubmit($event)"
              />
            </div>
          </div>
        </BaseModal>
      </transition>
    </Teleport>
  </ClientOnly>
</template>
