<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Missions
      </div>
      <Link v-if="$store.getters.contextRole === 'admin'" :to="`/admin/missions?filter[ofTerritoire]=${territoire.id}&territoire_name=${territoire.name}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs" :loading="!stats">
      <template v-if="stats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ stats.missions_available_count }}
          </div>
          <div>
            <div class="font-semibold">
              {{ stats.missions_available_count | pluralize('mission', 'missions', false) }} en ligne
            </div>
            <div class="text-gray-500 -mt-1">
              sur {{ stats.missions_count| pluralize('mission') }}
            </div>
          </div>
        </div>
      </template>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    territoire: {
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
