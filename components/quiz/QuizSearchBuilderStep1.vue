<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture">
    <div class="max-w-lg flex flex-col gap-6">
      <QuizOption
        title="Près de chez moi"
        description="Sur le terrain, proche de chez vous"
        :selected="$route.query?.type === 'Mission en présentiel'"
        @click.native="onClickOption('Mission en présentiel')"
      >
        <template #icon>
          <IconMap />
        </template>
      </QuizOption>
      <QuizOption
        title="Depuis chez moi"
        description="De votre côté en toute autonomie"
        :selected="$route.query?.type === 'Mission à distance'"
        @click.native="onClickOption('Mission à distance')"
      >
        <template #icon>
          <IconAvatar />
        </template>
      </QuizOption>
      <QuizOption
        title="Peu importe"
        description="En présentiel ou en télébénévolat"
        :selected="$route.query?.type === null"
        @click.native="onClickOption(null)"
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
    },
    picture: {
      type: String,
      required: true
    }
  },
  methods: {
    onClickOption (value) {
      this.$plausible.trackEvent('Quiz - Step 1', {
        props: {
          isLogged: this.$store.getters.isLogged,
          quizPath: this.$route.path,
          value
        }
      })

      if (value === 'Mission en présentiel') {
        this.$router.push({ query: { ...this.$route.query, step: 2, type: value } })
      } else {
        this.$router.push({ query: { ...this.$route.query, step: 3, type: value } })
      }
    }
  }
}
</script>

<style>

</style>
