<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture">
    <div class="max-w-lg flex flex-col gap-6">
      <QuizOption
        title="Quelques heures"
        description="C’est déjà beaucoup 😇"
        :selected="$route.query?.commitment__total === '<=7'"
        @click.native="onClickOption({
          commitment__total: '<=7',
          duration: 'day',
          time_period: null
        })"
      >
        <template #icon>
          <IconSuccess class="w-[56px] h-[56px]" />
        </template>
      </QuizOption>
      <QuizOption
        title="Quelques jours"
        description="Wahou 👏"
        :selected="$route.query?.commitment__total === '<=35'"
        @click.native="onClickOption({
          commitment__total: '<=35',
          duration: '5_days',
          time_period: null
        })"
      >
        <template #icon>
          <IconCalendar class="w-[56px] h-[56px]" />
        </template>
      </QuizOption>
      <QuizOption
        title="De manière récurrente"
        description="Vous êtes formidable 🤩"
        :selected="$route.query?.commitment__total === '<=84'"
        @click.native="onClickOption({
          commitment__total: '<=364',
          duration: 'day',
          time_period: 'week'
        })"
      >
        <template #icon>
          <IconHealth class="w-[56px] h-[56px]" />
        </template>
      </QuizOption>
      <QuizOption
        title="Peu importe"
        description="Cela dépend de la mission 🤗"
        :selected="$route.query?.commitment__total === null"
        @click.native="onClickOption({
          commitment__total: null,
          duration: null,
          time_period: null
        })"
      >
        <template #icon>
          <IconPeuImporte class="w-[56px] h-[56px]" />
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
import IconPeuImporte from '@/static/images/icons/dsfr/peu_importe.svg?inline'

export default {
  components: {
    QuizStep,
    QuizOption,
    IconSuccess,
    IconCalendar,
    IconHealth,
    IconPeuImporte
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
  methods: {
    onClickOption (options) {
      this.$plausible.trackEvent('Quiz - Step 3', {
        props: {
          isLogged: this.$store.getters.isLogged,
          quizPath: this.$route.path,
          value: options.commitment__total
        }
      })

      this.$router.push({ query: { ...this.$route.query, step: 4, ...options } })
    }
  }
}
</script>

<style>

</style>
