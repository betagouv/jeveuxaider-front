<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture" :mobile-picture="mobilePicture">
    <div class="flex flex-col lg:flex-row lg:items-center gap-8">
      <div>
        <Button
          size="lg"
          icon="RiArrowRightLine"
          icon-position="right"
          class=""
          @click.native="onNextStep"
        >
          {{ buttonLabel }}
        </Button>
      </div>
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
    mobilePicture: {
      type: String,
      required: true
    },
    buttonLabel: {
      type: String,
      default: 'Suivez le guide'
    }
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

      this.$router.push({ query: { ...this.$route.query, step: 1 } })
    }
  }
}
</script>

<style>

</style>
