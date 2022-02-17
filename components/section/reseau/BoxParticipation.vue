<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Participations
      </div>
      <Link :to="`/admin/participations?filter[ofReseau]=${reseau.id}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs" :loading="!stats">
      <template v-if="stats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ stats.participations_state['Validée'] }}
          </div>
          <div>
            <div class="font-semibold">
              {{ stats.participations_state['Validée'] | pluralize('participation validée', 'participations validées', false) }}
            </div>
            <div class="text-gray-500 -mt-1">
              sur {{ stats.participations_total| pluralize('participation') }}
            </div>
          </div>
        </div>
        <template v-if="stats.participations_state['En attente de validation'] > 0">
          <div class="border-t -mx-6 mt-6 mb-4" />
          <nuxt-link :to="`/admin/participations?filter[ofReseau]=${reseau.name}&filter[state]=En attente de validation`" class="flex justify-center items-center text-sm text-jva-orange-500 font-medium">
            {{ stats.participations_state['En attente de validation']| pluralize('participation') }} en attente de validation <ChevronRightIcon class="h-3 w-3 ml-2" />
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
