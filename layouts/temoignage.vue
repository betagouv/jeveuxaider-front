<template>
  <div class="bg-gray-100">
    <div class="container px-4 mx-auto">
      <div class="flex flex-col items-center min-h-screen">
        <nuxt-link to="/" class="my-6 p-2 block">
          <img
            src="@/assets/images/jeveuxaider-logo.svg"
            alt=""
            width="227"
            height="37"
            class="mx-auto"
          >
        </nuxt-link>

        <main id="main" class="my-auto">
          <Nuxt />
        </main>

        <TemoignageSteps />
      </div>
    </div>
  </div>
</template>

<script>
import TemoignageSteps from '@/components/section/temoignage/Steps.vue'
import MixinPlausible from '@/mixins/plausible.js'

export default {
  name: 'TemoignageLayout',
  components: {
    TemoignageSteps
  },
  mixins: [MixinPlausible]
}
</script>
