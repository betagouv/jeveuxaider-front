<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Missions</div>
      <BaseLink
        :to="`/admin/missions?filter[ofTemplate]=${missionTemplate.id}&template_name=${missionTemplate.title}`"
        icon="RiArrowRightSLine"
      >
        Consulter
      </BaseLink>
    </div>
    <BaseBox variant="flat" padding="xs" :loading="!stats">
      <template v-if="stats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ stats.missions_available_count }}
          </div>
          <div>
            <div class="font-semibold">
              {{ $filters.pluralize(stats.missions_available_count, 'mission', 'missions', false) }}
              en ligne
            </div>
            <div class="text-gray-500 -mt-1">
              sur {{ $filters.pluralize(stats.missions_count, 'mission') }}
            </div>
          </div>
        </div>
      </template>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    missionTemplate: {
      type: Object,
      required: true,
    },
    stats: {
      type: Object,
      default: null,
    },
  },
})
</script>
