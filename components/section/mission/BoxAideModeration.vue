<template>
  <BaseBox padding="sm" :loading="loading">
    <template #header>
      <div class="flex gap-6 border-b border-gray-100 pb-6 mb-6">
        <div
          class="bg-[#E9F7FF] border-[#CCE0EB] border h-[56px] w-[56px] flex-none flex items-center justify-center"
        >
          <div class="text-[30px]">🧞‍♂️</div>
        </div>
        <div>
          <div class="text-lg text-gray-900 font-bold">On peut vous aider à modérer ?</div>
          <div class="text-sm text-gray-600">Vérifiez les alertes remontées par l’outil 🔍</div>
        </div>
      </div>
    </template>
    <div v-if="hasResults" class="grid grid-cols-1 gap-6">
      <DisclosureModerationAI :mission="mission" />
      <DisclosureWarningWords :mission="mission" />

      <BaseDisclosure v-if="commitmentIsHigh">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#C9191E] fill-current mr-2" aria-hidden="true" />
              Fréquence d’engagement élevée
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <RiIndeterminateCircleLine
              v-if="isOpen"
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
            <RiAddCircleLine
              v-else
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          <template v-if="mission.commitment__duration">
            Fréquence :
            <span>{{ $filters.label(mission.commitment__duration, 'duration') }}</span>
            <template v-if="mission.commitment__time_period">
              <span class="font-normal"> par </span>
              <span>{{ $filters.label(mission.commitment__time_period, 'time_period') }}</span>
            </template>
          </template>
        </div>
      </BaseDisclosure>

      <BaseDisclosure v-if="needReviewTitle">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" />
              Le titre n’est pas conforme
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <RiIndeterminateCircleLine
              v-if="isOpen"
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
            <RiAddCircleLine
              v-else
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          Le titre doit être à la première personne du singulier. Par exemple, “Je témoigne de mon
          métier et de mon parcours”.
        </div>
      </BaseDisclosure>

      <BaseDisclosure v-if="tooManyParticipationsMax">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" />
              Nombre de places important
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <RiIndeterminateCircleLine
              v-if="isOpen"
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
            <RiAddCircleLine
              v-else
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          <div>Nombre de places : {{ mission.participations_max }}</div>
          <div v-if="score">Score de réactivité : {{ score.total_points }}</div>
        </div>
      </BaseDisclosure>

      <BaseDisclosure v-if="startDateInPastAndNoFrequency">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" />
              Date de début passée
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <RiIndeterminateCircleLine
              v-if="isOpen"
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
            <RiAddCircleLine
              v-else
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          Date de début : {{ $dayjs(mission.start_date).format('DD/MM/YYYY') }}
        </div>
      </BaseDisclosure>
    </div>
    <div v-else class="text-sm text-gray-500">
      Rien à signaler, tout semble correct, mais rien ne vaut une vérification humaine.
    </div>
  </BaseBox>
</template>

<script>
import DisclosureWarningWords from '@/components/section/mission/DisclosureWarningWords.vue'
import DisclosureModerationAI from '@/components/section/mission/DisclosureModerationAI.vue'
import MixinAideModeration from '@/mixins/mission-aide-moderation'

export default defineNuxtComponent({
  components: {
    DisclosureModerationAI,
    DisclosureWarningWords,
  },
  mixins: [MixinAideModeration],
  props: {
    mission: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: 'Aide à la modération',
    },
  },
  data() {
    return {
      score: null,
      loading: false,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await this.fetchAIReportScore()
      if (this.tooManyParticipationsMax) {
        const score = await apiFetch(`/structures/${this.mission.structure_id}/score`)
        this.score = score
      }
      this.loading = false
    },
  },
})
</script>
