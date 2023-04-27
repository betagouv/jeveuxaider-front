<template>
  <Box padding="sm" :loading="loading">
    <template #header>
      <div class="flex gap-6 border-b border-gray-100 pb-6 mb-6">
        <div class="bg-[#E9F7FF] border-[#CCE0EB] border h-[56px] w-[56px] flex-none flex items-center justify-center">
          <div class="text-[30px]">
            🧞‍♂️
          </div>
        </div>
        <div>
          <div class="text-lg text-gray-900 font-bold">
            On peut vous aider à modérer ?
          </div>
          <div class="text-sm text-gray-600">
            Vérifiez les alertes remontées par notre système d’intelligence artificielle 🤖
          </div>
        </div>
      </div>
    </template>
    <div v-if="isLoadingOrhasResults" class="flex space-y-6 flex-col">
      <DisclosureModerationAI v-if="showModerationAI" :mission="mission" @analyzed="loadingModerationAI = false" @hide="showModerationAI = false" />

      <Disclosure v-if="frequenceTotalHours">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#C9191E] fill-current mr-2" aria-hidden="true" /> Fréquence d’engagement élevée
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          <template v-if="mission.commitment__duration">
            Fréquence : <span>{{ mission.commitment__duration|label('duration') }}</span>
            <template v-if="mission.commitment__time_period">
              <span class="font-normal"> par </span>
              <span>{{ mission.commitment__time_period|label('time_period') }}</span>
            </template>
          </template>
        </div>
      </Disclosure>

      <Disclosure v-if="needReviewTitle">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> Titre non conforme
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          {{ mission.name }}
        </div>
      </Disclosure>

      <Disclosure v-if="tooManyParticipationsMax">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> Nombre de places important
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          <div>Nombre de places : {{ mission.participations_max }}</div>
          <div v-if="score">
            Score de réactivité : {{ score.score }}
          </div>
        </div>
      </Disclosure>

      <Disclosure v-if="startDateInPass">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> Date de début passée
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          Date de début :  {{ $dayjs(mission.start_date).format('DD/MM/YYYY') }}
        </div>
      </Disclosure>
    </div>
    <div v-else class="text-sm text-gray-500">
      Rien à signaler, tout semble correct, mais rien ne vaut une vérification humaine.
    </div>
  </Box>
</template>

<script>
import DisclosureModerationAI from '~/components/section/mission/DisclosureModerationAI.vue'

export default {
  components: {
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
      loading: false,
      loadingModerationAI: true,
      maxPlaces: 70,
      showModerationAI: true
    }
  },
  async fetch () {
    this.loading = true
    if (this.mission.participations_max > this.maxPlaces) {
      const { data: score } = await this.$axios.get(`/structures/${this.mission.structure_id}/score`)
      this.score = score
    }
    this.loading = false
  },
  computed: {
    isLoadingOrhasResults () {
      return this.loadingModerationAI || this.showModerationAI || this.frequenceTotalHours || this.tooManyParticipationsMax || this.needReviewTitle || this.startDateInPass
    },
    frequenceTotalHours () {
      return this.mission.commitment__total > 1091
    },
    tooManyParticipationsMax () {
      return this.mission.participations_max > this.maxPlaces
    },
    needReviewTitle () {
      return !this.mission.name.match(/^(Je|J'|J’)/)
    },
    startDateInPass () {
      return ['Brouillon', 'En attente de validation', 'En cours de traitement'].includes(this.mission.state) && this.$dayjs().isAfter(this.mission.start_date)
    }
  }
}
</script>
