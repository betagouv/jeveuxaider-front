<template>
  <a
    target="_blank"
    :href="`${shareBaseUrl}${appUrl}${url}`"
    class="bg-white rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform"
    :class="[
      { 'h-20 w-20': size === 'xl' },
      { 'h-16 w-16': size === 'lg' },
      { 'h-12 w-12': size === 'md' },
    ]"
  >
    <img
      src="@/assets/images/share-facebook.svg"
      alt="Partagez la mission sur Facebook"
      class="w-auto"
      :class="[{ 'h-10': size === 'xl' }, { 'h-8': size === 'lg' }, { 'h-6': size === 'md' }]"
    />
  </a>
</template>

<script>
export default defineNuxtComponent({
  props: {
    size: {
      type: String,
      default: 'xl',
    },
    url: {
      type: String,
      default() {
        const router = useRouter()
        return router.currentRoute.value.fullPath
      },
    },
  },
  computed: {
    appUrl() {
      const runtimeConfig = useRuntimeConfig()
      return runtimeConfig.public.appUrl
    },
    shareBaseUrl() {
      return 'https://www.facebook.com/sharer/sharer.php?u='
    },
  },
})
</script>
