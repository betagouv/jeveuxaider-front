<template>
  <div class="text-center">
    <div class="text-xs text-[#666666]">
      {{ $dayjs(message.created_at).format('D MMM HH[h]mm') }}
    </div>
    <div v-if="badge" class="">
      <span class="text-[#161616] font-bold">{{ badge.prepend }}</span>
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
        <template v-if="message.contextual_reason == 'user_unsubscribed'">
          L'utilisateur s'est désinscrit de la plateforme
        </template>
        <template v-else>
          {{ message.contextual_reason|label('participation_canceled_by_benevole_reasons') }}
        </template>
      </template>
      <template v-if="message.contextual_state == 'Désinscription'">
        L'utilisateur s'est désinscrit de la plateforme
      </template>
      <template v-if="message.contextual_state == 'Automatiquement déclinée par la plateforme'">
        <template v-if="message.contextual_reason == 'not_regular_resident'">
          L'utilisateur ne réside pas sur le territoire français
        </template>
        <template v-if="message.contextual_reason == 'younger_than_16'">
          L'utilisateur est agé de moins de 16 ans
        </template>
        <template v-if="message.contextual_reason == 'inappropriate_behavior'">
          L'utilisateur a un comportement inadapté (insulte, propos discriminatoires / racistes, …)
        </template>
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
          return { prepend: 'La participation a été', type: 'error', label: 'Refusée' }
        case 'Validée':
          return { prepend: 'La participation a été', type: 'success', label: 'Validée' }
        case 'Validée par le bénévole':
          return { prepend: 'La participation a été', type: 'success', label: 'Validée', append: 'par le bénévole' }
        case 'Annulée':
          return { prepend: 'La participation a été', type: 'error', label: 'Annulée' }
        case 'Annulée par bénévole':
          return { prepend: 'La participation a été', type: 'error', label: 'Annulée', append: 'par le bénévole' }
        case 'En attente de validation':
          return { prepend: 'La participation est', type: 'warning', label: 'En attente de validation' }
        case 'En cours de traitement':
          return { prepend: 'La participation est', type: 'warning', label: 'En cours de traitement' }
        case 'Désinscription':
          return { prepend: 'La participation a été', type: 'error', label: 'Annulée' }
        case 'Automatiquement déclinée par la plateforme':
          return { prepend: 'La participation a été automatiquement', type: 'error', label: 'Refusée', append: 'par la plateforme' }
        default:
          return { prepend: 'La participation a été', type: 'warning', label: this.message.contextual_state }
      }
    }
  }
}
</script>

<style>

</style>
