<template>
  <div class="max-w-4xl flex-1">
    <QuizSearchBuilderStep0 v-if="step === 0" />
    <QuizSearchBuilderStep1 v-if="step === 1" />
    <QuizSearchBuilderStep2 v-if="step === 2" />
    <QuizSearchBuilderStep3 v-if="step === 3" />
    <QuizSearchBuilderStep4 v-if="step === 4" />
  </div>
</template>

<script>
import QuizSearchBuilderStep0 from '@/components/quiz/QuizSearchBuilderStep0.vue'
import QuizSearchBuilderStep1 from '@/components/quiz/QuizSearchBuilderStep1.vue'
import QuizSearchBuilderStep2 from '@/components/quiz/QuizSearchBuilderStep2.vue'
import QuizSearchBuilderStep3 from '@/components/quiz/QuizSearchBuilderStep3.vue'
import QuizSearchBuilderStep4 from '@/components/quiz/QuizSearchBuilderStep4.vue'

export default {
  components: {
    QuizSearchBuilderStep0,
    QuizSearchBuilderStep1,
    QuizSearchBuilderStep2,
    QuizSearchBuilderStep3,
    QuizSearchBuilderStep4
  },
  layout: 'quiz',
  computed: {
    step () {
      return this.$store.getters['quiz/step']
    }
  },
  mounted () {
    // plausible tracking
  }
}
</script>

<style>

</style>
