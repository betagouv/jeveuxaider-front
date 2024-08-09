<script>
export default defineNuxtComponent({
  setup() {
    const { initialForm } = useProfileValidation()
    const { isMotMotivationCompleted, isSkillCompleted, isProfilePictureCompleted } =
      useProfileCompletion()

    return {
      initialForm,
      isMotMotivationCompleted,
      isSkillCompleted,
      isProfilePictureCompleted,
    }
  },
  data() {
    return {
      currentStep: null,
      steps: [
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
          description: [
            'À définir',
            this.$filters.pluralize(this.initialForm.skills.length, 'compétence'),
          ],
          icon: '🧰',
          isCompleted: this.isSkillCompleted,
        },
        {
          step: 'picture',
          title: 'Une photo',
          description: ['À définir', 'Wahou !'],
          icon: '📸',
          isCompleted: this.isProfilePictureCompleted,
        },
      ],
    }
  },
  mounted() {
    if (this.$stores.auth.profile.avatar) {
      this.$stores.profileOverlayCompletion.avatar = this.$stores.auth.profile.avatar
    }
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
