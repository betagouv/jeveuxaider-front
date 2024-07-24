<template>
  <StrapiPage :page="content" />
</template>

<script>
export default defineNuxtComponent({
  async setup() {
    const { content, head } = await useStrapiFetch('conditions-generales-d-utilisation')
    useHead(head)

    return {
      content,
    }
  },
})
</script>
