<template>
  <div class="p-6 pr-[10px] lg:p-6">
    <div class="flex">
      <!-- TODO: refactoriser avec ConversationOrganisationTeaser et ConversationMissionTeaser -->
      <!-- Avatar, Recipients, Unread message et LastMessageDate en commun -->
      <!-- Faire un component ConversationTeaser avec des slots -->
      <Avatar
        v-for="(recipient, i) in recipients.slice(0, 3)"
        :key="recipient.id"
        class="mr-4 relative"
        :class="[{ '-ml-10': i !== 0 }]"
        :img-srcset="recipient.profile.avatar && recipient.profile.avatar.urls.thumbSmall"
        :img-src="recipient.profile.avatar && recipient.profile.avatar.urls.original"
        :initials="recipient.profile.short_name"
        size="sm"
      />
      <div class="flex-1 min-w-0 relative">
        <div class="flex items-center">
          <p
            class="truncate font-bold text-lg"
            v-html="recipients.map(recipient => recipient.profile.first_name).join(', ')"
          />
          <div
            v-if="hasUnreadMessage"
            aria-label="Message non lu"
            class="flex-none w-3 h-3 ml-2 mr-auto bg-[#F95A5C] rounded-full"
          />
          <div class="ml-auto hidden xs:block leading-none">
            <Badge
              size="sm"
              :type="badgeType"
              :no-icon="true"
              class="ml-2"
            >
              {{ conversation.conversable.state }}
            </Badge>
          </div>
        </div>
        <p class="text-cool-gray-500 text-sm leading-tight first-letter:capitalize">
          {{ lastMessageDate }}
        </p>
        <div class="text-gray-800 mt-4">
          <p :class="['line-clamp-2', {'font-bold': hasUnreadMessage}]">
            {{ conversation.conversable.mission.name }}
          </p>
          <div v-if="place" class="flex space-x-1 items-center truncate text-sm mt-2 text-cool-gray-500">
            <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
            <p class="truncate leading-none">
              {{ place }}
            </p>
          </div>
        </div>

        <Badge
          size="sm"
          :type="badgeType"
          :no-icon="true"
          class="mt-4 xs:hidden"
        >
          {{ conversation.conversable.state }}
        </Badge>
      </div>
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
    conversation: { type: Object, required: true }
  },
  computed: {
    recipients () {
      return this.conversation.users.filter((user) => {
        return user.id != this.$store.getters.profile.user_id
      })
    },
    lastMessageDate () {
      const date = this.$dayjs(this.conversation.updated_at)
      return this.$dayjs().isSame(date, 'day') ? date.fromNow() : date.format('dddd D MMMM YYYY')
    },
    badgeType () {
      switch (this.conversation.conversable?.state) {
        case 'Validée':
          return 'success'
        case 'Signalée':
        case 'Annulée':
          return 'error'
        case 'En attente de validation':
        case 'En cours de traitement':
          return 'warning'
        default:
          return 'info'
      }
    },
    place () {
      const mission = this.conversation.conversable?.mission
      if (!mission) {
        return
      }

      if (mission?.is_autonomy && mission.autonomy_zips.length) {
        return mission.autonomy_zips.map((item) => {
          return item.city.includes(' Arrondissement') ? `${item.city.replace(' Arrondissement', '')}` : `${item.city} (${item.zip})`
        }).sort((a, b) => a.localeCompare(b, 'fr', { numeric: true })).join(', ')
      }

      if (mission.type === 'Mission en présentiel' && mission.city) {
        let cityLabel = this.getCity()
        if (mission.zip) {
          cityLabel = `${cityLabel} (${mission.zip})`
        } else if (mission.department) {
          cityLabel = `${cityLabel} (${mission.department})`
        }
        return cityLabel
      }

      return 'Mission à distance'
    },
    currentConversationUser () {
      return this.conversation.users.find((user) => {
        return user.id == this.$store.getters.profile.user_id
      })
    },
    hasUnreadMessage () {
      if (this.currentConversationUser.pivot.read_at == null) {
        return true
      }
      if (this.$dayjs(this.currentConversationUser.pivot.read_at).isSame(this.$dayjs(this.conversation.updated_at))) {
        return false
      }
      if (this.$dayjs(this.currentConversationUser.pivot.read_at).isAfter(this.$dayjs(this.conversation.updated_at))) {
        return false
      }
      return true
    }
  },
  methods: {
    getCity () {
      const mission = this.conversation.conversable?.mission
      if (!mission) {
        return
      }

      if (mission.city?.startsWith('Paris ')) {
        return 'Paris'
      } else if (mission.city?.startsWith('Lyon ')) {
        return 'Lyon'
      } else if (mission.city?.startsWith('Marseille ')) {
        return 'Marseille'
      } else {
        return mission.city?.replace(' Arrondissement', '')
      }
    }
  }
}
</script>
