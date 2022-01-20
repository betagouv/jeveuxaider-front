<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Participations
      </div>
      <Link :to="`/admin/participations?filter[structure.name]=${organisation.name}`" icon="ChevronRightIcon" class="opacity-25">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs" :loading="!organisationStats">
      <template v-if="organisationStats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ organisationStats.participations_state['Validée'] }}
          </div>
          <div>
            <div class="font-semibold">
              {{ organisationStats.participations_state['Validée'] | pluralize('participation validée', 'participations validées', false) }}
            </div>
            <div class="text-gray-500 -mt-1">
              sur {{ organisationStats.participations_total| pluralize('participation') }}
            </div>
          </div>
        </div>
        <template v-if="organisationStats.participations_state['En attente de validation'] > 0">
          <div class="border-t -mx-6 mt-6 mb-4" />
          <nuxt-link :to="`/admin/participations?filter[structure.name]=${organisation.name}&filter[state]=En attente de validation`" class="flex justify-center items-center text-sm text-jva-orange-500 font-medium">
            {{ organisationStats.participations_state['En attente de validation']| pluralize('participation') }} en attente de validation <ChevronRightIcon class="h-3 w-3 ml-2" />
          </nuxt-link>
        </template>
      </template>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    organisation: {
      type: Object,
      required: true
    },
    organisationStats: {
      type: Object,
      default: null
    }
  }
}
</script>
