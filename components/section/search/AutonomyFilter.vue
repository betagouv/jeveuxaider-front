<template>
  <Tag
    v-if="isPresentiel"
    v-tooltip="{
      content: 'Mission à réaliser de votre côté sans présence obligatoire.',
      classes: 'theme-white',
      hideOnTargetClick: true,
      placement: 'bottom',
      offset: 8
    }"
    as="button"
    size="md"
    context="selectable"
    :is-selected="isAutonomy"
    is-selected-class="border-gray-50 bg-gray-50"
    @click.native="handleToggle"
  >
    En autonomie
  </Tag>
</template>

<script>
import MixinAutonomyFilter from '@/mixins/search/mission/autonomy-filter'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Tag
  },
  mixins: [MixinAutonomyFilter]
}
</script>
