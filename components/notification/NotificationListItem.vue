<template>
  <div
    class="p-4 lg:p-6 flex gap-4 lg:gap-6 items-center justify-between cursor-pointer hover:bg-gray-50"
    @click="handleClick(notification)"
  >
    <div class="">
      <div
        v-if="variant === 'card'"
        :class="[
          'text-gray-600 text-sm',
        ]"
      >
        {{ contexte }}
      </div>
      <div
        v-if="message"
        :class="[
          'text-black',
          {'text-base mb-2': variant === 'card'},
          {'text-sm': variant === 'dropdown'}
        ]"
        v-html="$options.filters.marked(message)"
      />
      <div
        :class="[
          'text-gray-600 first-letter:uppercase',
          {'text-sm': variant === 'card'},
          {'text-xs': variant === 'dropdown'}
        ]"
      >
        {{ $dayjs(notification.created_at).fromNow() }}
      </div>
    </div>
    <div class="w-3">
      <div
        v-if="notification.read_at === null"
        aria-label="Notification non lue"
        class="flex-none w-3 h-3 bg-[#F95A5C] rounded-full"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true
    },
    variant: {
      type: String,
      default: 'dropdown' // dropdown, card
    }
  },
  computed: {
    contexte () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ParticipationWaitingValidation':
        case 'App\\Notifications\\ParticipationCreated':
        case 'App\\Notifications\\ParticipationBeingProcessed':
        case 'App\\Notifications\\ParticipationValidated':
        case 'App\\Notifications\\ParticipationDeclined':
        case 'App\\Notifications\\ParticipationCanceled':
          return this.notification.data.mission_name
        case 'App\\Notifications\\ResetPassword':
          return 'Sécurité'
        default:
          return this.notification.type
      }
    },
    message () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ParticipationWaitingValidation':
          return `**${this.notification.data.benevole_first_name} ${this.notification.data.benevole_last_name}** a candidaté à une mission`
        case 'App\\Notifications\\ParticipationCreated':
          return 'Votre demande de participation a bien été enregistrée'
        case 'App\\Notifications\\ParticipationBeingProcessed':
          return 'Votre demande de participation est **en cours de traitement**'
        case 'App\\Notifications\\ParticipationValidated':
          return 'Votre demande de participation **a été validée**'
        case 'App\\Notifications\\ParticipationDeclined':
          return 'Votre demande de participation **a été déclinée**'
        case 'App\\Notifications\\ParticipationCanceled':
          return 'Votre demande de participation **a été refusée**'
        case 'App\\Notifications\\ResetPassword':
          return 'Une demande de **réinitialisation de votre mot de passe** a été effectuée'
        default:
          return this.notification.type
      }
    }
  },
  methods: {
    handleClick (notification) {
      const redirection = this.redirectionResolver(notification)
      if (redirection) {
        this.$router.push(redirection)
      }
      if (this.notification.read_at === null) {
        this.$store.dispatch('notifications/markNotificationAsRead', notification)
        this.$store.commit('notifications/decrementUnreadNotificationsCount')
        this.$emit('refetch')
      }
    },
    redirectionResolver () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ParticipationCanceled':
        case 'App\\Notifications\\ParticipationValidated':
        case 'App\\Notifications\\ParticipationDeclined':
        case 'App\\Notifications\\ParticipationBeingProcessed':
        case 'App\\Notifications\\ParticipationWaitingValidation':
        case 'App\\Notifications\\ParticipationCreated':
          return `/messages/${this.notification.data.conversation_id}`
        default:
          return null
      }
    }
  }
}
</script>

<style>

</style>
