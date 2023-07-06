<template>
  <div class="flex flex-col lg:flex-row h-screen bg-white lg:min-h-[800px]">
    <div
      :class="[
        'hidden relative lg:block w-[700px]',
        {'w-[489px]':$store.getters['quiz/step'] === 0 },
        {'w-[700px]':$store.getters['quiz/step'] > 0 }
      ]"
    >
      <img
        :src="`/images/quiz/quiz-step-${$store.getters['quiz/step']}.jpg`"
        :srcset="`/images/quiz/quiz-step-${$store.getters['quiz/step']}@2x.jpg 2x`"
        alt=""
        :class="[
          'object-cover w-[700px] h-full ',
        ]"
      >
      <div v-if="$store.getters['quiz/step'] > 0" class="absolute bottom-14 left-14">
        <Heading as="h2" size="alt-lg" color="text-white">
          <span class="block">Liberté<span class="text-jva-orange-300">.</span></span>
          <span class="block">Égalité<span class="text-jva-orange-300">.</span></span>
          <span class="block">Je veux aider<span class="text-jva-orange-300">.</span></span>
        </Heading>
      </div>
    </div>

    <main id="main" class="flex flex-col flex-1">
      <QuizSteps v-if="$store.getters['quiz/step'] > 0" class="bg-[#F9F6F2]" />
      <div class="max-w-4xl flex flex-col flex-1 bg-white">
        <div class="flex flex-col flex-1 px-[32px] py-[24px] lg:px-[80px] lg:py-[56px]">
          <div v-if="slogan" class="text-lg lg:text-xl text-[#ED7A5A] font-bold uppercase mb-4">
            {{ slogan }}
          </div>
          <div class="text-[28px] lg:text-[40px] text-black font-bold mb-8 lg:mb-12 leading-snug">
            {{ title }}
          </div>
          <slot />
        </div>
      </div>
      <slot v-if="$store.getters['quiz/step'] === 0" name="bottom">
        <div class="px-[32px] lg:px-[80px]">
          <picture aria-hidden="true" class="">
            <source
              srcset="
          /images/home/trombi-organisations.webp, /images/home/trombi-organisations@2x.webp 2x,
          /images/home/trombi-organisations.png, /images/home/trombi-organisations@2x.png 2x
        "
              media="(max-width: 640px)"
            >
            <source
              srcset="
          /images/home/trombi-organisations-desktop.webp, /images/home/trombi-organisations-desktop@2x.webp 2x,
          /images/home/trombi-organisations-desktop.png, /images/home/trombi-organisations-desktop@2x.png 2x
        "
              media="(min-width: 640px)"
            >
            <img
              src="/images/home/trombi-organisations.png"
              alt=""
              width="425"
              height="188"
              class="object-cover object-top w-full h-[170px] sm:h-[240px] sm:px-8 md:px-0 max-w-none md:w-[500px] lg:w-[650px] xl:w-[738px] xl:h-[292px]"
            >
          </picture>
        </div>
      </slot>
    </main>
  </div>
</template>

<script>
import QuizSteps from '@/components/quiz/QuizSteps.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    QuizSteps,
    Heading
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
  }
}
</script>

<style>

</style>
