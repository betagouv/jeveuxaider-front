<template>
  <QuizStep :title="title" :slogan="slogan" :picture="picture" :logos="logos">
    <div class="max-w-lg flex flex-col gap-6">
      <QuizOption
        title="Près de chez moi"
        description="Sur le terrain, proche de chez vous"
        :selected="$route.query?.type === 'Mission en présentiel'"
        @click.native="onClickOption('Mission en présentiel')"
      >
        <template #icon>
          <DsfrMapIcon />
        </template>
      </QuizOption>
      <QuizOption
        title="Depuis chez moi"
        description="De votre côté en toute autonomie"
        :selected="$route.query?.type === 'Mission à distance'"
        @click.native="onClickOption('Mission à distance')"
      >
        <template #icon>
          <DsfrAvatarIcon />
        </template>
      </QuizOption>
      <QuizOption
        title="Peu importe"
        description="En présentiel ou en télébénévolat"
        :selected="$route.query?.type === null"
        @click.native="onClickOption(null)"
      >
        <template #icon>
          <DsfrFranceIcon />
        </template>
      </QuizOption>
    </div>
  </QuizStep>
</template>

<script>
import QuizStep from '@/components/quiz/QuizStep.vue'
import QuizOption from '@/components/quiz/QuizOption.vue'
import DsfrAvatarIcon from '@/components/icon/dsfr/Avatar.vue'
import DsfrFranceIcon from '@/components/icon/dsfr/France.vue'
import DsfrMapIcon from '@/components/icon/dsfr/Map.vue'

export default defineNuxtComponent({
  components: {
    QuizStep,
    QuizOption,
    DsfrAvatarIcon,
    DsfrFranceIcon,
    DsfrMapIcon,
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
    onClickOption(value) {
      this.$plausible.trackEvent('Quiz - Step 1', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          quizPath: this.$route.path,
          value,
        },
      })

      if (value === 'Mission en présentiel') {
        this.$router.push({
          query: { ...this.$route.query, step: 2, type: value },
        })
      } else {
        this.$router.push({
          query: { ...this.$route.query, step: 3, type: value },
        })
      }
    },
  },
})
</script>
