<template>
  <div class="p-6">
    <div class="flex">
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
        <p class="truncate font-bold" v-html="recipients.map(recipient => recipient.profile.first_name).join(', ')" />

        <template v-if="conversation.latest_message">
          <p class="text-cool-gray-500 text-sm leading-none">
            {{ lastMessageDate }}
          </p>

          <div class="text-gray-800 mt-2">
            <template v-if="conversation.conversable_type === 'App\\Models\\Participation'">
              <p class="line-clamp-2">
                {{ conversation.conversable.mission.name }}
              </p>
              <div v-if="place" class="flex space-x-1 items-center truncate text-sm mt-2 text-cool-gray-500">
                <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
                <p class="truncate leading-none">
                  {{ place }}
                </p>
              </div>
            </template>

            <p v-else class="line-clamp-2">
              {{ conversation.latest_message.content }}
            </p>
          </div>
        </template>

        <Badge
          v-if="conversation.conversable_type === 'App\\Models\\Participation'"
          size="sm"
          :type="badgeType"
          :no-icon="true"
          class="mt-3 sm:mt-0 sm:absolute right-0 top-0"
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
      const date = this.$dayjs(this.conversation.latest_message.created_at)
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
      if (this.conversation.conversable_type !== 'App\\Models\\Participation') {
        return
      }
      const mission = this.conversation.conversable?.mission

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
