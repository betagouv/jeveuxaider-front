<template>
  <div class="bg-[#F5F5FE] p-4">
    <div class="py-16 text-[40px] font-bold leading-10 text-center">
      <span class="relative"><img class="absolute left-[-26px] top-[-5px]" src="/images/home/sparkle-left.svg"> Acteurs de l’engagement,
        rejoignez le mouvement !</span>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BlocActeursAssociations />
    </div>
  </div>
</template>

<script>
import BlocActeursAssociations from '@/components/section/home/BlocActeursAssociations.vue'

export default {
  components: {
    BlocActeursAssociations
  }
}
</script>
