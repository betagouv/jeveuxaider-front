<template>
  <div class="px-8 py-12 bg-[#6A6AF4] shadow-xl text-white">
    <img src="/images/home/acteurs-stars.svg" alt="" class="flex-none">
    <Heading as="h2" size="2xl" class="mt-8" color="text-white">
      Rejoignez la communauté des Super-Bénévoles
    </Heading>
    <ul class="text-xl leading-6 mt-8 space-y-6">
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
    <div class="mt-8">
      <Button type="tertiary-no-outline" @click="handleClick()">
        Devenez Super-Bénévole
      </Button>
    </div>
    <div class="mt-8 flex space-x-4">
      <!-- <img
          srcset="
            /images/home/maiwelle.webp, /images/home/maiwelle@2x.webp 2x,
            /images/home/maiwelle.png, /images/home/maiwelle@2x.png 2x
          "
          src="/images/home/maiwelle.png"
          alt="Maiwelle"
          class="flex-none h-[48px] w-[48px] lg:w-[60px] lg:h-[60px]"
        > -->
      <div class="bg-red-500 rounded-full flex-none h-[48px] w-[48px]" />
      <p><strong>Coralie</strong> de JeVeuxAider.gouv.fr pour vous accompagner</p>
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
