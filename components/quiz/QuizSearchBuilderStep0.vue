<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture">
    <div class="flex flex-col lg:flex-row lg:items-center gap-8">
      <Button
        size="lg"
        icon="RiArrowRightLine"
        icon-position="right"
        @click.native="onNextStep"
      >
        {{ buttonLabel }}
      </Button>
      <slot name="button-right" />
    </div>
    <slot name="bottom" />
  </QuizStep>
</template>

<script>
import QuizStep from '@/components/quiz/QuizStep.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    QuizStep,
    Button
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
    },
    buttonLabel: {
      type: String,
      default: 'Suivez le guide'
    }
  },
  mounted () {
    // console.log('route', this.$route)
  },
  methods: {
    onNextStep () {
      window.plausible &&
        window.plausible('Quiz - Step 0', {
          props: {
            isLogged: this.$store.getters.isLogged,
            quizPath: this.$route.path
          }
        })

      this.$store.commit('quiz/nextStep')
    }
  }
}
</script>

<style>

</style>
