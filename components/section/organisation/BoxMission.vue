<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Missions</div>
      <BaseLink
        :to="`/admin/missions?filter[structure.id]=${organisation.id}&organisation_name=${organisation.name}`"
        icon="RiArrowRightSLine"
      >
        Consulter
      </BaseLink>
    </div>
    <BaseBox variant="flat" padding="xs" :loading="!organisationStats">
      <template v-if="organisationStats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ organisationStats.missions_available }}
          </div>
          <div>
            <div class="font-semibold">
              {{
                $filters.pluralize(
                  organisationStats.missions_available,
                  'mission',
                  'missions',
                  false
                )
              }}
              en ligne
            </div>
            <div class="text-gray-500 -mt-1">
              sur
              {{ $filters.pluralize(organisationStats.missions_total, 'mission') }}
            </div>
          </div>
        </div>
        <template v-if="organisationStats.missions_state['En attente de validation'] > 0">
          <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
          <nuxt-link
            no-prefetch
            :to="`/admin/missions?filter[structure.id]=${organisation.id}&filter[state]=En attente de validation`"
            class="flex justify-center items-center text-sm text-jva-orange-500 font-medium hover:underline"
          >
            {{
              $filters.pluralize(
                organisationStats.missions_state['En attente de validation'],
                'mission'
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
