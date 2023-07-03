<template>
  <div class="p-[85px] max-w-4xl">
    <QuizSearchBuilderStep0 v-if="$store.getters['quiz/step'] === 0" />
    <QuizSearchBuilderStep1 v-if="$store.getters['quiz/step'] === 1" />
    <QuizSearchBuilderStep2 v-if="$store.getters['quiz/step'] === 2" />
    <QuizSearchBuilderStep3 v-if="$store.getters['quiz/step'] === 3" />
    <QuizSearchBuilderStep4 v-if="$store.getters['quiz/step'] === 4" />
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
  mounted () {
    // plausible tracking
  }
}
</script>

<style>

</style>
