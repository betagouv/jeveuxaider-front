<template>
  <div class="px-8 py-12 bg-white shadow-xl">
    <div>
      <img src="/images/home/acteurs-hands.svg" alt="" class="flex-none">
    </div>
    <div class="text-3xl font-bold mt-8">
      Associations et organisations publiques
    </div>
    <ul class="text-xl mt-8 space-y-6">
      <li class="flex items-center space-x-6">
        <RiCheckboxCircleLine
          class="w-6 h-6 text-jva-blue-500 fill-current flex-none"
        /><span>Inscrivez votre organisation <strong>en quelques clics</strong></span>
      </li>
      <li class="flex items-center space-x-6">
        <RiCheckboxCircleLine
          class="w-6 h-6 text-jva-blue-500 fill-current flex-none"
        /><span><strong>Publiez vos missions</strong> de bénévolat</span>
      </li>
      <li class="flex items-center space-x-6">
        <RiCheckboxCircleLine
          class="w-6 h-6 text-jva-blue-500 fill-current flex-none"
        /><span>Trouvez facilement de <strong>nouveaux bénévoles</strong></span>
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
          /images/home/caroline.webp,
          /images/home/caroline@2x.webp 2x,
          /images/home/caroline.png,
          /images/home/caroline@2x.png 2x
        "
          alt="Caroline"
          class="relative z-20 flex-none h-[48px] w-[48px] lg:w-[60px] lg:h-[60px]"
          data-not-lazy
        >
        <img
          srcset="
          /images/home/sophie.webp,
          /images/home/sophie@2x.webp 2x,
          /images/home/sophie.png,
          /images/home/sophie@2x.png 2x
        "
          alt="Sophie"
          class="relative ml-[-38px] z-10 flex-none h-[48px] w-[48px] lg:w-[60px] lg:h-[60px]"
          data-not-lazy
        >
      </div>
      <div class="text-[#3A3A3A]">
        <strong>Caroline et Sophie</strong> de JeVeuxAider.gouv.fr pour vous accompagner
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
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

<style>

</style>
