<template>
  <div class="bg-[#F5F5FE]">
    <div class="container">
      <Heading as="h2" size="alt-md" class="pt-12 pb-10 xl:pt-20 xl:pb-[72px] text-center">
        <span class="relative">
          <img
            src="/images/home/sparkle-left.svg"
            class="absolute left-[-26px] top-[-5px]"
            width="37"
            height="33"
            aria-hidden="true"
          >
          <span>Acteurs de l’engagement, </span>
          <br class="hidden md:block">
          <span>rejoignez le mouvement !</span>
        </span>
      </Heading>
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
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    BlocActeursAssociations,
    BlocActeursCollectivites,
    // BlocEcolesUniversites,
    BlocCommunaute,
    Heading
  }
}
</script>
