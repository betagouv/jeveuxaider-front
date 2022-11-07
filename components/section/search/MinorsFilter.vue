<template>
  <Tag
    as="button"
    size="md"
    context="selectable"
    :is-selected="isMinors"
    is-selected-class="border-gray-50 bg-gray-50"
    @click.native="handleToggle"
  >
    Ouverte aux mineurs
  </Tag>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'
import MixinMinorsFilter from '@/mixins/search/mission/minors-filter'

export default {
  components: {
    Tag
  },
  mixins: [MixinMinorsFilter]
}
</script>
