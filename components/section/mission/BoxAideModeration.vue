<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="flex uppercase font-semibold text-gray-600">
        <RiFlashlightLine class="h-5 w-5 fill-current mr-2" aria-hidden="true" /> Aide à la modération
      </div>
      <slot name="action" />
    </div>

    <Box variant="flat" padding="xs">
      <div class="flex space-y-2 flex-col">
        <Disclosure v-if="score">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill v-if="score.score < 70" class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" />
                <RiCheckLine v-else class="h-5 w-5 text-green-700 fill-current mr-2" aria-hidden="true" />
                Score de réactivité : {{ score.score }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm">
            <ScoreDetails :score="score" />
          </div>
        </Disclosure>

        <Disclosure v-if="mission.participations_max > 70">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> Titre qui ne commence pas par « Je / J' »
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm text-gray-500">
            Tous les titres des missions doivent commencer par « Je » ou « J' » suivi d'un verbe d'action.
          </div>
        </Disclosure>

        <Disclosure v-if="mission.participations_max > 70">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> Nombre de bénévoles recherchés : {{ mission.participations_max }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm text-gray-500">
            Le nombre de bénévoles recherchés semble élevé !
          </div>
        </Disclosure>

        <Disclosure v-if="$dayjs().isAfter(mission.start_date)">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> Date de début déjà passée : {{ $dayjs(mission.start_date).format('DD/MM/YYYY') }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm text-gray-500">
            La date de début de la mission est déjà passée.
          </div>
        </Disclosure>

        <Disclosure v-if="mission.end_date && $dayjs(mission.end_date).diff($dayjs(), 'year') > 5">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> Date de fin très éloignée : {{ $dayjs(mission.end_date).format('DD/MM/YYYY') }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm text-gray-500">
            La date de fin de la mission semble très éloignée : {{ $dayjs(mission.end_date).diff($dayjs(), 'year') }} ans.
          </div>
        </Disclosure>
      </div>
    </Box>
  </div>
</template>

<script>
import ScoreDetails from '~/components/section/organisation/ScoreDetails.vue'

export default {
  components: {
    ScoreDetails
  },
  props: {
    mission: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: 'Aide à la modération'
    }
  },
  data () {
    return {
      score: null,
      loading: true
    }
  },
  async fetch () {
    this.loading = true
    const { data: score } = await this.$axios.get(`/structures/${this.mission.structure_id}/score`)
    this.score = score
    this.loading = false
  },
  computed: {

  }
}
</script>
