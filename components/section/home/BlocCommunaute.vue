<template>
  <div class="px-8 py-12 xl:px-12 xl:py-24 bg-[#6A6AF4] shadow-xl text-white">
    <div class="relative flex flex-col items-start gap-8">
      <div class="flex flex-col md:flex-row gap-8">
        <img
          src="/images/home/acteurs-stars.svg"
          alt=""
          class="flex-none"
          width="81"
          height="69"
          aria-hidden="true"
        >
        <Heading as="h2" size="2xl" color="text-white">
          <span>Rejoignez la communauté </span>
          <br class="hidden xl:block">
          <span>des <br class="hidden lg:block xl:hidden"> Super-Bénévoles</span>
        </Heading>
      </div>
      <ul class="text-xl leading-6 space-y-6 lg:space-y-0 lg:flex lg:flex-wrap lg:gap-x-12 lg:gap-y-6 xl:gap-x-16">
        <li class="flex items-start space-x-3">
          <RiCheckboxCircleLine class="w-6 h-6 text-white fill-current flex-none" />
          <p>Agissez en faveur de l<strong>’intérêt général</strong></p>
        </li>
        <li class="flex items-start space-x-3">
          <RiCheckboxCircleLine class="w-6 h-6 text-white fill-current flex-none" />
          <p>Faites des <strong>rencontres qui transforment</strong></p>
        </li>
        <li class="flex items-start space-x-3">
          <RiCheckboxCircleLine class="w-6 h-6 text-white fill-current flex-none" />
          <p>Montez en <strong>compétences</strong></p>
        </li>
      </ul>
      <Button
        type="tertiary-no-outline"
        class="lg:absolute lg:right-0 lg:bottom-0 xl:bottom-[80px]"
        @click="handleClick()"
      >
        Devenez Super-Bénévole
      </Button>
      <div class="flex items-center space-x-4 xl:absolute xl:right-[260px] xl:max-w-[300px] xl:top-[26px]">
        <div class="bg-red-500 rounded-full flex-none h-[48px] w-[48px]" />
        <p><strong>Coralie</strong> de JeVeuxAider.gouv.fr pour vous accompagner</p>
      </div>
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
        window.plausible('Click CTA - Homepage - Acteurs - Devenez Super-Bénévole', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/missions-benevolat/13190/benevolat-jeveuxaidergouvfr-paris')
    }
  }
}
</script>
