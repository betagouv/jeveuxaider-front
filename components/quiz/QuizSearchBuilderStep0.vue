<template>
  <QuizStep
    :title="title"
    :slogan="slogan"
    :picture="picture"
    :mobile-picture="mobilePicture"
    :logos="logos"
  >
    <div class="flex flex-col lg:flex-row lg:flex-wrap lg:items-center gap-8">
      <div>
        <DsfrButton
          size="lg"
          icon="RiArrowRightLine"
          icon-position="right"
          @click.native="onNextStep"
        >
          {{ buttonLabel }}
        </DsfrButton>
      </div>
      <div class="text-[#666666] text-xl">
        Près de
        <span class="font-bold">{{ missionsCount }} missions disponibles partout en France</span>
      </div>
    </div>
    <template #bottom>
      <slot name="bottom" />
    </template>
  </QuizStep>
</template>

<script>
import QuizStep from '@/components/quiz/QuizStep.vue'

export default defineNuxtComponent({
  components: {
    QuizStep,
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
    mobilePicture: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      default: 'Suivez le guide',
    },
    missionsCount: {
      type: String,
      default: '30 000',
    },
    logos: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    onNextStep() {
      this.$plausible.trackEvent('Quiz - Step 0', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          quizPath: this.$route.path,
        },
      })

      this.$router.push({ query: { ...this.$route.query, step: 1 } })
    },
  },
})
</script>
