<template>
  <div class="flex flex-col lg:flex-row h-screen bg-white lg:min-h-[895px]">
    <div
      :class="[
        'hidden relative lg:block',
        {'w-[489px]':currentStep === 0 },
        {'w-[600px]':currentStep > 0 }
      ]"
    >
      <img
        :src="`/images/quiz/${picture}.jpg`"
        :srcset="`/images/quiz/${picture}@2x.jpg 2x`"
        alt=""
        :class="[
          'object-cover w-[600px] h-full ',
        ]"
      >
      <div v-if="currentStep > 0" class="h-screen absolute top-0 left-0 w-full">
        <div class="flex flex-col justify-end h-screen p-14">
          <Heading as="h2" size="alt-lg" color="text-white">
            <span class="block">Liberté<span class="text-jva-orange-300">.</span></span>
            <span class="block">Égalité<span class="text-jva-orange-300">.</span></span>
            <span class="block">Je veux aider<span class="text-jva-orange-300">.</span></span>
          </Heading>
        </div>
      </div>
    </div>

    <main id="main" class="flex flex-col flex-1">
      <template v-if="currentStep === 0">
        <div
          class="flex justify-start items-center relative px-6 py-4 lg:p-6 h-[94px] lg:h-[116px] border-b"
        >
          <div class="flex space-x-12 items-center">
            <img
              src="@/assets/images/republique-francaise-logo.svg"
              alt="République Française"
              class="w-[76px]"
              width="6500"
              height="5670"
              data-not-lazy
            >
          </div>
          <div class="flex items-center flex-1 pl-6">
            <nuxt-link to="/" aria-label="Page d'accueil">
              <img
                src="@/assets/images/jeveuxaider-logo.svg"
                alt=""
                class="h-[41px] w-[256px]"
                width="256"
                height="41"
                data-not-lazy
              >
            </nuxt-link>
          </div>
        </div>
        <div
          v-if="mobilePicture"
          :class="[
            'block relative lg:hidden h-[225px] overflow-hidden',
          ]"
        >
          <img
            :src="`/images/quiz/${mobilePicture}.jpg`"
            :srcset="`/images/quiz/${mobilePicture}@2x.jpg 2x`"
            alt=""
            :class="[
              'object-cover h-full w-full',
            ]"
          >
        </div>
      </template>
      <QuizSteps v-if="currentStep > 0" class="bg-[#F9F6F2]" />
      <div class="max-w-4xl flex flex-col flex-1 bg-white">
        <div class="flex flex-col flex-1 px-[32px] py-[24px] lg:px-[80px] lg:py-[56px]">
          <div v-if="slogan" class="text-lg lg:text-xl text-[#ED7A5A] font-bold uppercase mb-4">
            {{ slogan }}
          </div>
          <div
            :class="[
              'text-black font-bold mb-8 lg:mb-12 leading-snug',
              {'text-[32px] lg:text-[56px]': currentStep === 0},
              {'text-[28px] lg:text-[40px]': currentStep > 0}
            ]"
          >
            {{ title }}
          </div>
          <slot />
        </div>
      </div>
      <slot v-if="currentStep === 0" name="bottom">
        <div class="hidden lg:block px-[32px] lg:px-[80px]">
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
    },
    picture: {
      type: String,
      required: true
    },
    mobilePicture: {
      type: String,
      default: null
    }
  },
  computed: {
    currentStep () {
      return this.$route.query?.step ? parseInt(this.$route.query?.step) : 0
    }
  }
}
</script>

<style>

</style>
