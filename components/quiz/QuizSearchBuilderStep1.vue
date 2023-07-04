<template>
  <div class="px-[64px] py-[48px] lg:px-[80px] lg:py-[56px]">
    <div class="text-[40px] text-black font-bold mb-12 leading-snug">
      Où souhaitez-vous réaliser votre mission de bénévolat ?
    </div>
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
  </div>
</template>

<script>
import QuizOption from '@/components/quiz/QuizOption.vue'
import IconAvatar from '@/static/images/icons/dsfr/avatar.svg?inline'
import IconFrance from '@/static/images/icons/dsfr/france-localization.svg?inline'
import IconMap from '@/static/images/icons/dsfr/map.svg?inline'

export default {
  components: {
    QuizOption,
    IconAvatar,
    IconFrance,
    IconMap
  },
  props: {

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
      this.$store.commit('quiz/nextStep')
    }
  }
}
</script>

<style>

</style>
