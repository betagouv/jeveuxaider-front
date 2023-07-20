<template>
  <div v-if="organisation.donation" id="faire-un-don" class="gradient mt-20">
    <div class="container px-4 md:px-8 mx-auto relative">
      <div
        class="max-w-[960px] mx-auto rounded-[24px] transform -translate-y-16 mb-6"
      >
        <div class="relative rounded-[24px] overflow-hidden shadow-lg">
          <img
            src="/images/organisations/bg_don.png"
            srcset="/images/organisations/bg_don@2x.png 2x"
            class="bg-img absolute object-cover w-full h-full"
            alt=""
          >

          <div
            class="absolute inset-0 w-full h-full opacity-90"
            :style="`background: ${organisation.color ? organisation.color : '#B91C1C'}`"
          />

          <div class="relative text-white p-8 py-16 text-center">
            <h2
              class="font-bold text-center mb-6 text-3xl leading-8 tracking-tight sm:text-5xl sm:leading-tight"
            >
              <span>Faites un don à l'organisation </span>
              <br class="hidden xl:block">
              <span class="font-extrabold">{{ organisation.name }}</span>
            </h2>

            <p class="text-xl max-w-xl mx-auto">
              Plus que jamais, l'organisation {{ organisation.name }} a besoin de
              votre générosité
            </p>
          </div>
        </div>

        <div>
          <div
            class="text-center transform -translate-y-1/2"
            :class="[
              {
                'absolute inset-x-0':
                  !organisation.donation.includes('helloasso') &&
                  !organisation.donation.includes('leetchi') &&
                  !organisation.donation.includes('microdon') &&
                  !organisation.donation.includes('ulule'),
              },
            ]"
          >
            <a
              :href="organisation.donation"
              target="_blank"
              class="mx-auto inline-flex items-center justify-center font-extrabold cursor-pointer shadow-lg text-xl leading-6 rounded-full text-white bg-jva-green-500 py-4 px-10 hover:shadow-lg hover:scale-105 focus:scale-105 !outline-none transform transition will-change-transform"
              @click.prevent="goTo(organisation.donation)"
            >
              Faire un don
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          <div
            v-if="
              organisation.donation.includes('helloasso') ||
                organisation.donation.includes('leetchi') ||
                organisation.donation.includes('microdon') ||
                organisation.donation.includes('ulule')
            "
            class="-mt-7 pt-6"
          >
            <div class="flex items-center justify-center">
              <span
                class="uppercase text-gray-500 mr-2"
                style="font-size: 10px"
              >Par</span>

              <img
                v-if="organisation.donation.includes('helloasso')"
                src="/images/organisations/helloasso.svg"
                alt="Helloasso"
                class="flex-none"
                width="92px"
              >

              <img
                v-if="organisation.donation.includes('leetchi')"
                src="/images/organisations/leetchi.png"
                srcset="/images/organisations/leetchi@2x.png 2x"
                alt="Leetchi"
                class="flex-none"
              >

              <img
                v-if="organisation.donation.includes('ulule')"
                src="/images/organisations/ulule.svg"
                alt="Ulule"
                class="flex-none"
                width="92px"
              >

              <img
                v-if="organisation.donation.includes('microdon')"
                src="/images/organisations/microdon.png"
                srcset="/images/organisations/microdon@2x.png 2x"
                alt="Microdon"
                class="flex-none"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    organisation: {
      type: Object,
      required: true
    }
  },
  methods: {
    goTo (url) {
      this.$plausible.trackEvent('Click Module de don - Page Orga', {
        props: { isLogged: this.$store.getters.isLogged }
      })
      window.open(url, '_blank')
    }
  }
}
</script>

<style>

</style>
