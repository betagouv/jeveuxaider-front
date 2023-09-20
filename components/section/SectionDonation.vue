<template>
  <div id="faire-un-don" class="py-8 lg:py-24 overflow-hidden">
    <div class="container">
      <DsfrHeading as="h2" size="alt-lg" class="text-center">
        <span>Liberté<span class="text-jva-orange-300">.</span></span>
        <span> Égalité<span class="text-jva-orange-300">.</span></span>
        <span> Je veux aider<span class="text-jva-orange-300">.</span></span>
      </DsfrHeading>
      <div class="bg-white shadow-xl mt-12 lg:mt-24 flex flex-col sm:flex-row">
        <div class="relative flex-1">
          <img
            src="/images/organisations/donation.jpg"
            srcset="/images/organisations/donation@2x.jpg 2x"
            class="absolute object-cover w-full h-full z-10"
            alt=""
          />
          <div class="relative p-6 lg:p-20 text-white z-20">
            <h2
              class="font-bold mb-6 text-3xl tracking-tight sm:text-5xl sm:!leading-[1.1] lg:text-[72px]"
            >
              <span>Faites un don</span> <br class="hidden xl:block" />
              <span> à {{ destinataire }} </span>
            </h2>

            <p class="text-lg lg:text-[32px] lg:max-w-xl lg:leading-10 mb-6 lg:mb-8">
              Plus que jamais,<br />
              l'organisation {{ destinataire }} a besoin de votre générosité
            </p>

            <DsfrButton
              size="lg"
              type="tertiary-no-outline"
              icon-position="right"
              icon="RiExternalLinkLine"
              @click="redirect"
            >
              Faire un don
              <span v-if="organisme" class="hidden sm:inline">sur {{ organisme.name }}</span>
            </DsfrButton>
          </div>
        </div>
        <div
          v-if="organisme"
          class="w-[200px] mx-auto lg:w-[375px] p-6 sm:p-0 flex items-center justify-center"
        >
          <img :src="organisme.logo" :alt="organisme.name" class="flex-none w-[266px] h-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  components: {},
  props: {
    destinataire: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  computed: {
    organisme() {
      if (this.url.includes('microdon')) {
        return {
          value: 'microdon',
          name: 'Microdon',
          logo: '/images/organisations/microdon.svg',
        }
      }
      if (this.url.includes('ulule')) {
        return {
          value: 'ulule',
          name: 'Ulule',
          logo: '/images/organisations/ulule.svg',
        }
      }
      if (this.url.includes('leetchi')) {
        return {
          value: 'leetchi',
          name: 'Leetchi',
          logo: '/images/organisations/leetchi.svg',
        }
      }
      if (this.url.includes('helloasso')) {
        return {
          value: 'helloasso',
          name: 'HelloAsso',
          logo: '/images/organisations/helloasso.svg',
        }
      }

      return null
    },
  },
  methods: {
    redirect() {
      this.$plausible.trackEvent('Click Module de don - Page Orga', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          url: this.url,
        },
      })
      window.open(this.url, '_blank')
    },
  },
})
</script>
