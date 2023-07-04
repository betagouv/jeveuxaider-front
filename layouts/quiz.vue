<template>
  <div class="flex flex-col lg:flex-row h-screen bg-white">
    <div
      :class="[
        'hidden lg:block overflow-hidden w-[700px]',
        {'w-[489px]':$store.getters['quiz/step'] === 0 },
        {'w-[700px]':$store.getters['quiz/step'] > 0 }
      ]"
    >
      <img
        :src="`/images/quiz/quiz-step-${$store.getters['quiz/step']}.jpg`"
        :srcset="`/images/quiz/quiz-step-${$store.getters['quiz/step']}@2x.jpg 2x`"
        alt=""
        :class="[
          'object-cover w-[700px] h-full',

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
      <Nuxt class="flex-1 bg-white" />
    </main>
  </div>
</template>

<script>
import QuizSteps from '@/components/quiz/QuizSteps.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  name: 'QuizLayout',
  components: {
    QuizSteps,
    Heading
  }
}
</script>
