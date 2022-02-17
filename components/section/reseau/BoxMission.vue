<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Missions
      </div>
      <Link :to="`/admin/missions?filter[ofReseau]=${reseau.id}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs" :loading="!stats">
      <template v-if="stats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ stats.missions_available }}
          </div>
          <div>
            <div class="font-semibold">
              {{ stats.missions_available | pluralize('mission', 'missions', false) }} en ligne
            </div>
            <div class="text-gray-500 -mt-1">
              sur {{ stats.missions_total| pluralize('mission') }}
            </div>
          </div>
        </div>
        <template v-if="stats.missions_state['En attente de validation'] > 0">
          <div class="border-t -mx-6 mt-6 mb-4" />
          <nuxt-link :to="`/admin/missions?filter[ofReseau]=${reseau.id}&filter[state]=En attente de validation`" class="flex justify-center items-center text-sm text-jva-orange-500 font-medium hover:underline">
            {{ stats.missions_state['En attente de validation']| pluralize('mission') }} en attente de validation <ChevronRightIcon class="h-3 w-3 ml-2" />
          </nuxt-link>
        </template>
      </template>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    reseau: {
      type: Object,
      required: true
    },
    stats: {
      type: Object,
      default: null
    }
  }
}
</script>
