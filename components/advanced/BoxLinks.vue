<template>
  <Box>
    <Heading as="h2" :level="2" class="mb-8 font-extrabold">
      {{ title }}
    </Heading>
    <div class="divide-y border-t">
      <LinkItem v-for="link,index in links" :key="index" :icon="link.icon" :to="link.to">
        {{ link.title }}
      </LinkItem>
    </div>
  </Box>
</template>

<script>
import LinkItem from '@/components/advanced/LinkItem'

export default {
  components: {
    LinkItem
  },
  props: {
    title: {
      type: String,
      default: 'Liens utiles'
    },
    links: {
      type: Array,
      required: true
    }
  }

}
</script>

<style>

</style>
