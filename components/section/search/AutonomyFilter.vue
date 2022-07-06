<template>
  <BadgeFilter
    v-if="isPresentiel"
    v-tooltip="{
      content: 'Mission à réaliser de votre côté sans présence obligatoire.',
      classes: 'theme-white',
      hideOnTargetClick: true,
      placement: 'bottom',
      offset: 8
    }"
    :is-active="isAutonomy"
    class="cursor-pointer"
    @click.native="handleToggle"
  >
    <span :class="[{'text-jva-blue-500': isAutonomy}]">En autonomie</span>
  </BadgeFilter>
</template>

<script>
import BadgeFilter from '~/components/search/BadgeFilter.vue'
import MixinAutonomyFilter from '@/mixins/search/mission/autonomy-filter'

export default {
  components: {
    BadgeFilter
  },
  mixins: [MixinAutonomyFilter]
}
</script>
