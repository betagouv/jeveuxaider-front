<template>
  <Tag
    as="button"
    size="md"
    context="selectable"
    :is-selected="isPonctual"
    is-selected-class="border-gray-50 bg-gray-50"
    @click.native="handleToggle"
  >
    Missions courtes
  </Tag>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'
import MixinPonctualFilter from '@/mixins/search/mission/ponctual-filter'

export default {
  components: {
    Tag
  },
  mixins: [MixinPonctualFilter]
}
</script>
