<template>
  <a
    target="_blank"
    :href="shareUrl"
    class="bg-white h-12 w-12 lg:h-[85px] lg:w-[85px] rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform"
  >
    <img
      src="@/assets/images/share-whatsapp.svg"
      alt="Partagez la mission sur WhatsApp"
      class="h-6 w-auto lg:h-10"
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
    shareUrl () {
      return `https://wa.me/?text=${this.message} ${this.appUrl}${this.url}`
    }
  }
}
</script>
