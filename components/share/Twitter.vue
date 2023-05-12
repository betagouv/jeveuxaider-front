<template>
  <a
    target="_blank"
    :href="`${shareBaseUrl}${message}${appUrl}${url}`"
    class="bg-white  rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform"
    :class="[
      {'h-20 w-20' : size === 'xl' },
      {'h-16 w-16' : size === 'lg' },
      {'h-12 w-12' : size === 'md' },
    ]"
  >
    <img
      src="@/assets/images/share-twitter.svg"
      alt="Partagez la mission sur Twitter"
      class="w-auto"
      :class="[
        {'h-8' : size === 'xl' },
        {'h-6' : size === 'lg' },
        {'h-4' : size === 'md' },
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
    shareBaseUrl () {
      return 'https://twitter.com/intent/tweet?url='
    }
  }
}
</script>
