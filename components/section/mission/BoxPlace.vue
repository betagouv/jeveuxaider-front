<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Places
      </div>
      <Link to="/admin/participations" icon="ChevronRightIcon" class="opacity-25">
        Participations
      </Link>
    </div>
    <Box variant="flat" padding="xs">
      <div class="flex items-center">
        <div class="text-4xl font-semibold pr-4">
          {{ mission.places_left }}
        </div>
        <div>
          <div class="font-semibold">
            {{ mission.places_left | pluralize('place restante', 'places restantes', false) }}
          </div>
          <div class="text-gray-500 -mt-1">
            {{ mission.participations_max - mission.places_left }} sur {{ mission.participations_max }}
          </div>
        </div>
      </div>
      <div class="border-t -mx-6 mt-6 mb-4" />
      <div class="flex justify-center text-sm opacity-25">
        <Link>
          Trouver des bénévoles
        </Link>
      </div>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    mission: {
      type: Object,
      required: true
    }
  }
}
</script>
