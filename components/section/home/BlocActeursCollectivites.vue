<template>
  <div class="px-8 py-12 xl:p-16 bg-[#21AB8E] shadow-xl text-white">
    <div class="flex flex-col xl:flex-row gap-8 lg:gap-6 xl:mb-16">
      <img
        src="/images/home/france-localization.svg"
        alt=""
        class="flex-none"
        width="74"
        height="81"
        aria-hidden="true"
      >
      <Heading as="h2" size="2xl" color="text-white">
        Collectivités locales et territoires
      </Heading>
    </div>
    <ul class="text-xl leading-6 mt-8 space-y-6 xl:mb-12">
      <li class="flex items-start lg:items-center space-x-3">
        <RiCheckboxCircleLine aria-hidden="true" class="w-6 h-6 text-white fill-current flex-none" />
        <p>Créez <strong>une page dédiée</strong> à votre collectivité</p>
      </li>
      <li class="flex items-start lg:items-center space-x-3">
        <RiCheckboxCircleLine aria-hidden="true" class="w-6 h-6 text-white fill-current flex-none" />
        <p><strong>Centralisez les missions</strong> des organisations locales</p>
      </li>
      <li class="flex items-start lg:items-center space-x-3">
        <RiCheckboxCircleLine aria-hidden="true" class="w-6 h-6 text-white fill-current flex-none" />
        <p>Encouragez l'<strong>engagement de vos citoyens</strong></p>
      </li>
    </ul>
    <div class="mt-8">
      <Button size="lg" type="tertiary-no-outline" @click="handleClick()">
        Inscrire ma collectivité
      </Button>
    </div>
    <div class="mt-8 lg:mt-12 flex items-center space-x-4">
      <img
        srcset="
          /images/home/angela.webp, /images/home/angela@2x.webp 2x,
          /images/home/angela.png, /images/home/angela@2x.png 2x
        "
        src="/images/home/angela.png"
        alt="Angela"
        class="flex-none h-[48px] w-[48px] lg:w-[60px] lg:h-[60px]"
      >
      <p class="text-white xl:text-lg">
        <strong>Angela</strong> de JeVeuxAider.gouv.fr <br class="hidden lg:block">pour vous accompagner
      </p>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Button,
    Heading
  },
  methods: {
    handleClick () {
      window.plausible &&
        window.plausible('Homepage|CTA - Inscrire collectivités', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/inscription/responsable?orga_type=Collectivité')
    }
  }
}
</script>
