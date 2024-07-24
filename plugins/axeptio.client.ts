export default defineNuxtPlugin((nuxtApp) => {
  useHead({
    script: [
      {
        src: '/scripts/axeptio.js',
      },
    ],
  })
})
