<template>
  <a
    target="_blank"
    :href="shareUrl"
    class="bg-white rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform"
    :class="[
      {'h-20 w-20' : size === 'xl' },
      {'h-16 w-16' : size === 'lg' },
      {'h-12 w-12' : size === 'md' },
    ]"
  >
    <img
      src="@/assets/images/share-whatsapp.svg"
      alt="Partagez la mission sur WhatsApp"
      class="w-auto"
      :class="[
        {'h-10' : size === 'xl' },
        {'h-8' : size === 'lg' },
        {'h-6' : size === 'md' },
      ]"
    >
  </a>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'xl'
    },
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
