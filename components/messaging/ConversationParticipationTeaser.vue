<template>
  <ConversationTeaser :conversation="conversation">
    <template #badge>
      <Badge
        size="sm"
        :type="badgeType"
        :no-icon="true"
      >
        {{ conversation.conversable.state }}
      </Badge>
    </template>

    <p :class="['line-clamp-2', {'font-bold': hasUnreadMessage}]">
      {{ conversation.conversable.mission.name }}
    </p>
    <div v-if="place" class="flex space-x-1 items-center truncate text-sm mt-2 text-cool-gray-500">
      <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
      <p class="truncate leading-none">
        {{ place }}
      </p>
    </div>
  </ConversationTeaser>
</template>

<script>
import ConversationTeaser from '@/components/messaging/ConversationTeaser.vue'
import ConversationTeaserMixin from '@/mixins/conversation-teaser.js'
import Badge from '@/components/dsfr/Badge.vue'

export default {
  components: {
    ConversationTeaser,
    Badge
  },
  mixins: [ConversationTeaserMixin],
  props: {
    conversation: { type: Object, required: true }
  },
  computed: {
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
