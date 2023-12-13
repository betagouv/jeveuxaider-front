<template>
  <a
    :href="`mailto:?&subject=${subject}&body=${message}%0D%0A${appUrl}${url}`"
    class="bg-white rounded-full flex justify-center items-center cursor-pointer tracking-wide shadow-lg hover:scale-105 transform transition will-change-transform"
    :class="[
      { 'h-20 w-20': size === 'xl' },
      { 'h-16 w-16': size === 'lg' },
      { 'h-12 w-12': size === 'md' },
    ]"
  >
    <img
      src="@/assets/images/share-mail.svg"
      alt="Partagez la mission par mail"
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
    subject: {
      type: String,
      required: true,
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
  },
})
</script>
