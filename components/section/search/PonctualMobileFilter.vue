<template>
  <div>
    <BaseToggle
      size="md"
      :modelValue="isPonctual"
      label="Missions ne nécéssitant pas un engagement récurrent"
      @update:modelValue="handleToggle"
    />
  </div>
</template>

<script>
import MixinPonctualFilter from '@/mixins/search/mission/ponctual-filter'

export default defineNuxtComponent({
  mixins: [MixinPonctualFilter],
})
</script>
