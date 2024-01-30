<template>
  <div class="flex items-center space-x-3">
    <DsfrBadge size="sm" :type="badgeTypeOrganisationSate">
      {{ organisation.state }}
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
import MixinOrganisation from '@/mixins/organisation'

export default defineNuxtComponent({
  mixins: [MixinOrganisation],
  props: {
    organisation: {
      type: Object,
      required: true,
    },
  },
})
</script>
