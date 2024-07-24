<template>
  <DsfrTag
    as="button"
    size="md"
    context="selectable"
    :is-active="isMinors"
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
