<template>
  <div>
    <Toggle
      size="md"
      :value="isPonctual"
      label="Missions ne nécéssitant pas un engagement récurrent"
      @input="handleToggle"
    />
  </div>
</template>

<script>
import MixinPonctualFilter from '@/mixins/search/mission/ponctual-filter'

export default {
  mixins: [MixinPonctualFilter]
}
</script>
