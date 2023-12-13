<template>
  <a
    target="_blank"
    :href="`${shareBaseUrl}${appUrl}${url}&title=${message}`"
    class="bg-white rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform"
    :class="[
      { 'h-20 w-20': size === 'xl' },
      { 'h-16 w-16': size === 'lg' },
      { 'h-12 w-12': size === 'md' },
    ]"
  >
    <img
      src="@/assets/images/share-linkedin.svg"
      alt="Partagez la mission sur Linkedin"
      class="w-auto"
      :class="[{ 'h-8': size === 'xl' }, { 'h-6': size === 'lg' }, { 'h-4': size === 'md' }]"
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
    message: {
      type: String,
      default: '',
    },
  },
  computed: {
    appUrl() {
      const runtimeConfig = useRuntimeConfig()
      return runtimeConfig.public.appUrl
    },
    shareBaseUrl() {
      return 'https://www.linkedin.com/shareArticle?mini=true&url='
    },
  },
})
</script>
