<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Participations
      </div>
      <Link :to="`/admin/participations?filter[ofDomaine]=${domaine.id}&domaine_name=${domaine.name}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs" :loading="!stats">
      <template v-if="stats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ stats.participations_validated_count }}
          </div>
          <div>
            <div class="font-semibold">
              {{ stats.participations_validated_count | pluralize('participation validée', 'participations validées', false) }}
            </div>
            <div class="text-gray-500 -mt-1">
              sur {{ stats.participations_count| pluralize('participation') }}
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
    domaine: {
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
