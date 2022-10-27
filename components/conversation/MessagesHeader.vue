<template>
  <div
    class="w-full"
  >
    <div class="min-w-0 flex flex-wrap flex-1 justify-between items-center -m-2">
      <button
        class="order-1 md:hidden text-xs flex-none rounded-full px-3 py-1 border hover:border-black transition !outline-none focus:border-black m-2"
        @click="onPanelLeftToggle"
      >
        Retour
      </button>

      <div class="order-4 w-full sm:w-auto sm:order-2 sm:truncate m-2">
        <h1 class="text-lg leading-8 font-bold text-gray-900 sm:truncate">
          {{ $store.getters['messaging/recipient'].profile.first_name }} {{ $store.getters['messaging/recipient'].profile.last_name }}
        </h1>

        <<<<<<< HEAD
        <div class="text-sm text-gray-500 font-light sm:truncate">
          =======
          <div v-if="$store.getters['messaging/isRecipientAdmin']" class="text-jva-red-500 font-bold text-sm truncate">
            🧑‍💻<span class="ml-2">Modérateur</span>
          </div>
          <div v-else-if="$store.getters['messaging/isRecipientReferent']" class="text-jva-red-500 font-bold text-sm truncate">
            🧑‍💻<span class="ml-2">Référent {{ $store.getters['messaging/recipient'].roles.filter(role => role.key == 'referent')[0].label | label('departments') }}</span>
          </div>

          <div v-if="conversation.conversable_type == 'App\\Models\\Participation'" class="text-sm text-gray-500 font-light sm:truncate">
            >>>>>>> bbe3980c5343751a792699e61b11794f3e0e13b3
            {{ conversation.conversable.mission.city }}

            <span v-if="conversation.conversable.mission.start_date">
              · {{ formattedDate }}
            </span>
          </div>
        </div>

        <<<<<<< HEAD
        <div class="order-3 space-x-2 justify-center flex items-center m-2">
          =======
          <div

            class="order-3 space-x-2 justify-center flex items-center m-2"
          >
            >>>>>>> bbe3980c5343751a792699e61b11794f3e0e13b3
            <SelectParticipationState
              v-if="
                conversation.conversable_type == 'App\\Models\\Participation' &&
                  $store.getters.contextRole == 'responsable' &&
                  $store.getters.contextableId == conversation.conversable.mission.structure_id &&
                  canEditState
              "
              :value="conversation.conversable.state"
              :participation="conversation.conversable"
              size="sm"
              @selected="handleChangeState($event)"
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
              class="h-7 w-7 flex items-center justify-center border rounded-full hover:border-gray-900"
              @click="onArchiveClick"
            >
              <ArchiveIcon class="h-4 w-4" />
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
              <InformationCircleSolidIcon
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
      </div>
    </div>
  </div>
</template>

<script>
import SelectParticipationState from '@/components/custom/SelectParticipationState'

export default {
  components: {
    SelectParticipationState
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging/conversation']
    },
    formattedDate () {
      let start = this.conversation.conversable.mission.start_date
      let end = this.conversation.conversable.mission.end_date

      start = this.$dayjs(start).format('D MMM YYYY')
      end = end ? this.$dayjs(end).format('D MMM YYYY') : null

      if (start == end) {
        return start
      }

      return end ? `${start} - ${end}` : `À partir du ${start}`
    },
    currentUser () {
      return this.conversation.users.find((user) => {
        return user.id == this.$store.getters.profile.user_id
      })
    },
    canEditState () {
      const rolesWhoCanEdit = this.$options.filters.label(this.$store.getters['messaging/conversable'].state, 'participation_workflow_states', 'roles')
      return !!rolesWhoCanEdit.includes(this.$store.getters.contextRole)
    }
  },
  methods: {
    onPanelLeftToggle () {
      this.$store.commit('messaging/setShowPanelCenter', false)
      this.$store.commit('messaging/setShowPanelLeft', true)
    },
    onArchiveClick () {
      // Update status
      this.$axios.post(`/conversations/${this.conversation.id}/setStatus`, { status: this.currentUser.pivot.status == 0 })

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
    },
    async handleChangeState (payload) {
      this.$store.commit('messaging/setConversable', { ...this.$store.getters['messaging/conversable'], state: payload.key })
      if (payload.key == 'Refusée') {
        await this.$axios.put(`/participations/${this.$store.getters['messaging/conversable'].id}/decline`, payload.form).catch(() => {})
      } else {
        await this.$axios.put(`/participations/${this.$store.getters['messaging/conversable'].id}`, this.$store.getters['messaging/conversable']).catch(() => {})
      }
      await this.onParticipationUpdate()
    },
    async onParticipationUpdate () {
      // A participation update adds 1 or 2 new messages, so re-fetch them.
      const messages = await this.$axios.get(`/conversations/${this.conversation.id}/messages`, {
        params: {
          pagination:
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
    }
  }
}
</script>
