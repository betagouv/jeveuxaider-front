<template>
  <Box padding="xs" class="!shadow-sm hover:!shadow-md cursor-pointer grid grid-cols-3">
    <div v-if="participation.mission" class="col-span-1 pr-4 py-2">
      <div class="truncate text-sm text-gray-600">
        <span>📍</span>

        <template
          v-if="participation.mission.city && participation.mission.type == 'Mission en présentiel'"
        >
          <template v-if="participation.mission.zip">
            <span class="font-semibold">{{ missionCity }}</span>
            <span>({{ participation.mission.zip }})</span>
          </template>

          <template v-else-if="participation.mission.department">
            <span class="font-semibold">{{ missionCity }}</span>
            <span>({{ participation.mission.department }})</span>
          </template>

          <template v-else>
            <span class="font-semibold">{{ missionCity }}</span>
          </template>
        </template>

        <template v-else>
          À distance
        </template>
      </div>
      <div class="font-extrabold line-clamp-3 mt-2 text-gray-900 leading-tight">
        {{ participation.mission.name }}
      </div>
      <div class="mt-4 pt-4 border-t border-dashed text-sm flex">
        <div class="font-medium">
          {{ participation.mission.places_left | pluralize('place restante', 'places restantes') }}
        </div>
        <div class="ml-auto text-gray-500">
          {{ participation.mission.participations_max - participation.mission.places_left }}/{{ participation.mission.participations_max }}
        </div>
      </div>
    </div>
    <div v-else>
      La mission n'existe plus
    </div>
    <div class="col-span-2 border-l -my-4 py-6 pl-6">
      <div class="flex">
        <Avatar
          :image="participation.profile.avatar && participation.profile.avatar.urls.thumbMedium"
          :initials="profile.short_name"
          size="sm"
          class="mr-4"
        />
        <div>
          <div class="font-bold">
            {{ profile.full_name }}
          </div>
          <div class="text-sm text-gray-600">
            {{ $dayjs().to($dayjs(participation.created_at)).charAt(0).toUpperCase() + $dayjs().to($dayjs(participation.created_at)).slice(1) }}
          </div>
        </div>
        <div class="ml-auto">
          <Badge :color="participation.state">
            {{ participation.state }}
          </Badge>
        </div>
      </div>
      <TextFormatted v-if="participation.conversation" :max-lines="4" :text="participation.conversation.latest_message.content" class="text-gray-600 mt-3" />
    </div>
  </Box>
</template>

<script>
import MixinMission from '@/mixins/mission'

export default {
  mixins: [MixinMission],
  props: {
    participation: {
      type: Object,
      default: null
    }
  },
  computed: {
    mission () {
      return this.participation.mission
    },
    profile () {
      return this.participation.profile
    }
  }
}
</script>
