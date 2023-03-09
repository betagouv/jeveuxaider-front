<template>
  <div class="px-8 py-12 bg-jva-orange-300 shadow-xl text-[#4D312A]">
    <div>
      <img src="/images/home/acteurs-ecoles.svg" alt="" class="flex-none">
    </div>
    <div class="text-3xl font-bold mt-8">
      Écoles et universités à destination des étudiants
    </div>
    <ul class="text-xl mt-8 space-y-6">
      <li class="flex items-center space-x-6">
        <RiCheckboxCircleLine
          class="w-6 h-6 text-[#4D312A] fill-current flex-none"
        /><span>Créez <strong>une page dédiée</strong> à votre collectivité</span>
      </li>
      <li class="flex items-center space-x-6">
        <RiCheckboxCircleLine
          class="w-6 h-6 text-[#4D312A] fill-current flex-none"
        /><span><strong>Centralisez les missions</strong> des organisations locales</span>
      </li>
      <li class="flex items-center space-x-6">
        <RiCheckboxCircleLine
          class="w-6 h-6 text-[#4D312A] fill-current flex-none"
        /><span>Encouragez l'<strong>engagement de vos citoyens</strong></span>
      </li>
    </ul>
    <div class="mt-8">
      <Button type="tertiary-no-outline" @click="handleClick()">
        Encouragez le bénévolat étudiant
      </Button>
    </div>
    <div class="mt-8 flex space-x-4">
      <div class="flex-none">
        <img
          srcset="
          /images/home/maiwelle.webp,
          /images/home/maiwelle@2x.webp 2x,
          /images/home/maiwelle.png,
          /images/home/maiwelle@2x.png 2x
        "
          alt="Maiwelle"
          class="flex-none h-[48px] w-[48px] lg:w-[60px] lg:h-[60px]"
          data-not-lazy
        >
      </div>
      <div class="">
        <strong>Timothée</strong> de JeVeuxAider.gouv.fr pour vous accompagner
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
        window.plausible('Click CTA - Homepage - Acteurs - Encouragez le bénévolat étudiant', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/inscription/responsable')
    }
  }
}
</script>

<style>

</style>
