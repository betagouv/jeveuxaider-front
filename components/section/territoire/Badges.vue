<template>
  <div class="flex items-center space-x-3">
    <DsfrBadge size="sm" :type="badgeTypeTerritoireSate">
      {{ $filters.label(territoire.state, 'territoire_workflow_states') }}
    </DsfrBadge>
    <DsfrBadge size="sm" type="gray">
      <div class="flex items-center">
        <div
          :class="['h-2 w-2  rounded-full mr-1', hasPageOnline ? 'bg-green-600' : 'bg-red-600']"
        ></div>
        {{ hasPageOnline ? 'En ligne' : 'Hors ligne' }}
      </div>
    </DsfrBadge>
  </div>
</template>

<script>
import MixinTerritoire from '@/mixins/territoire'

export default defineNuxtComponent({
  mixins: [MixinTerritoire],
  props: {
    territoire: {
      type: Object,
      required: true,
    },
  },
})
</script>
