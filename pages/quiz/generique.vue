<template>
  <div>
    <QuizSearchBuilderStep0
      v-if="currentStep === 0"
      title="Trouvez en quelques clics votre prochaine mission de bénévolat"
      slogan="Le bénévolat et vous"
      picture="quiz-step-0"
      mobile-picture="quiz-step-0-mobile"
    >
      <template #button-right>
        <div class="text-[#666666] text-xl">
          Plus de <span class="font-bold">15 000 missions disponibles</span>
        </div>
      </template>
    </QuizSearchBuilderStep0>
    <QuizSearchBuilderStep1
      v-if="currentStep === 1"
      title="Où souhaitez-vous réaliser votre mission de bénévolat ?"
      picture="quiz-step-1"
    />
    <QuizSearchBuilderStep2
      v-if="currentStep === 2"
      title="Précisez où souhaitez-vous réaliser votre mission ?"
      picture="quiz-step-2"
    />
    <QuizSearchBuilderStep3
      v-if="currentStep === 3"
      title="Combien de temps pourriez-vous dédier à une mission de bénévolat ?"
      picture="quiz-step-3"
    />
    <QuizSearchBuilderStep4
      v-if="currentStep === 4"
      title="Sélectionnez les activités pour lesquelles vous souhaitez aider"
      picture="quiz-step-4"
    />
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
    currentStep () {
      return this.$route.query?.step ? parseInt(this.$route.query?.step) : 0
    }
  }
}
</script>

<style>

</style>
