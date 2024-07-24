<template>
  <StrapiPage :page="content" />
</template>

<script>
export default defineNuxtComponent({
  async setup() {
    const { content, head } = await useStrapiFetch('plan-du-site')
    useHead(head)

    return {
      content,
    }
  },
})
</script>
