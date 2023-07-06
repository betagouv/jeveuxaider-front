<template>
  <QuizStep :title="title" :slogan="slogan">
    <div class="max-w-lg flex flex-col gap-6">
      <QuizOption
        title="Près de chez moi"
        description="Sur le terrain, proche de chez vous"
        @click.native="onClickOption('Mission en présentiel')"
      >
        <template #icon>
          <IconMap />
        </template>
      </QuizOption>
      <QuizOption
        title="Depuis chez moi"
        description="De votre côté en toute autonomie"
        @click.native="onClickOption('Mission à distance')"
      >
        <template #icon>
          <IconAvatar />
        </template>
      </QuizOption>
      <QuizOption
        title="Peu importe"
        description="En présentiel ou en télébénévolat"
        @click.native="onClickOption('')"
      >
        <template #icon>
          <IconFrance />
        </template>
      </QuizOption>
    </div>
  </QuizStep>
</template>

<script>
import QuizStep from '@/components/quiz/QuizStep.vue'
import QuizOption from '@/components/quiz/QuizOption.vue'
import IconAvatar from '@/static/images/icons/dsfr/avatar.svg?inline'
import IconFrance from '@/static/images/icons/dsfr/france-localization.svg?inline'
import IconMap from '@/static/images/icons/dsfr/map.svg?inline'

export default {
  components: {
    QuizStep,
    QuizOption,
    IconAvatar,
    IconFrance,
    IconMap
  },
  props: {
    title: {
      type: String,
      required: true
    },
    slogan: {
      type: String,
      default: null
    }
  },
  created () {
    // console.log('route', this.$route)
  },
  methods: {
    onClickOption (value) {
      this.$store.commit('quiz/setQuery', {
        ...this.$store.getters['quiz/query'],
        type: value
      })

      window.plausible &&
        window.plausible('Quiz - Step 1', {
          props: {
            isLogged: this.$store.getters.isLogged,
            quizPath: this.$route.path,
            value
          }
        })

      if (value === 'Mission en présentiel') {
        this.$store.commit('quiz/nextStep')
      } else {
        this.$store.commit('quiz/setStep', 3)
      }
    }
  }
}
</script>

<style>

</style>
