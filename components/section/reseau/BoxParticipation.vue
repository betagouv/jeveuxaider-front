<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Participations</div>
      <BaseLink
        :to="`/admin/participations?filter[ofReseau]=${reseau.id}&reseau_name=${reseau.name}`"
        icon="RiArrowRightSLine"
      >
        Consulter
      </BaseLink>
    </div>
    <BaseBox variant="flat" padding="xs" :loading="!stats">
      <template v-if="stats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ stats.participations_state['Validée'] }}
          </div>
          <div>
            <div class="font-semibold">
              {{
                $filters.pluralize(
                  stats.participations_state['Validée'],
                  'participation validée',
                  'participations validées',
                  false
                )
              }}
            </div>
            <div class="text-gray-500 -mt-1">
              sur
              {{ $filters.pluralize(stats.participations, 'participation') }}
            </div>
          </div>
        </div>
        <template v-if="stats.participations_state['En attente de validation'] > 0">
          <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
          <nuxt-link
            no-prefetch
            :to="`/admin/participations?filter[ofReseau]=${reseau.id}&reseau_name=${reseau.name}&filter[state]=En attente de validation`"
            class="flex justify-center items-center text-sm text-jva-orange-500 font-medium"
          >
            {{
              $filters.pluralize(
                stats.participations_state['En attente de validation'],
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
    reseau: {
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
