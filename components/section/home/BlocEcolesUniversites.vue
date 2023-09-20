<template>
  <div class="px-8 py-12 bg-jva-orange-300 shadow-xl text-[#4D312A]">
    <img src="/images/home/acteurs-ecoles.svg" alt="" class="flex-none" />
    <DsfrHeading as="h2" size="2xl" class="mt-8" color="text-[#522F29]">
      Écoles et universités à destination des étudiants
    </DsfrHeading>
    <ul class="text-xl leading-6 mt-8 space-y-6">
      <li class="flex items-start space-x-3">
        <RiCheckboxCircleLine
          aria-hidden="true"
          class="w-6 h-6 text-[#4D312A] fill-current flex-none"
        />
        <p>Créez <strong>une page dédiée</strong> à votre collectivité</p>
      </li>
      <li class="flex items-start space-x-3">
        <RiCheckboxCircleLine
          aria-hidden="true"
          class="w-6 h-6 text-[#4D312A] fill-current flex-none"
        />
        <p><strong>Centralisez les missions</strong> des organisations locales</p>
      </li>
      <li class="flex items-start space-x-3">
        <RiCheckboxCircleLine
          aria-hidden="true"
          class="w-6 h-6 text-[#4D312A] fill-current flex-none"
        />
        <p>Encouragez l'<strong>engagement de vos citoyens</strong></p>
      </li>
    </ul>
    <div class="mt-8">
      <DsfrButton type="tertiary-no-outline" @click="handleClick()">
        Encouragez le bénévolat étudiant
      </DsfrButton>
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
      <p><strong>Timothée</strong> de JeVeuxAider.gouv.fr pour vous accompagner</p>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  methods: {
    handleClick() {
      this.$plausible.trackEvent(
        'Click CTA - Homepage - Acteurs - Encouragez le bénévolat étudiant',
        {
          props: { isLogged: this.$stores.auth.isLogged },
        }
      )
      this.$router.push('/inscription/responsable')
    },
  },
})
</script>
