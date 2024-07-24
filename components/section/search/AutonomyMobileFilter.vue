<template>
  <div>
    <BaseToggle
      size="md"
      :modelValue="isAutonomy"
      label="Missions à réaliser de votre côté sans présence obligatoire"
      @update:modelValue="handleToggle"
    />
  </div>
</template>

<script>
import MixinAutonomyFilter from '@/mixins/search/mission/autonomy-filter'

export default defineNuxtComponent({
  mixins: [MixinAutonomyFilter],
})
</script>
