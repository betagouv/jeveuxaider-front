<template>
  <div class="text-center">
    <div class="text-xs text-[#666666]">
      {{ $dayjs(message.created_at).format('D MMM HH[h]mm') }}
    </div>
    <div v-if="badge" class="">
      <span class="text-[#161616] font-bold">La participation est</span>
      <Badge
        size="sm"
        :type="badge.type"
        :no-icon="true"
        class="ml-2"
      >
        {{ badge.label }}
      </Badge>
      <span v-if="badge.append" class="ml-2 text-[#161616] font-bold">{{ badge.append }}</span>
    </div>
    <div v-if="message.contextual_reason && message.contextual_reason != 'other'" class="text-sm text-[#666666]">
      <template v-if="message.contextual_state == 'Refusée'">
        {{ message.contextual_reason|label('participation_declined_reasons') }}
      </template>
      <template v-if="message.contextual_state == 'Annulée par bénévole'">
        {{ message.contextual_reason|label('participation_canceled_by_benevole_reasons') }}
      </template>
    </div>
  </div>
</template>

<script>
import Badge from '@/components/dsfr/Badge.vue'

export default {
  components: {
    Badge
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    badge () {
      switch (this.message.contextual_state) {
        case 'Refusée':
          return { type: 'error', label: 'Refusée' }
        case 'Validée':
          return { type: 'success', label: 'Validée' }
        case 'Validée par bénévole':
          return { type: 'success', label: 'Validée', append: 'par le bénévole' }
        case 'Annulée':
        case 'Annulée par bénévole':
          return { type: 'error', label: 'Annulée', append: 'par le bénévole' }
        case 'En attente de validation':
          return { type: 'warning', label: 'En attente de validation' }
        case 'En cours de traitement':
          return { type: 'warning', label: 'En cours de traitement' }
        default:
          return null
      }
    }
  }
}
</script>

<style>

</style>
