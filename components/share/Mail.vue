<template>
  <a
    :href="`mailto:?&subject=${subject}&body=${message}%0D%0A${appUrl}${url}`"
    class="bg-white h-12 w-12 lg:h-[85px] lg:w-[85px] rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform"
  >
    <img
      src="@/assets/images/share-mail.svg"
      alt="Partagez la mission par mail"
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
    subject: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: ''
    }
  },
  computed: {
    appUrl () {
      return this.$config.appUrl
    }
  }
}
</script>
