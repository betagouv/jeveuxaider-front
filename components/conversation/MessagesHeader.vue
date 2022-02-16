<template>
  <div
    class="min-w-0 flex flex-wrap sm:flex-nowrap flex-1 justify-between items-center"
  >
    <button
      class="order-1 md:hidden text-xs flex-none rounded-full px-3 py-1 mr-2 my-4 sm:my-0 border hover:border-black transition !outline-none focus:border-black"
      @click="onPanelLeftToggle"
    >
      Retour
    </button>

    <div class="order-4 w-full sm:w-auto sm:order-2 mb-4 sm:mb-0 sm:truncate">
      <h1 class="text-lg leading-8 font-bold text-gray-900 sm:truncate">
        {{ recipient.profile.first_name }} {{ recipient.profile.last_name }}
      </h1>

      <div class="text-sm text-gray-500 font-light sm:truncate">
        {{ conversation.conversable.mission.city }}

        <span v-if="conversation.conversable.mission.start_date">
          · {{ formattedDate }}
        </span>
      </div>
    </div>

    <div class="order-3 space-x-2 justify-center flex items-center sm:my-0">
      <DropdownParticipationState
        v-if="
          $store.getters.contextRole == 'responsable' &&
            $store.getters.contextStructure.id ==
            conversation.conversable.mission.structure_id &&
            !![
              'En attente de validation',
              'En cours de traitement',
              'Validée',
            ].includes(conversation.conversable.state)
        "
        class="mt-1.5"
        :participation="conversation.conversable"
        @updated="onParticipationUpdate"
        @messages-added="
          $store.commit('messaging/incrementNewMessagesCount', $event.count)
        "
      />

      <button
        v-if="$store.getters.contextRole != 'admin'"
        v-tooltip="{
          content:
            currentUser.pivot.status == 0
              ? `Retirer la conversation des archives`
              : `Archiver la conversation`,
          hideOnTargetClick: true,
          placement: 'bottom',
        }"
        class="transition p-1.5 border rounded-full text-secondary"
        @click="onArchiveClick"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path
            fill-rule="evenodd"
            d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <button
        class="h-7 w-7 flex items-center justify-center border rounded-full hover:border-gray-900"
        :class="[
          $store.getters['messaging/showPanelRight']
            ? 'border-jva-blue-500'
            : '',
        ]"
        @click="$emit('toggle-panel-right')"
      >
        <InformationCircleIcon
          class="h-4 w-4"
          :class="[
            $store.getters['messaging/showPanelRight']
              ? 'text-jva-blue-500'
              : 'text-gray-600',
          ]"
        />
      </button>

      <!-- <button
        class="text-xs flex-none rounded-full px-3 py-1 border whitespace-nowrap hover:border-black transition !outline-none focus:border-black"
        @click="$emit('toggle-panel-right')"
        v-html="
          $store.getters['messaging/showPanelRight']
            ? 'Masquer les détails'
            : 'Voir les détails'
        "
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    conversation () {
      return this.$store.getters['messaging/conversation']
    },
    formattedDate () {
      let start = this.conversation.conversable.mission.start_date
      let end = this.conversation.conversable.mission.end_date

      start = this.$dayjs(start).format('D MMM YYYY')
      end = this.$dayjs(end).format('D MMM YYYY')

      if (start == end) {
        return start
      }

      return `${start} - ${end}`
    },
    recipient () {
      return this.conversation.users.filter((user) => {
        return user.id != this.$store.getters.profile.user_id
      })[0]
    },
    currentUser () {
      return this.conversation.users.find((user) => {
        return user.id == this.$store.getters.profile.user_id
      })
    }
  },
  methods: {
    async onParticipationUpdate (participation) {
      // A participation update adds 1 or 2 new messages, so re-fetch them.
      const messages = await this.$axios.get(`/conversations/${this.conversation.id}/messages`, {
        params: {
          itemsPerPage:
          this.$store.getters['messaging/messages'].length +
          this.$store.getters['messaging/newMessagesCount']
        }
      })

      this.$store.commit('messaging/setMessages', messages.data.data)

      // Refresh the conversation to get the latest message
      // up to date (inside the teaser)
      await this.$store.dispatch(
        'messaging/refreshConversation',
        this.conversation
      )
    },
    onPanelLeftToggle () {
      this.$store.commit('messaging/setShowPanelCenter', false)
      this.$store.commit('messaging/setShowPanelLeft', true)
    },
    onArchiveClick () {
      // Update status
      this.$api.setConversationStatus(this.conversation.id, {
        status: this.currentUser.pivot.status == 0
      })

      // Change current conversation
      const key = this.$store.getters['messaging/conversations'].findIndex(
        (conversation) => {
          return conversation.id == this.conversation.id
        }
      )
      if (this.$store.getters['messaging/conversations'][key + 1]) {
        this.$router.push(
          `/messages/${
            this.$store.getters['messaging/conversations'][key + 1].id
          }`
        )
      } else if (this.$store.getters['messaging/conversations'][key - 1]) {
        this.$router.push(
          `/messages/${
            this.$store.getters['messaging/conversations'][key - 1].id
          }`
        )
      } else {
        this.$router.push('/messages')
      }

      // Remove conversation from conversations
      this.$store.commit(
        'messaging/removeConversationInConversations',
        this.conversation
      )
    }
  }
}
</script>
