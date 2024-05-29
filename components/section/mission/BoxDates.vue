<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        {{ title }}
      </div>
      <BaseLink :to="`/admin/missions/${mission.id}/dates`" icon="RiArrowRightSLine">
        Modifier
      </BaseLink>
    </div>

    <BaseBox variant="flat" :padding="false">
      <BaseStackedList>
        <BaseStackedListItem class="px-4" icon="🗓">
          <div class="text-gray-900 font-semibold">
            {{ formattedDates }}
          </div>
          <div class="text-gray-500 text-sm">
            {{ formattedCommitment ? formattedCommitment : 'Engagement non spécifié' }}
          </div>
        </BaseStackedListItem>
        <BaseStackedListItem v-if="hasExpired" class="px-4" icon="⏰">
          <div class="text-gray-900 font-semibold">La date de la mission a expiré</div>
          <div class="text-gray-500 text-sm">Changez son statut ou modifiez la date de fin</div>
        </BaseStackedListItem>
      </BaseStackedList>
    </BaseBox>
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'

export default defineNuxtComponent({
  mixins: [MixinMission],
  props: {
    mission: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: 'Dates de la mission',
    },
  },
})
</script>
