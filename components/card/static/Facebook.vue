<template>
  <div
    class="px-6 pt-10 pb-12 lg:px-8 lg:py-12 xl:px-16 xl:py-12 bg-white rounded-[10px] shadow-xl relative overflow-hidden"
  >
    <div
      class="flex flex-col items-start text-center md:text-left h-full relative z-10"
    >
      <h2
        class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight mb-6 max-w-[442px]"
      >
        <span>Échangez avec la</span>
        <strong class="font-extrabold">communauté</strong>
      </h2>

      <div
        id="facebook-headline"
        class="text-[#696974] text-xl mb-7 lg:max-w-[256px] xl:max-w-[392px]"
      >
        Posez toutes vos questions aux bénévoles et à l'équipe dans le
        groupe Facebook
      </div>

      <a
        href="https://www.facebook.com/jeveuxaider.gouv.fr"
        target="_blank"
        rel="noopener"
        class="w-full lg:w-auto flex items-center justify-center px-12 py-3 font-bold rounded-full text-white bg-jva-blue-500 hover:scale-105 transform transition mt-auto relative z-10 outline-none focus-visible:ring focus-visible:ring-offset-1 focus-visible:ring-jva-blue-500"
        aria-labelledby="facebook-headline"
      >
        <img
          src="/images/facebook_alt.svg"
          alt="Facebook"
          class="mr-2"
          width="20"
          height="20"
          data-not-lazy
        >
        <span>Rejoindre le groupe</span>
      </a>
    </div>

    <img
      src="/images/group_facebook.svg"
      alt="Groupe Facebook"
      class="hidden md:flex absolute bottom-0 right-0 transform translate-y-[70px] lg:translate-y-0"
      width="306"
      height="331"
    >
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
