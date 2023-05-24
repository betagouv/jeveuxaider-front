<template>
  <div class="my-10 text-center">
    <div class="text-cool-gray-600 font-light text-sm">
      {{ $dayjs(message.created_at).format('D MMM HH[h]mm') }}
    </div>
    <div class="font-semibold text-center" v-html="content" />
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    content () {
      let message = ''
      switch (this.message.contextual_state) {
        case 'En attente de validation':
          message = 'La participation est en attente de validation'
          break
        case 'En cours de traitement':
          message = 'La participation est en cours de traitement'
          break
        case 'Validée':
          message = 'La participation a été validée'
          break
        case 'Annulée':
          message = 'La participation a été annulée'
          break
        case 'Désinscription':
          message = 'La participation a été annulée'
          break
        case 'Annulée par bénévole':
          message = this.message.content
          break
        case 'Refusée':
          message = 'La participation a été déclinée'
          break
        default:
          message = `Le nouveau statut de la participation est :<br> ${this.message.contextual_state}`
      }

      if (
        this.message.contextual_reason &&
        this.message.contextual_reason != 'other'
      ) {
        if (this.message.contextual_state == 'Refusée') {
          message += `<br><span class="font-light text-sm"> ${this.$options.filters.label(this.message.contextual_reason, 'participation_declined_reasons')}</span>`
        }
        if (this.message.contextual_state == 'Annulée par bénévole') {
          message += `<br><span class="font-light text-sm"> ${this.$options.filters.label(this.message.contextual_reason, 'participation_canceled_by_benevole_reasons')}</span>`
        }
        if (this.message.contextual_state == 'Désinscription') {
          message += '<br><span class="font-light text-sm"> Désinscription de l\'utilisateur</span>'
        }
      }
      return message
    }
  }
}
</script>
