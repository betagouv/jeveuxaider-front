<template>
  <DsfrTag
    as="button"
    size="md"
    context="selectable"
    :is-active="isPonctual"
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
