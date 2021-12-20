<template>
  <div class="space-y-12">
    <Heading as="h2" :level="3" class="mb-8">
      Blocks
    </Heading>
    <BoxItem
      icon="💪"
      title="Je veux devenir<br><strong>bénévole</strong>"
      subtitle="Citoyens français et résidents réguliers (mineurs inclus)"
    />
  </div>
</template>

<script>

import BoxItem from '@/components/section/inscription/BoxItem'

export default {
  components: {
    BoxItem
  },
  layout: 'design-system',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
