<template>
  <div class="px-8 py-12 bg-white shadow-xl">
    <img src="/images/home/acteurs-hands.svg" alt="" class="flex-none">
    <Heading as="h2" size="2xl" class="mt-8">
      Associations et organisations publiques
    </Heading>
    <ul class="text-xl leading-6 mt-8 space-y-6">
      <li class="flex items-start space-x-3">
        <RiCheckboxCircleLine aria-hidden="true" class="w-6 h-6 text-jva-blue-500 fill-current flex-none" />
        <p>Inscrivez votre organisation <strong>en quelques clics</strong></p>
      </li>
      <li class="flex items-start space-x-3">
        <RiCheckboxCircleLine aria-hidden="true" class="w-6 h-6 text-jva-blue-500 fill-current flex-none" />
        <p><strong>Publiez vos missions</strong> de bénévolat</p>
      </li>
      <li class="flex items-start space-x-3">
        <RiCheckboxCircleLine aria-hidden="true" class="w-6 h-6 text-jva-blue-500 fill-current flex-none" />
        <p>Trouvez facilement de <strong>nouveaux bénévoles</strong></p>
      </li>
    </ul>
    <div class="mt-8">
      <Button @click="handleClick()">
        Inscrivez votre organisation
      </Button>
    </div>
    <div class="mt-8 flex space-x-4">
      <div class="flex flex-shrink-0">
        <img
          srcset="
            /images/home/caroline.webp, /images/home/caroline@2x.webp 2x,
            /images/home/caroline.png, /images/home/caroline@2x.png 2x
          "
          src="/images/home/caroline.png"
          alt="Caroline"
          class="relative z-[3] flex-none h-[48px] w-[48px] lg:w-[60px] lg:h-[60px]"
        >
        <img
          srcset="
            /images/home/sophie.webp, /images/home/sophie@2x.webp 2x,
            /images/home/sophie.png, /images/home/sophie@2x.png 2x
          "
          src="/images/home/sophie.png"
          alt="Sophie"
          class="relative z-[2] flex-none h-[48px] w-[48px] -ml-4 lg:w-[60px] lg:h-[60px]"
        >
      </div>
      <p class="text-[#3A3A3A] !-mr-1 xs:!mr-0">
        <strong>Caroline et Sophie</strong> de JeVeuxAider.gouv.fr pour vous accompagner
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
        window.plausible('Click CTA - Homepage - Acteurs - Inscrivez votre organisation', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/inscription/responsable')
    }
  }
}
</script>
