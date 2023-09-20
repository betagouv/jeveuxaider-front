<template>
  <div>
    <QuizSearchBuilderStep0
      v-if="currentStep === 0"
      title="Trouvez en quelques clics votre prochaine mission de bénévolat"
      slogan="Le bénévolat et vous"
      picture="quiz-step-0-min"
      mobile-picture="quiz-step-0-mobile-min"
      missions-count="15 000"
    >
      <template #bottom>
        <div class="hidden lg:block px-[32px] lg:px-[80px]">
          <picture aria-hidden="true">
            <source
              srcset="
                /images/home/trombi-organisations.webp,
                /images/home/trombi-organisations@2x.webp 2x,
                /images/home/trombi-organisations.png,
                /images/home/trombi-organisations@2x.png  2x
              "
              media="(max-width: 640px)"
            />
            <source
              srcset="
                /images/home/trombi-organisations-desktop.webp,
                /images/home/trombi-organisations-desktop@2x.webp 2x,
                /images/home/trombi-organisations-desktop.png,
                /images/home/trombi-organisations-desktop@2x.png  2x
              "
              media="(min-width: 640px)"
            />
            <img
              src="/images/home/trombi-organisations.png"
              alt=""
              width="425"
              height="188"
              class="object-cover object-top w-full h-[170px] sm:h-[240px] sm:px-8 md:px-0 max-w-none md:w-[500px] lg:w-[650px] xl:w-[738px] xl:h-[292px]"
            />
          </picture>
        </div>
      </template>
    </QuizSearchBuilderStep0>
    <QuizSearchBuilderStep1
      v-if="currentStep === 1"
      title="Où souhaitez-vous réaliser votre mission de bénévolat ?"
      picture="quiz-step-1-min"
    />
    <QuizSearchBuilderStep2
      v-if="currentStep === 2"
      title="Précisez où souhaitez-vous réaliser votre mission ?"
      picture="quiz-step-2-min"
    />
    <QuizSearchBuilderStep3
      v-if="currentStep === 3"
      title="Combien de temps pourriez-vous dédier à une mission de bénévolat ?"
      picture="quiz-step-3-min"
    />
    <QuizSearchBuilderStep4
      v-if="currentStep === 4"
      title="Sélectionnez les activités pour lesquelles vous souhaitez aider"
      picture="quiz-step-4-min"
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
          utm_medium: this.$route.path,
        },
      })
    },
  },
})
</script>

<style></style>
