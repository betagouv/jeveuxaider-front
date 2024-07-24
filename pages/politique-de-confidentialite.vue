<template>
  <StrapiPage :page="content" />
</template>

<script>
export default defineNuxtComponent({
  async setup() {
    const { content, head } = await useStrapiFetch('politique-de-confidentialite')
    useHead(head)

    return {
      content,
    }
  },
})
</script>
