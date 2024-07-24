<template>
  <div>
    <QuizSearchBuilderStep0
      v-if="currentStep === 0"
      title="Trouvez en quelques clics votre prochaine mission de bénévolat"
      slogan="Le bénévolat pour la planète 🌱"
      picture="quiz-printemps-pour-la-planete-step-0-min"
      mobile-picture="quiz-printemps-pour-la-planete-step-0-mobile-min"
      missions-count="2 000"
      :logos="logos"
    />
    <QuizSearchBuilderStep1
      v-if="currentStep === 1"
      title="Où souhaitez-vous réaliser votre mission de bénévolat ?"
      picture="quiz-printemps-pour-la-planete-step-1-min"
      :logos="logos"
    />
    <QuizSearchBuilderStep2
      v-if="currentStep === 2"
      title="Précisez où souhaitez-vous réaliser votre mission ?"
      picture="quiz-printemps-pour-la-planete-step-2-min"
      :logos="logos"
    />
    <QuizSearchBuilderStep3
      v-if="currentStep === 3"
      title="Combien de temps pourriez-vous dédier à une mission de bénévolat ?"
      picture="quiz-printemps-pour-la-planete-step-3-min"
      :logos="logos"
    />
    <QuizSearchBuilderStep4
      v-if="currentStep === 4"
      title="Sélectionnez les activités pour lesquelles vous souhaitez aider"
      picture="quiz-printemps-pour-la-planete-step-4-min"
      :logos="logos"
      :selectable-activities-proche-de-chez-moi-ids="[19, 16, 6, 5, 12, 22]"
      :selectable-activities-a-distance-ids="[19, 16, 6, 5, 12, 22]"
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

export default defineNuxtComponent({
  components: {
    QuizSearchBuilderStep0,
    QuizSearchBuilderStep1,
    QuizSearchBuilderStep2,
    QuizSearchBuilderStep3,
    QuizSearchBuilderStep4,
  },
  setup() {
    definePageMeta({
      layout: 'quiz',
    })
  },
  data() {
    return {
      logos: [
        { name: 'quiz-logo-printemps-pour-la-planete.svg', alt: 'Printemps pour la Planète' },
      ],
    }
  },
  computed: {
    currentStep() {
      return this.$route.query?.step ? parseInt(this.$route.query?.step) : 0
    },
  },
  methods: {
    redirect(payload) {
      const utmMedium = useCookie('utm_medium')
      utmMedium.value = this.$route.path

      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.$route.query,
          ...payload,
          domaines: 'Protection de la nature',
          utm_medium: this.$route.path,
        },
      })
    },
  },
})
</script>

<style></style>
