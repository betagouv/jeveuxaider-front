<template>
  <div class="bg-white shadow-xl border-b">
    <div class="flex items-center space-x-12">
      <div class=" py-4 px-10">
        <img
          src="@/assets/images/republique-francaise-logo.svg"
          alt="République Française"
          class="w-[76px]"
          width="6500"
          height="5670"
          data-not-lazy
        >
      </div>
      <div class=" py-4 px-10">
        <img
          v-if="organisation.logo"
          :srcset="organisation.logo.urls.large"
          :alt="organisation.name"
          class="w-auto h-[40px]"
        >
      </div>
      <div class="flex-1">
        MENU @TODO
      </div>
      <div class="py-4 px-10  justify-self-end">
        <div class="flex items-center">
          <span class="text-[#5B71B9] mr-3">
            Encouragé par
          </span>
          <nuxt-link to="/">
            <img
              src="@/assets/images/jeveuxaider-logo.svg"
              alt=""
              width="193"
            >
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    organisation: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
