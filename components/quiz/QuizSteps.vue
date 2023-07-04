<template>
  <div class="px-16 py-8">
    <div class="flex gap-2 items-center mb-2 text-sm cursor-pointer hover:text-gray-600" @click="onPreviousStepClick">
      <RiArrowLeftLine class="w-4 h-4 fill-current" />
      <span>Étape précédente</span>
    </div>
    <div class="text-[22px] font-bold mb-2">
      {{ title }}
    </div>
    <div class="flex items-center gap-2">
      <div
        v-for="(step, index) in stepsLength"
        :key="index"
        class=""
        :class="[
          'h-[8px] w-[130px]',
          {'bg-[#EEE4D9]': !isStepActive(index)},
          {'bg-jva-blue-500 cursor-pointer': isStepActive(index)}
        ]"
        @click="onStepClick(index)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stepsLength: 4
    }
  },
  computed: {
    title () {
      switch (this.$store.getters['quiz/step']) {
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
    }
  },
  methods: {
    isStepActive (index) {
      return index < this.$store.getters['quiz/step']
    },
    onPreviousStepClick () {
      this.$store.commit('quiz/previousStep')
    },
    onStepClick (index) {
      if (this.isStepActive(index)) {
        this.$store.commit('quiz/setStep', index + 1)
      }
    }
  }
}
</script>
