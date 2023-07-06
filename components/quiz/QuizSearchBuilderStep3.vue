<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture">
    <div class="max-w-lg flex flex-col gap-6">
      <QuizOption
        title="Quelques heures"
        description="C’est déjà beaucoup 😇"
        @click.native="onClickOption({
          commitment__total: '<=7',
          duration: 'day',
          time_period: null
        })"
      >
        <template #icon>
          <IconSuccess />
        </template>
      </QuizOption>
      <QuizOption
        title="Quelques jours"
        description="Wahou 👏"
        @click.native="onClickOption({
          commitment__total: '<=35',
          duration: '5_days',
          time_period: null
        })"
      >
        <template #icon>
          <IconCalendar />
        </template>
      </QuizOption>
      <QuizOption
        title="De manière récurrente"
        description="Vous êtes formidable 🤩"
        @click.native="onClickOption({
          commitment__total: '<=84',
          duration: 'day',
          time_period: 'month'
        })"
      >
        <template #icon>
          <IconHealth />
        </template>
      </QuizOption>
    </div>
  </QuizStep>
</template>

<script>
import QuizStep from '@/components/quiz/QuizStep.vue'
import QuizOption from '@/components/quiz/QuizOption.vue'
import IconSuccess from '@/static/images/icons/dsfr/success.svg?inline'
import IconCalendar from '@/static/images/icons/dsfr/calendar.svg?inline'
import IconHealth from '@/static/images/icons/dsfr/health.svg?inline'

export default {
  components: {
    QuizStep,
    QuizOption,
    IconSuccess,
    IconCalendar,
    IconHealth
  },
  props: {
    title: {
      type: String,
      required: true
    },
    slogan: {
      type: String,
      default: null
    },
    picture: {
      type: String,
      required: true
    }
  },
  mounted () {
    // console.log('route', this.$route)
  },
  methods: {
    onClickOption (options) {
      this.$store.commit('quiz/setQuery', {
        ...this.$store.getters['quiz/query'],
        ...options
      })

      window.plausible &&
        window.plausible('Quiz - Step 3', {
          props: {
            isLogged: this.$store.getters.isLogged,
            quizPath: this.$route.path,
            value: options
          }
        })

      this.$store.commit('quiz/nextStep')
    }
  }
}
</script>

<style>

</style>
