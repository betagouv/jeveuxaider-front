<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Participations</div>
      <BaseLink
        :to="`/admin/participations?filter[mission.structure.name]=${organisation.name}&filter[mission.structure.id]=${organisation.id}`"
        icon="RiArrowRightSLine"
      >
        Consulter
      </BaseLink>
    </div>
    <BaseBox variant="flat" padding="xs" :loading="!organisationStats">
      <template v-if="organisationStats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ organisationStats.participations_state['Validée'] }}
          </div>
          <div>
            <div class="font-semibold">
              {{
                $filters.pluralize(
                  organisationStats.participations_state['Validée'],
                  'participation validée',
                  'participations validées',
                  false
                )
              }}
            </div>
            <div class="text-gray-500 -mt-1">
              sur
              {{ $filters.pluralize(organisationStats.participations_total, 'participation') }}
            </div>
          </div>
        </div>
        <template v-if="organisationStats.participations_state['En attente de validation'] > 0">
          <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
          <nuxt-link
            no-prefetch
            :to="`/admin/participations?filter[mission.structure.name]=${organisation.name}&filter[mission.structure.id]=${organisation.id}&filter[state]=En attente de validation`"
            class="flex justify-center items-center text-sm text-jva-orange-500 font-medium"
          >
            {{
              $filters.pluralize(
                organisationStats.participations_state['En attente de validation'],
                'participation'
              )
            }}
            en attente de validation <RiArrowRightLine class="h-3 w-3 ml-2" />
          </nuxt-link>
        </template>
      </template>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    organisation: {
      type: Object,
      required: true,
    },
    organisationStats: {
      type: Object,
      default: null,
    },
  },
})
</script>
