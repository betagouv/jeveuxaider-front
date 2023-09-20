<template>
  <DsfrTag
    as="button"
    size="md"
    context="selectable"
    :is-selected="isPonctual"
    is-selected-class="border-gray-50 bg-gray-50"
    @click.native="handleToggle"
  >
    Missions courtes
  </DsfrTag>
</template>

<script>
import MixinPonctualFilter from '@/mixins/search/mission/ponctual-filter'

export default defineNuxtComponent({
  mixins: [MixinPonctualFilter],
})
</script>
