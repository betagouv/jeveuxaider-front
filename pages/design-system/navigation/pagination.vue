<template>
  <div class="space-y-12">
    <Heading as="h2" :level="3" class="mb-8">
      Pagination
    </Heading>
    <Pagination current-page="6" total-rows="100" />
  </div>
</template>

<script>
export default {
  layout: 'design-system',
  data () {
    return {

    }
  }
}
</script>
