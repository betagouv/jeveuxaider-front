<template>
  <a
    target="_blank"
    :href="`${shareBaseUrl}${appUrl}${url}&title=${message}`"
    class="bg-white h-12 w-12 lg:h-[85px] lg:w-[85px] rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform"
  >
    <img
      src="@/assets/images/share-linkedin.svg"
      alt="Partagez la mission sur Linkedin"
      class="w-6 h-auto lg:w-auto"
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
    },
    message: {
      type: String,
      default: ''
    }
  },
  computed: {
    appUrl () {
      return this.$config.appUrl
    },
    shareBaseUrl () {
      return 'https://www.linkedin.com/shareArticle?mini=true&url='
    }
  }
}
</script>
