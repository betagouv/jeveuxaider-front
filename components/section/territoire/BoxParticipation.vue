<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Participations</div>
      <BaseLink
        v-if="$stores.auth.contextRole === 'admin'"
        :to="`/admin/participations?filter[ofTerritoire]=${territoire.id}&territoire_name=${territoire.name}`"
        icon="RiArrowRightSLine"
      >
        Consulter
      </BaseLink>
    </div>
    <BaseBox variant="flat" padding="xs" :loading="!stats">
      <template v-if="stats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ stats.participations_validated_count }}
          </div>
          <div>
            <div class="font-semibold">
              {{
                $filters.pluralize(
                  stats.participations_validated_count,
                  'participation validée',
                  'participations validées',
                  false
                )
              }}
            </div>
            <div class="text-gray-500 -mt-1">
              sur
              {{ $filters.pluralize(stats.participations_count, 'participation') }}
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
    territoire: {
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
