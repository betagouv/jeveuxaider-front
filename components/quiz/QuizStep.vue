<template>
  <div class="flex flex-col lg:flex-row h-screen bg-white lg:overflow-hidden">
    <div
      :class="[
        'hidden relative lg:block',
        { 'w-[489px]': currentStep === 0 },
        { 'w-[600px]': currentStep > 0 },
      ]"
    >
      <img
        :src="`/images/quiz/${picture}.jpg`"
        :srcset="`/images/quiz/${picture}@2x.jpg 2x`"
        alt=""
        :class="['object-cover w-[600px] h-full']"
      />

      <template v-if="logos.length > 0">
        <div
          :class="[
            'flex gap-4 justify-center items-center h-[195px] p-8 absolute bottom-0 left-0 right-0 z-10 bg-black bg-opacity-20',
          ]"
        >
          <img
            v-for="(logo, i) in logos"
            :key="i"
            :src="`/images/quiz/${logo.name}`"
            :alt="logo.alt"
            :class="[logo.class, 'h-[140px] w-auto']"
          />
        </div>
      </template>
      <template v-else>
        <DsfrHeading
          v-if="currentStep > 0"
          as="h2"
          size="alt-lg"
          color="text-white absolute bottom-0 left-0 right-0 p-14"
        >
          <span class="block">Liberté<span class="text-jva-orange-300">.</span></span>
          <span class="block">Égalité<span class="text-jva-orange-300">.</span></span>
          <span class="block">Je veux aider<span class="text-jva-orange-300">.</span></span>
        </DsfrHeading>
      </template>
    </div>

    <main id="main" class="flex flex-col flex-1 lg:overflow-auto">
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
            />
          </div>
          <div class="flex items-center flex-1 pl-6">
            <nuxt-link no-prefetch to="/" aria-label="Page d'accueil">
              <img
                src="@/assets/images/jeveuxaider-logo.svg"
                alt=""
                class="h-[41px] w-[256px]"
                width="256"
                height="41"
                data-not-lazy
              />
            </nuxt-link>
          </div>
        </div>
        <div v-if="mobilePicture" :class="['block relative lg:hidden h-[225px] overflow-hidden']">
          <img
            :src="`/images/quiz/${mobilePicture}.jpg`"
            :srcset="`/images/quiz/${mobilePicture}@2x.jpg 2x`"
            alt=""
            :class="['object-cover h-full w-full']"
          />
          <template v-if="logos.length > 0">
            <div
              class="inline-block absolute bottom-0 right-0 z-10"
              style="background: url('/images/quiz/bg-logos-container.png')"
            >
              <div :class="['p-4 flex gap-4 justify-center items-center h-[84px]']">
                <img
                  v-for="(logo, i) in logos"
                  :key="i"
                  :src="`/images/quiz/${logo.name}`"
                  :alt="logo.alt"
                  :class="[logo.class, 'h-[59px] w-auto']"
                />
              </div>
            </div>
          </template>
        </div>
      </template>
      <QuizSteps v-if="currentStep > 0" class="bg-[#F9F6F2]" />
      <div class="lg:max-w-4xl flex flex-col flex-1 bg-white">
        <div class="flex flex-col flex-1 px-[32px] py-[24px] lg:pl-[80px] lg:py-[56px]">
          <div v-if="slogan" class="text-lg lg:text-xl text-[#ED7A5A] font-bold uppercase mb-4">
            {{ slogan }}
          </div>
          <div
            :class="[
              'text-black font-bold mb-8 lg:mb-12 leading-snug',
              { 'text-[32px] lg:text-[56px]': currentStep === 0 },
              { 'text-[28px] lg:text-[40px]': currentStep > 0 },
            ]"
          >
            {{ title }}
          </div>
          <slot />
        </div>
      </div>
      <slot name="bottom" />
    </main>
  </div>
</template>

<script>
import QuizSteps from '@/components/quiz/QuizSteps.vue'

export default defineNuxtComponent({
  components: {
    QuizSteps,
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
      default: null,
    },
    logos: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  computed: {
    currentStep() {
      return this.$route.query?.step ? parseInt(this.$route.query?.step) : 0
    },
  },
})
</script>
