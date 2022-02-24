<template>
  <a
    target="_blank"
    :href="`${shareBaseUrl}${appUrl}${url}`"
    class="bg-white h-12 w-12 lg:h-[85px] lg:w-[85px] rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform"
  >
    <img
      src="@/assets/images/share-facebook.svg"
      alt="Partagez la mission sur Facebook"
      class="h-6 w-auto lg:h-auto"
    >
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default () {
        return this.$router.currentRoute.fullPath
      }
    }
  },
  computed: {
    appUrl () {
      return this.$config.appUrl
    },
    shareBaseUrl () {
      return 'https://www.facebook.com/sharer/sharer.php?u='
    }
  }
}
</script>
