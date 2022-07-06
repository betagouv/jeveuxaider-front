<template>
  <div>
    <Toggle
      :value="isAutonomy"
      label="Mission à réaliser de votre côté sans présence obligatoire."
      @input="handleToggle"
    />
  </div>
</template>

<script>
import MixinAutonomyFilter from '@/mixins/search/mission/autonomy-filter'

export default {
  mixins: [MixinAutonomyFilter]
}
</script>
