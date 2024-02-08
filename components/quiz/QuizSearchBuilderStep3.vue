<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture" :logos="logos">
    <div class="max-w-lg flex flex-col gap-6">
      <QuizOption
        title="Quelques heures"
        description="C’est déjà beaucoup 😇"
        :selected="$route.query?.commitment === 'few_hours'"
        @click.native="
          onClickOption({
            commitment: 'few_hours',
          })
        "
      >
        <template #icon>
          <DsfrCheckIcon class="w-[56px] h-[56px]" />
        </template>
      </QuizOption>
      <QuizOption
        title="Quelques jours"
        description="Wahou 👏"
        :selected="$route.query?.commitment === 'few_days'"
        @click.native="
          onClickOption({
            commitment: 'few_days',
          })
        "
      >
        <template #icon>
          <DsfrCalendarIcon class="w-[56px] h-[56px]" />
        </template>
      </QuizOption>
      <QuizOption
        title="De manière récurrente"
        description="Vous êtes formidable 🤩"
        :selected="
          $route.query?.commitment ===
          'few_hours_a_week|few_hours_a_month|few_days_a_week|few_days_a_month'
        "
        @click.native="
          onClickOption({
            commitment: 'few_hours_a_week|few_hours_a_month|few_days_a_week|few_days_a_month',
          })
        "
      >
        <template #icon>
          <DsfrHealthIcon class="w-[56px] h-[56px]" />
        </template>
      </QuizOption>
      <QuizOption
        title="Peu importe"
        description="Cela dépend de la mission 🤗"
        :selected="$route.query?.commitment === null"
        @click.native="
          onClickOption({
            commitment: null,
          })
        "
      >
        <template #icon>
          <DsfrPeuImporteIcon class="w-[56px] h-[56px]" />
        </template>
      </QuizOption>
    </div>
  </QuizStep>
</template>

<script>
import QuizStep from '@/components/quiz/QuizStep.vue'
import QuizOption from '@/components/quiz/QuizOption.vue'
import DsfrCalendarIcon from '@/components/icon/dsfr/Calendar.vue'
import DsfrCheckIcon from '@/components/icon/dsfr/Check.vue'
import DsfrHealthIcon from '@/components/icon/dsfr/Health.vue'
import DsfrPeuImporteIcon from '@/components/icon/dsfr/PeuImporte.vue'

export default defineNuxtComponent({
  components: {
    QuizStep,
    QuizOption,
    DsfrCheckIcon,
    DsfrCalendarIcon,
    DsfrHealthIcon,
    DsfrPeuImporteIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    slogan: {
      type: String,
      default: null,
    },
    picture: {
      type: String,
      required: true,
    },
    logos: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    onClickOption(options) {
      this.$plausible.trackEvent('Quiz - Step 3', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          quizPath: this.$route.path,
          value: options.commitment,
        },
      })

      this.$router.push({
        query: { ...this.$route.query, step: 4, ...options },
      })
    },
  },
})
</script>
