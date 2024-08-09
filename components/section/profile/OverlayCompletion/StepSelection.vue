<script>
export default defineNuxtComponent({
  emits: ['update'],
  setup() {
    const { initialForm } = useProfileValidation()
    const {
      isMotMotivationCompleted,
      isSkillsOrCertificationsCompleted,
      isProfilePictureCompleted,
    } = useProfileCompletion()

    return {
      initialForm,
      isMotMotivationCompleted,
      isSkillsOrCertificationsCompleted,
      isProfilePictureCompleted,
    }
  },
  data() {
    return {
      currentStep: null,
    }
  },
  mounted() {
    // @todo: directly in store
    this.$stores.profileOverlayCompletion.avatar = this.$stores.auth.profile.avatar ?? null
  },
  computed: {
    steps() {
      return [
        {
          step: 'moreAboutYou',
          title: 'Dites-en un peu plus sur vous',
          description: ['À définir', 'Enchanté :)'],
          icon: '🐣',
          isCompleted: !!this.initialForm.type && this.isMotMotivationCompleted,
        },
        {
          step: 'skills',
          title: 'Vos compétences',
          description: ['À définir', this.skillsStepTitle],
          icon: '🧰',
          isCompleted: this.isSkillsOrCertificationsCompleted,
        },
        {
          step: 'picture',
          title: 'Une photo',
          description: ['À définir', 'Wahou !'],
          icon: '📸',
          isCompleted: this.isProfilePictureCompleted,
        },
      ]
    },
    skillsStepTitle() {
      const data = []
      if (this.initialForm.skills.length > 0) {
        data.push(this.$filters.pluralize(this.initialForm.skills.length, 'compétence'))
      }
      if (this.initialForm.certifications.length > 0) {
        data.push(this.$filters.pluralize(this.initialForm.certifications.length, 'certification'))
      }
      return data.join(', ')
    },
  },
  methods: {
    handleClick(item) {
      this.$emit('update', item.step)
      this.scrollToTop()
    },
    scrollToTop() {
      if (this.$stores.profileOverlayCompletion.scrollContainer) {
        this.$stores.profileOverlayCompletion.scrollContainer.scrollTop = 0
      }
    },
    onUploadAdd(files) {
      this.$stores.profileOverlayCompletion.avatar = {
        file: files[0],
        name: files[0].name,
      }
      this.$refs.uploadTrigger.$el.click()
    },
  },
})
</script>

<template>
  <div>
    <DsfrHeading size="lg" class="text-center">À propos de vous</DsfrHeading>

    <p class="mt-4 text-center text-pretty max-w-[500px] mx-auto">
      En complétant ces informations, vous augmentez vos chances de trouver une mission qui vous
      correspond.
    </p>

    <div
      class="flex flex-col items-center justify-center mt-8 gap-4 max-w-[494px] mx-auto"
      role="menu"
    >
      <SectionProfileOverlayCompletionSubstep
        v-for="item in steps.filter((item) => item.step !== 'picture')"
        :key="item.step"
        :item="item"
        @click="handleClick(item)"
      />

      <BaseUpload
        :show-files="false"
        extensions=".jpg, .jpeg, .png, .webp"
        @add="onUploadAdd"
        class="self-stretch"
      >
        <template #trigger="{ onClick }">
          <SectionProfileOverlayCompletionSubstep
            ref="uploadTrigger"
            :item="steps.find((item) => item.step === 'picture')"
            @click="
              () => {
                !!$stores.profileOverlayCompletion.avatar
                  ? handleClick(steps.find((item) => item.step === 'picture'))
                  : onClick()
              }
            "
            class="w-full"
          />
        </template>
      </BaseUpload>
    </div>
  </div>
</template>
