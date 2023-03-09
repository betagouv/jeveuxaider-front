<template>
  <div class="px-8 py-12 bg-[#6A6AF4] shadow-xl text-white">
    <div>
      <img src="/images/home/acteurs-stars.svg" alt="" class="flex-none">
    </div>
    <div class="text-3xl font-bold mt-8">
      Rejoignez la communauté des Super-Bénévoles
    </div>
    <ul class="text-xl mt-8 space-y-6">
      <li class="flex items-center space-x-6">
        <RiCheckboxCircleLine
          class="w-6 h-6 text-white fill-current flex-none"
        /><span>Agissez en faveur de l<strong>’intérêt général</strong></span>
      </li>
      <li class="flex items-center space-x-6">
        <RiCheckboxCircleLine
          class="w-6 h-6 text-white fill-current flex-none"
        /><span>Faites des <strong>rencontres qui transforment</strong></span>
      </li>
      <li class="flex items-center space-x-6">
        <RiCheckboxCircleLine
          class="w-6 h-6 text-white fill-current flex-none"
        /><span>Montez en <strong>compétences</strong></span>
      </li>
    </ul>
    <div class="mt-8">
      <Button type="tertiary-no-outline" @click="handleClick()">
        Devenez Super-Bénévole
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
        <strong>Coralie</strong> de JeVeuxAider.gouv.fr pour vous accompagner
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
        window.plausible('Click CTA - Homepage - Acteurs - Devenez Super-Bénévole', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/missions-benevolat/13190/benevolat-jeveuxaidergouvfr-paris')
    }
  }
}
</script>

<style>

</style>
