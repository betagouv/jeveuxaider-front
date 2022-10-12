<template>
  <BadgeFilter
    :is-active="isMinors"
    class="cursor-pointer"
    @click.native="handleToggle"
  >
    <span :class="[{'text-jva-blue-500': isMinors}]">Ouverte aux mineurs</span>
  </BadgeFilter>
</template>

<script>
import BadgeFilter from '~/components/search/BadgeFilter.vue'
import MixinMinorsFilter from '@/mixins/search/mission/minors-filter'

export default {
  components: {
    BadgeFilter
  },
  mixins: [MixinMinorsFilter]
}
</script>
