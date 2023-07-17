<template>
  <div
    class="p-4 lg:p-6 flex gap-4 lg:gap-6 items-center cursor-pointer hover:bg-gray-50"
    @click="handleClick(notification)"
  >
    <div
      :class="[
        '',
        {'w-[30px] text-3xl': variant === 'card'},
        {'w-[24px] text-lg': variant === 'dropdown'}
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
        v-if="notificationResolver.contexte && variant === 'card'"
        :class="[
          'text-[#666666] text-sm flex items-center truncate gap-2',
          {'mb-4': variant === 'card'},
          {'mb-2': variant === 'dropdown'}
        ]"
      >
        <component
          :is="notificationResolver.contexteIcon"
          v-if="notificationResolver.contexteIcon"
          class="w-4 fill-current flex-none"
        />
        <span class="truncate">
          {{ notificationResolver.contexte }}
        </span>
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

      <template v-if="showBenevole && variant === 'card'">
        <div class="flex items-center gap-4 lg:gap-6 mb-4">
          <div>
            <Avatar
              :img-srcset="
                notification.data.benevole_picture?.thumbSmall
              "
              :img-src="notification.data.benevole_picture?.original"
              :initials="`${notification.data.benevole_first_name[0]}${notification.data.benevole_last_name[0]}`"
              class="transition transform group-hover:scale-110"
              size="xs"
            />
          </div>
          <div class="">
            <div class="text-lg font-bold">
              {{ notification.data.benevole_first_name }} {{ notification.data.benevole_last_name }}
            </div>
            <div class="flex gap-4 items-center overflow-hidden whitespace-nowrap">
              <div v-if=" notification.data.benevole_birthday" class="flex gap-1 items-center text-sm text-cool-gray-500">
                <RiCakeFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
                <p class="">
                  {{ $dayjs( notification.data.benevole_birthday).fromNow('year') }}
                </p>
              </div>
              <div v-if=" notification.data.benevole_zip" class="flex gap-1 items-center text-sm text-cool-gray-500">
                <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
                <p class="">
                  {{ notification.data.benevole_zip }}
                </p>
              </div>
              <div v-if=" notification.data.benevole_type" class="flex gap-1 items-center text-sm text-cool-gray-500">
                <RiSuitcaseFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
                <p class="">
                  {{ notification.data.benevole_type | label('profile_type') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
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
    showBenevole () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ParticipationWaitingValidation':
          return true
        default:
          return false
      }
    },
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
        case 'App\\Notifications\\ParticipationBeingProcessed':
          return {
            emoji: '⏱️',
            message: 'Votre demande de participation **est en cours de traitement**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\ParticipationValidated':
          return {
            emoji: '😇',
            message: 'Votre demande de participation **a été validée**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\ParticipationDeclined':
          return {
            emoji: '🙁',
            message: 'Votre demande de participation **a été refusée**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\ParticipationCanceled':
          return {
            emoji: '🙁',
            message: 'Votre demande de participation **a été annulée**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\DocumentSubmitted':
          return {
            emoji: '📥',
            message: 'Une **nouvelle ressource** est accessible dans **votre espace**',
            contexteIcon: 'RiDownload2Line',
            contexte: this.notification.data.ressource_title,
            redirection: '/admin/ressources'
          }
        case 'App\\Notifications\\StructureSubmitted':
          return {
            emoji: '🏫',
            message: 'Une nouvelle organisation est **en attente de validation** dans votre département',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/admin/organisations/${this.notification.data.structure_id}`
          }
        case 'App\\Notifications\\ParticipationWaitingValidation':
          return {
            emoji: '✊',
            message: 'Vous avez une **nouvelle demande de participation**',
            contexteIcon: 'RiTeamLine',
            contexte: this.notification.data.mission_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\ResetPassword':
          return {
            emoji: '🔐',
            message: 'Une demande de **réinitialisation de votre mot de passe** a été effectuée',
            redirection: null
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
  }
}
</script>

<style>

</style>
