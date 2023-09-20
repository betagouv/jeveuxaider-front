<template>
  <div>
    <BaseToggle
      size="md"
      :modelValue="isMinors"
      label="Missions ouvertes aux mineurs"
      @update:modelValue="handleToggle"
    />
  </div>
</template>

<script>
import MixinMinorsFilter from '@/mixins/search/mission/minors-filter'

export default defineNuxtComponent({
  mixins: [MixinMinorsFilter],
})
</script>
