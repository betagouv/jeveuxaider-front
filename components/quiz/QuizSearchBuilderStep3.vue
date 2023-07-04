<template>
  <div class="px-[32px] py-[24px] lg:px-[80px] lg:py-[56px]">
    <div class="text-[28px] lg:text-[40px] text-black font-bold mb-8 lg:mb-12 leading-snug">
      Combien de temps pourriez-vous dédier à une mission de bénévolat ?
    </div>
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
  </div>
</template>

<script>
import QuizOption from '@/components/quiz/QuizOption.vue'
import IconSuccess from '@/static/images/icons/dsfr/success.svg?inline'
import IconCalendar from '@/static/images/icons/dsfr/calendar.svg?inline'
import IconHealth from '@/static/images/icons/dsfr/health.svg?inline'

export default {
  components: {
    QuizOption,
    IconSuccess,
    IconCalendar,
    IconHealth
  },
  props: {

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
      this.$store.commit('quiz/nextStep')
    }
  }
}
</script>

<style>

</style>
