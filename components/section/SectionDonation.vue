<template>
  <div id="faire-un-don" class="py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <Heading as="h2" size="alt-lg" class="text-center">
        <span>Liberté<span class="text-jva-orange-300">.</span></span>
        <span> Égalité<span class="text-jva-orange-300">.</span></span>
        <span> Je veux aider<span class="text-jva-orange-300">.</span></span>
      </Heading>
      <div class="bg-white shadow-xl mt-24 flex">
        <div class="relative flex-1">
          <img
            src="/images/organisations/donation.jpg"
            srcset="/images/organisations/donation@2x.jpg 2x"
            class="absolute object-cover w-full h-full z-10"
            alt=""
          >
          <div class="relative p-20 text-white z-20">
            <h2
              class="font-bold mb-6 text-3xl tracking-tight sm:text-5xl sm:!leading-[1.1] lg:text-[72px]"
            >
              <span>Faites un don</span> <br class="hidden xl:block">
              <span> à {{ destinataire }}
              </span>
            </h2>

            <p class="text-[32px] max-w-xl mb-6">
              Plus que jamais,<br>
              l'organisation {{ destinataire }} a besoin de votre générosité
            </p>

            <Button
              size="lg"
              type="tertiary-no-outline"
              icon-position="right"
              icon="RiExternalLinkLine"
              @click="redirect"
            >
              Faire un don <span v-if="organisme">sur {{ organisme.name }}</span>
            </Button>
          </div>
        </div>
        <div v-if="organisme" class="w-[375px] flex items-center justify-center">
          <img
            :src="organisme.logo"
            :alt="organisme.name"
            class="flex-none w-[266px] h-auto"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Heading,
    Button
  },
  props: {
    destinataire: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },

  computed: {
    organisme () {
      if (this.url.includes('microdon')) {
        return {
          value: 'microdon',
          name: 'Microdon',
          logo: '/images/organisations/microdon.svg'
        }
      }
      if (this.url.includes('ulule')) {
        return {
          value: 'ulule',
          name: 'Ulule',
          logo: '/images/organisations/ulule.svg'
        }
      }
      if (this.url.includes('leetchi')) {
        return {
          value: 'leetchi',
          name: 'Leetchi',
          logo: '/images/organisations/leetchi.svg'
        }
      }
      if (this.url.includes('helloasso')) {
        return {
          value: 'helloasso',
          name: 'HelloAsso',
          logo: '/images/organisations/helloasso.svg'
        }
      }

      return null
    }
  },
  methods: {
    redirect () {
      this.$plausible.trackEvent('Click Module de don - Page Orga', {
        props: {
          isLogged: this.$store.getters.isLogged,
          url: this.url
        }
      })
      window.open(this.url, '_blank')
    }
  }
}
</script>

<style>

</style>
