<template>
  <div class="space-y-4 max-w-lg">
    <BaseHeading as="h1" :level="1">
      Heading 1
    </BaseHeading>
    <BaseHeading as="h2" :level="2">
      Heading 2
    </BaseHeading>
    <BaseHeading as="h3" :level="3">
      Heading 3
    </BaseHeading>
  </div>
</template>

<script>
export default {
  layout: 'components',
  data () {
    return {
      form: {}
    }
  }
}
</script>
