<template>
  <DsfrTag
    as="button"
    size="md"
    context="selectable"
    :is-selected="isMinors"
    is-selected-class="border-gray-50 bg-gray-50"
    @click.native="handleToggle"
  >
    Ouverte aux mineurs
  </DsfrTag>
</template>

<script>
import MixinMinorsFilter from '@/mixins/search/mission/minors-filter'

export default defineNuxtComponent({
  mixins: [MixinMinorsFilter],
})
</script>
