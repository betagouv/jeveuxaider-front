<template>
  <div class="bg-white shadow-xl border-b">
    <div class="flex items-center justify-between lg:justify-start space-x-6 lg:space-x-8">
      <div class="py-4">
        <div class="px-4 lg:px-10 border-r">
          <img
            src="@/assets/images/republique-francaise-logo.svg"
            alt="République Française"
            class="w-[76px]"
            width="6500"
            height="5670"
            data-not-lazy
          />
        </div>
      </div>

      <div class="hidden flex-1 h-[98px] lg:flex lg:items-center">
        <div v-if="organisation.logo" class="hidden xl:block py-4 flex-none mr-12">
          <img
            :srcset="organisation.logo.urls.large"
            :alt="organisation.name"
            class="w-auto h-[40px]"
          />
        </div>
        <div class="menu-links flex gap-6 h-full">
          <nuxt-link no-prefetch to="#presentation" class="flex items-center space-x-2">
            <RiBuildingLine class="h-4 fill-current flex-none" /> <span>Présentation</span>
          </nuxt-link>
          <nuxt-link no-prefetch to="#missions" class="flex items-center space-x-4">
            <RiTeamLine class="h-4 fill-current flex-none" />
            <span class="hidden xl:inline">Missions de bénévolat</span>
            <span class="xl:hidden">Missions</span>
          </nuxt-link>
          <nuxt-link
            no-prefetch
            v-if="organisation.donation"
            to="#donation"
            class="flex items-center space-x-4"
          >
            <RiMoneyEuroCircleLine class="h-4 fill-current flex-none" />
            <span>Faire un don</span>
          </nuxt-link>
        </div>
      </div>
      <div class="py-4 px-10 justify-self-end">
        <div class="flex items-center">
          <span class="hidden xl:inline text-[#5B71B9] mr-3"> Encouragé par </span>
          <nuxt-link no-prefetch to="/">
            <img src="@/assets/images/jeveuxaider-logo.svg" alt="" width="193" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    organisation: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style lang="postcss" scoped>
.menu-links {
  a {
    @apply px-6 text-[#3A3A3A] font-medium border-b-[3px] border-transparent;
    &:hover {
      @apply text-jva-blue-500;
    }
    /* &.router-link-active {
      @apply font-bold text-jva-blue-500 border-jva-blue-500;
    } */
  }
}
</style>
