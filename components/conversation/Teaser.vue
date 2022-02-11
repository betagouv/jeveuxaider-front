<template>
  <div class="p-4">
    <div class="flex items-center">
      <Avatar
        v-for="(recipient, i) in recipients.slice(0, 3)"
        :key="recipient.id"
        class="mr-4 relative"
        :class="[{ '-ml-10': i !== 0 }, { 'shadow-md': recipients.length > 1 }]"
        :source="recipient.profile.image ? recipient.profile.image.thumb : null"
        :fallback="recipient.profile.short_name"
      />

      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2">
          <div class="truncate" :class="[{ 'font-bold unread': !hasRead }]">
            {{ recipientNames }}
          </div>

          <div v-if="nametype" class="text-secondary text-sm truncate">
            • {{ nametype }}
          </div>
          <span
            v-if="!hasRead"
            class="w-2.5 h-2.5 mr-4 bg-[#f56565] rounded-full"
            aria-hidden="true"
          />
        </div>

        <div
          v-if="conversation.latest_message"
          class="flex justify-between items-baseline text-[#242526]"
          :class="[{ 'font-bold': !hasRead }]"
        >
          <span
            v-if="conversation.latest_message"
            class="truncate text-sm pr-2"
          >
            {{ conversation.latest_message.content }}
          </span>

          <span class="flex-none text-secondary text-sm">
            {{ $dayjs(conversation.latest_message.created_at).format('D MMM') }}
          </span>
        </div>

        <div
          v-if="conversation.conversable"
          class="text-sm font-light"
          :class="classParticipationStatus(conversation.conversable.state)"
        >
          <span class="text-secondary font-normal"> Participation : </span>
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
    currentUser () {
      return this.conversation.users.find((user) => {
        return user.id == this.$store.getters.profile.user_id
      })
    },
    participant () {
      return this.conversation.users.find((user) => {
        return user.profile.id == this.conversation.conversable.profile_id
      })
    },
    responsable () {
      return this.conversation.users.find((user) => {
        return (
          user.profile.id ==
          this.conversation.conversable.mission.responsable_id
        )
      })
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
    hasRead () {
      return false
      // TODO : avec unread dans la conversation plutôt que de load tout les unreads du user
      // return !this.$store.getters.user.unreadConversations.includes(
      //   this.conversation.id
      // )
    },
    nametype () {
      return this.$store.getters.contextRole == 'volontaire'
        ? this.conversation.conversable.mission.structure.name
        : null
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
