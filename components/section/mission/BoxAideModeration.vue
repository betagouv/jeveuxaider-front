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
            Alertes, points de vigilance, l’IA c’est plus fort que toi.
          </div>
        </div>
      </div>
    </template>
    <div v-if="hasResults" class="flex space-y-6 flex-col">
      <DisclosureModerationAI :mission="mission" />

      <Disclosure v-if="hasLinkOrPhoneInText">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#C9191E] fill-current mr-2" aria-hidden="true" /> Lien externe dans la description
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          XXX
        </div>
      </Disclosure>

      <Disclosure v-if="frequenceTotalHours">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#C9191E] fill-current mr-2" aria-hidden="true" /> Fréquence d’engagement incohérente
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          La fréquence d’engagement semble incohérente:
          <template v-if="mission.commitment__duration">
            <span>{{ mission.commitment__duration|label('duration') }}</span>
            <template v-if="mission.commitment__time_period">
              <span class="font-normal"> par </span>
              <span>{{ mission.commitment__time_period|label('time_period') }}</span>
            </template>
          </template>. Soit {{ mission.commitment__total }} heures réparties sur l'année.
        </div>
      </Disclosure>

      <Disclosure v-if="needReviewTitle">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> Titre qui ne commence pas par « Je / J' »
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
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> Nombre de bénévoles recherchés : {{ mission.participations_max }}
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
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> Date de début déjà passée : {{ $dayjs(mission.start_date).format('DD/MM/YYYY') }}
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
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> Durée de mission élevée : {{ $dayjs(mission.end_date).diff($dayjs(mission.start_date), 'year') }} ans
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
    </div>
    <div v-else class="text-sm text-gray-500">
      Rien à signaler
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
      loading: false
    }
  },
  computed: {
    hasResults () {
      return this.hasLinkOrPhoneInText || this.frequenceTotalHours || this.tooManyParticipationsMax || this.needReviewTitle || this.startDateInPass || this.endDateToBig
    },
    frequenceTotalHours () {
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
    },
    textToAnalyze () {
      let text = this.mission.name + '|' + this.mission.objectif + '|' + this.mission.description + '|' + this.mission.information + (this.mission.prerequisites ? '|' + this.mission.prerequisites.join(' | ') : '')
      text = text.replace(/<\/li>/g, '</li>|')
      text = text.replace(/<\/?[^>]+(>|$)/g, '')
      return text
    },
    hasLinkOrPhoneInText () {
      return false
    }
  }
}
</script>
