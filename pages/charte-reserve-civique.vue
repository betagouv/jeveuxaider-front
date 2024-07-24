<template>
  <StrapiPage :page="content" />
</template>

<script>
export default defineNuxtComponent({
  async setup() {
    const { content, head } = await useStrapiFetch('charte-reserve-civique')
    useHead(head)

    return {
      content,
    }
  },
})
</script>
