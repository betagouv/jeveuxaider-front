<template></template>

<script>
export default defineNuxtComponent({
  async setup() {
    definePageMeta({
      middleware: ['admin'],
    })

    await useApiFetch('qsl3df-haz7uif5a-ozf44sqd9f-ai0eha243')
  },
})
</script>
