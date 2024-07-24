<template>
  <div class="px-8 py-4 lg:px-16 lg:py-8">
    <div
      class="flex gap-2 items-center mb-2 text-sm cursor-pointer hover:text-gray-600"
      @click="onPreviousStepClick"
    >
      <RiArrowLeftLine class="w-4 h-4 fill-current" />
      <span>Étape précédente</span>
    </div>
    <div class="text-lg lg-text-[22px] font-bold mb-2">
      {{ title }}
    </div>
    <div class="flex items-center gap-2">
      <div
        v-for="(step, index) in stepsLength"
        :key="index"
        :class="[
          'h-[8px] w-[130px]',
          { 'bg-[#EEE4D9]': !isStepActive(index) },
          { 'bg-jva-blue-500': isStepActive(index) },
        ]"
      />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      stepsLength: 4,
    }
  },
  computed: {
    currentStep() {
      return this.$route.query?.step ? parseInt(this.$route.query?.step) : 0
    },
    title() {
      switch (this.currentStep) {
        case 1:
          return 'Type de mission'
        case 2:
          return 'Lieu de la mission'
        case 3:
          return 'Disponibilités'
        case 4:
          return 'Activités'
        default:
          return ''
      }
    },
  },
  methods: {
    isStepActive(index) {
      return index < this.currentStep
    },
    onPreviousStepClick() {
      this.$router.back()
      // if (this.currentStep === 3 && this.$route.query?.type !== 'Mission en présentiel') {
      //   this.$router.push({ query: { ...this.$route.query, step: 1 } })
      // } else {
      //   this.$router.push({ query: { ...this.$route.query, step: this.currentStep - 1 } })
      // }
    },
    onStepClick(index) {
      if (this.isStepActive(index)) {
        this.$router.push({ query: { ...this.$route.query, step: index + 1 } })
      }
    },
  },
})
</script>
