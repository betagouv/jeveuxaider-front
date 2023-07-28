<template>
  <div>
    <Toggle
      size="md"
      :value="isMinors"
      label="Missions ouvertes aux mineurs"
      @input="handleToggle"
    />
  </div>
</template>

<script>
import MixinMinorsFilter from '@/mixins/search/mission/minors-filter'

export default {
  mixins: [MixinMinorsFilter]
}
</script>
