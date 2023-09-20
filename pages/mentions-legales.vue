<template>
  <StrapiPage :page="content" />
</template>

<script>
export default defineNuxtComponent({
  async setup() {
    const { content, head } = await useStrapiFetch('mentions-legales')
    useHead(head)

    return {
      content,
    }
  },
})
</script>
