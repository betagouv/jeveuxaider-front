<template>
  <div class="bg-[#F5F5FE]">
    <div class="container">
      <DsfrHeading as="h2" size="alt-md" class="pt-12 pb-10 xl:pt-20 xl:pb-[72px] text-center">
        <span class="relative">
          <img
            src="/images/home/sparkle-left.svg"
            alt=""
            width="37"
            height="33"
            aria-hidden="true"
            class="absolute left-[-26px] top-[-5px] xl:w-[50px] xl:left-[-38px] xl:top-[-8px] pointer-events-none"
          />
          <span>Acteurs de l’engagement, </span>
          <br class="hidden md:block" />
          <span>rejoignez le mouvement !</span>
        </span>
      </DsfrHeading>
    </div>

    <div class="container md:!max-w-full xl:!max-w-[1680px]">
      <div class="flex flex-col md:flex-row md:flex-wrap -m-3 xl:-m-4">
        <div class="w-full md:w-1/2 p-3 xl:p-4">
          <BlocActeursAssociations class="h-full" />
        </div>
        <div class="w-full md:w-1/2 p-3 xl:p-4">
          <BlocActeursCollectivites class="h-full" />
        </div>
        <!-- <div class="w-full p-3 xl:p-4">
          <BlocEcolesUniversites  />
        </div> -->
        <div class="w-full p-3 xl:p-4">
          <BlocCommunaute class="h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlocActeursAssociations from '@/components/section/home/BlocActeursAssociations.vue'
import BlocActeursCollectivites from '@/components/section/home/BlocActeursCollectivites.vue'
// import BlocEcolesUniversites from '@/components/section/home/BlocEcolesUniversites.vue'
import BlocCommunaute from '@/components/section/home/BlocCommunaute.vue'

export default defineNuxtComponent({
  components: {
    BlocActeursAssociations,
    BlocActeursCollectivites,
    // BlocEcolesUniversites,
    BlocCommunaute,
  },
})
</script>
