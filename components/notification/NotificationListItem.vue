<template>
  <div
    class="p-4 lg:p-6 flex gap-4 lg:gap-6 items-center cursor-pointer hover:bg-gray-50"
    @click="handleClick(notification)"
  >
    <div
      :class="[
        'w-[24px]',
        {'text-2xl': variant === 'card'},
        {'text-lg': variant === 'dropdown'}
      ]"
    >
      {{ notificationResolver.emoji }}
    </div>
    <div
      :class="[
        'flex-1 overflow-x-hidden',
        {'': variant === 'card'},
        {'w-[253px]': variant === 'dropdown'}
      ]"
    >
      <div
        v-if="notificationResolver.contexte"
        :class="[
          'text-[#666666] text-sm truncate flex items-center gap-2',
          {'mb-4': variant === 'card'},
          {'mb-2': variant === 'dropdown'}
        ]"
      >
        <component
          :is="notificationResolver.contexteIcon"
          v-if="notificationResolver.contexteIcon"
          class="h-4 fill-current"
        />
        {{ notificationResolver.contexte }}
      </div>
      <div
        v-if="notificationResolver.message"
        :class="[
          'text-black',
          {'text-lg mb-4': variant === 'card'},
          {'text-base mb-2': variant === 'dropdown'}
        ]"
        v-html="$options.filters.marked(notificationResolver.message)"
      />
      <div
        :class="[
          'text-gray-600 first-letter:uppercase',
          {'text-sm': variant === 'card'},
          {'text-sm': variant === 'dropdown'}
        ]"
      >
        {{ $dayjs(notification.created_at).fromNow() }}
      </div>
    </div>
    <div class="w-[12px]">
      <div
        v-if="notification.read_at === null"
        aria-label="Notification non lue"
        class="flex-none w-[9px] h-[9px] bg-[#FF463D] rounded-full"
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
    notificationResolver () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ParticipationCreated':
          return {
            emoji: '✊',
            message: 'Votre demande de participation **a bien été enregistrée**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        default:
          return {
            emoji: '✊',
            message: 'Nouvelle notification',
            contexte: this.notification.type,
            redirection: null
          }
      }
    }
    // emoji () {
    //   switch (this.notification.type) {
    //     case 'App\\Notifications\\ParticipationCreated':
    //       return '🙂'
    //     case 'App\\Notifications\\ParticipationBeingProcessed':
    //       return '🙂'
    //     case 'App\\Notifications\\ParticipationValidated':
    //       return '🙂'
    //     case 'App\\Notifications\\ParticipationDeclined':
    //       return '🙂'
    //     case 'App\\Notifications\\ParticipationCanceled':
    //       return '🙂'
    //     case 'App\\Notifications\\StructureSubmitted':
    //       return '🙂'
    //     case 'App\\Notifications\\DocumentSubmitted':
    //       return '🙂'
    //     default:
    //       return '🙂'
    //   }
    // },
    // contexte () {
    //   switch (this.notification.type) {
    //     case 'App\\Notifications\\ParticipationCreated':
    //     case 'App\\Notifications\\ParticipationBeingProcessed':
    //     case 'App\\Notifications\\ParticipationValidated':
    //     case 'App\\Notifications\\ParticipationDeclined':
    //     case 'App\\Notifications\\ParticipationCanceled':
    //     case 'App\\Notifications\\StructureSubmitted':
    //       return this.notification.data.structure_name
    //     case 'App\\Notifications\\DocumentSubmitted':
    //       return this.notification.data.ressource_title
    //     default:
    //       return null
    //   }
    // },
    // message () {
    //   switch (this.notification.type) {
    //     case 'App\\Notifications\\ParticipationWaitingValidation':
    //       return `**${this.notification.data.benevole_first_name} ${this.notification.data.benevole_last_name}** a candidaté à une mission`
    //     case 'App\\Notifications\\ParticipationCreated':
    //       return 'Votre demande de participation **a bien été enregistrée**'
    //     case 'App\\Notifications\\ParticipationBeingProcessed':
    //       return 'Votre demande de participation **est en cours de traitement**'
    //     case 'App\\Notifications\\ParticipationValidated':
    //       return 'Votre demande de participation **a été validée**'
    //     case 'App\\Notifications\\ParticipationDeclined':
    //       return 'Votre demande de participation **a été déclinée**'
    //     case 'App\\Notifications\\ParticipationCanceled':
    //       return 'Votre demande de participation **a été refusée**'
    //     case 'App\\Notifications\\ResetPassword':
    //       return 'Une demande de **réinitialisation de votre mot de passe** a été effectuée'
    //     case 'App\\Notifications\\DocumentSubmitted':
    //       return 'Une **nouvelle ressource** est accessible dans **votre espace**'
    //     case 'App\\Notifications\\StructureSubmitted':
    //       return 'Une nouvelle organisation est **en attente de validation** dans votre département'
    //     default:
    //       return this.notification.type
    //   }
    // }
  },
  methods: {
    handleClick (notification) {
      if (this.notificationResolver.redirection) {
        this.$router.push(this.notificationResolver.redirection)
      }
      if (this.notification.read_at === null) {
        this.$store.dispatch('notifications/markNotificationAsRead', notification)
        this.$store.commit('notifications/decrementUnreadNotificationsCount')
        this.$emit('refetch')
      }
    }
    // redirectionResolver () {
    //   switch (this.notification.type) {
    //     case 'App\\Notifications\\ParticipationCanceled':
    //     case 'App\\Notifications\\ParticipationValidated':
    //     case 'App\\Notifications\\ParticipationDeclined':
    //     case 'App\\Notifications\\ParticipationBeingProcessed':
    //     case 'App\\Notifications\\ParticipationWaitingValidation':
    //     case 'App\\Notifications\\ParticipationCreated':
    //       return `/messages/${this.notification.data.conversation_id}`
    //     case 'App\\Notifications\\StructureSubmitted':
    //       return `/admin/organisations/${this.notification.data.structure_id}`
    //     case 'App\\Notifications\\DocumentSubmitted':
    //       return '/admin/ressources'
    //     default:
    //       return null
    //   }
    // }
  }
}
</script>

<style>

</style>
