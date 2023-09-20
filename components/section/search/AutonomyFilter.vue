<template>
  <DsfrTag
    v-if="isPresentiel"
    v-tooltip="{
      content: 'Mission à réaliser de votre côté sans présence obligatoire.',
      theme: 'white',
      placement: 'bottom',
      distance: 8,
    }"
    as="button"
    size="md"
    context="selectable"
    :is-selected="isAutonomy"
    is-selected-class="border-gray-50 bg-gray-50"
    @click.native="handleToggle"
  >
    En autonomie
  </DsfrTag>
</template>

<script>
import MixinAutonomyFilter from '@/mixins/search/mission/autonomy-filter'

export default defineNuxtComponent({
  mixins: [MixinAutonomyFilter],
})
</script>
