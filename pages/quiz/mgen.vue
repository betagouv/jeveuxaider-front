<template>
  <div>
    <QuizSearchBuilderStep0
      v-if="currentStep === 0"
      title="Trouvez en quelques clics votre prochaine mission de bénévolat"
      slogan="Rendons l’éducation accessible à tous"
      picture="quiz-step-0"
      mobile-picture="quiz-step-0-mobile"
      missions-count="3 000"
    />
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
      :selectable-activities-proche-de-chez-moi-ids="[10,17,6,4,39,19,8,15,37,34]"
      :selectable-activities-a-distance-ids="[10,17,6,4,39,19,8,15,37,34]"
      @selected="redirect"
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
  },
  methods: {
    redirect (payload) {
      this.$cookies.set('utm_medium', this.$route.path)

      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.$route.query,
          ...payload,
          tags: 'Septembre pour Apprendre',
          utm_medium: this.$route.path
        }
      })
    }
  }
}
</script>

<style>

</style>
