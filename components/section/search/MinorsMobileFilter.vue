<template>
  <div>
    <Toggle
      :value="isMinors"
      label="Mission ouverte aux mineurs"
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
