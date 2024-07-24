<template>
  <div class="flex items-center space-x-3">
    <DsfrBadge size="sm" :type="badgeTypeOrganisationSate">
      {{ organisation.state }}
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
