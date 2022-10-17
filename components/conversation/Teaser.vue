<template>
  <div class="p-4">
    <div class="flex items-center">
      <Avatar
        v-for="(recipient, i) in recipients.slice(0, 3)"
        :key="recipient.id"
        class="mr-4 relative"
        :class="[{ '-ml-10': i !== 0 }, { 'shadow-md': recipients.length > 1 }]"
        :img-srcset="recipient.profile.avatar && recipient.profile.avatar.urls.thumbSmall"
        :img-src="recipient.profile.avatar && recipient.profile.avatar.urls.original"
        :initials="recipient.profile.short_name"
        size="xs"
      />

      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2">
          <div class="truncate" :class="[{ 'font-bold unread': !hasRead }]">
            {{ recipientNames }}
          </div>

          <div v-if="adminInRecipients" class="text-jva-red-500 font-bold text-sm truncate">
            🧑‍💻<span class="ml-2">Modérateur</span>
          </div>
          <div v-else-if="referentInRecipients" class="text-jva-red-500 font-bold text-sm truncate">
            🧑‍💻<span class="ml-2">Référent {{ referentInRecipients.roles.filter(role => role.key == 'referent')[0].label | label('departments') }}</span>
          </div>

          <div v-else-if="$store.getters.contextRole != 'responsable'" class="text-cool-gray-500 text-sm truncate">
            •<span class="ml-2">{{ nametype }}</span>
          </div>

          <span
            v-if="!hasRead"
            class="flex-none w-2.5 h-2.5 mr-4 bg-jva-red-500 rounded-full"
            aria-hidden="true"
          />
        </div>

        <div
          v-if="conversation.latest_message"
          class="flex justify-between items-baseline text-gray-800"
          :class="[{ 'font-bold': !hasRead }]"
        >
          <span
            v-if="conversation.latest_message"
            class="truncate text-sm pr-2 py-0.5"
          >
            {{ conversation.latest_message.content }}
          </span>

          <span class="flex-none text-cool-gray-500 text-sm" :class="[{ '!text-gray-900': !hasRead }]">
            {{ $dayjs(conversation.latest_message.created_at).format('D MMM') }}
          </span>
        </div>

        <div
          v-if="conversation.conversable"
          class="text-xs font-light"
          :class="classParticipationStatus(conversation.conversable.state)"
        >
          <span class="text-cool-gray-500 font-normal"> {{ conversation.conversable_type | label('models') }} : </span>
          <span class="font-semibold">
            {{ conversation.conversable.state }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentConversationUser () {
      return this.conversation.users.find((user) => {
        return user.id == this.$store.getters.profile.user_id
      })
    },
    participant () {
      return this.conversation.users.filter((user) => {
        return user.id != this.$store.getters.profile.user_id
      })[0]
    },
    recipients () {
      return this.participant.id == this.$store.getters.profile.user_id
        ? this.conversation.users.filter((user) => {
          return user.id != this.$store.getters.profile.user_id
        })
        : [this.participant]
    },
    recipientNames () {
      return this.recipients
        .map(recipient => recipient.profile.first_name)
        .join(', ')
    },
    referentInRecipients () {
      return this.recipients.find(user => user.roles.filter(role => role.key == 'referent').length > 0)
    },
    adminInRecipients () {
      return this.recipients.find(user => user.roles.filter(role => role.key == 'admin').length > 0)
    },
    hasRead () {
      // Si le current user n'est pas dans la conversation, on affiche les messages comme lus
      if (!this.currentConversationUser) {
        return true
      }

      if (this.currentConversationUser.pivot.read_at == null) {
        return false
      }

      if (this.$dayjs(this.currentConversationUser.pivot.read_at).isSame(this.$dayjs(this.conversation.updated_at))) {
        return true
      }

      if (this.$dayjs(this.currentConversationUser.pivot.read_at).isAfter(this.$dayjs(this.conversation.updated_at))) {
        return true
      }

      return false
    },
    nametype () {
      switch (this.conversation.conversable_type) {
        case 'App\\Models\\Participation':
          return this.conversation.conversable.mission.structure.name
        case 'App\\Models\\Structure':
          return this.conversation.conversable.name
      }
      return null
    }
  },
  methods: {
    classParticipationStatus (status) {
      switch (status) {
        case 'En attente de validation':
          return 'text-[#f6ad55] font-semibold'
        case 'Validée':
          return 'text-[#03543f] font-semibold'
        default:
          return 'text-gray-500'
      }
    }
  }
}
</script>
