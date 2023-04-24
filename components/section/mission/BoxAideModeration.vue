<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="flex uppercase font-semibold text-gray-600">
        <RiFlashlightLine class="h-5 w-5 fill-current mr-2" aria-hidden="true" /> Aide à la modération
      </div>
      <slot name="action" />
    </div>

    <Box variant="flat" padding="xs" :loading="loading">
      <div v-if="hasResults" class="flex space-y-2 flex-col">
        <Disclosure v-if="score">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiCloseLine v-if="score.score < 50" class="h-5 w-5 text-red-600 fill-current mr-2" aria-hidden="true" />
                <RiAlertFill v-else-if="score.score < 75" class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" />
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

        <Disclosure v-if="needReviewTitle">
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

        <Disclosure v-if="tooManyParticipationsMax">
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

        <Disclosure v-if="startDateInPass">
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

        <Disclosure v-if="endDateToBig">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> Durée de mission élevée : {{ $dayjs(mission.end_date).diff($dayjs(mission.start_date), 'year') }} ans
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm text-gray-500">
            La durée de la mission semble élevée : {{ $dayjs(mission.end_date).diff($dayjs(mission.start_date), 'year') }} ans.<br>
            Début de mission : {{ $dayjs(mission.start_date).format('DD/MM/YYYY') }}<br>
            Fin de mission : {{ $dayjs(mission.end_date).format('DD/MM/YYYY') }}
          </div>
        </Disclosure>

        <Disclosure v-if="tooManyTotalHours">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> Durée d'engagement excessive
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm text-gray-500">
            La durée d'engagement semble excessive:
            <template v-if="mission.commitment__duration">
              <span>{{ mission.commitment__duration|label('duration') }}</span>
              <template v-if="mission.commitment__time_period">
                <span class="font-normal"> par </span>
                <span>{{ mission.commitment__time_period|label('time_period') }}</span>
              </template>
            </template>. Soit {{ mission.commitment__total }} heures réparties sur l'année.
          </div>
        </Disclosure>

        <DisclosureModerationAI :mission="mission" />
      </div>
      <div v-else class="text-sm text-gray-500">
        Rien à signaler
      </div>
    </Box>
  </div>
</template>

<script>
import ScoreDetails from '~/components/section/organisation/ScoreDetails.vue'
import DisclosureModerationAI from '~/components/section/mission/DisclosureModerationAI.vue'

export default {
  components: {
    ScoreDetails,
    DisclosureModerationAI
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
    hasResults () {
      return true
    },
    tooManyTotalHours () {
      return this.mission.commitment__total > 1000
    },
    tooManyParticipationsMax () {
      return this.mission.participations_max > 70
    },
    needReviewTitle () {
      return !this.mission.name.match(/^(Je|J'|J’)/)
    },
    startDateInPass () {
      return ['Brouillon', 'En attente de validation', 'En cours de traitement'].includes(this.mission.state) && this.$dayjs().isAfter(this.mission.start_date)
    },
    endDateToBig () {
      return this.mission.end_date && this.$dayjs(this.mission.end_date).diff(this.$dayjs(this.mission.start_date), 'year') > 5
    }
  }
}
</script>
