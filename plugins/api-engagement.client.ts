export default defineNuxtPlugin((nuxtApp) => {
  useHead({
    script: [
      {
        src: '/scripts/api-engagement.js',
      },
    ],
  })
})
