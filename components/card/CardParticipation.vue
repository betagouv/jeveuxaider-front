<template>
  <Box padding="xs" class="!shadow-sm hover:!shadow-md cursor-pointer grid grid-cols-1 lg:grid-cols-3">
    <div v-if="participation.mission" class="col-span-1 pr-4 py-2 flex flex-col justify-between gap-4">
      <div>
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

          <template v-else-if="participation.mission.is_autonomy">
            En autonomie
          </template>

          <template v-else>
            À distance
          </template>
        </div>
        <div class="font-extrabold line-clamp-3 mt-2 text-gray-900 leading-tight">
          {{ participation.mission.name }}
        </div>
        <div
          v-if="!['responsable'].includes($store.getters.contextRole)"
          class="mt-2 text-sm text-gray-600 leading-tight"
        >
          {{ participation.mission.structure.name }}
        </div>
      </div>
      <div class="hidden lg:flex pt-4 border-t border-dashed">
        <div class="flex space-x-1 text-sm truncate max-w-full text-gray-600">
          <span class="">Responsable :</span>
          <span v-if="participation.mission.responsable" class="font-bold truncate">{{ participation.mission.responsable.full_name }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      La mission n'existe plus
    </div>
    <div class="col-span-2 lg:border-l -my-4 py-6 lg:pl-6 flex flex-col">
      <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0">
        <div class="flex">
          <Avatar
            :img-srcset="profile.avatar ? profile.avatar.urls.thumbMedium : null"
            :img-src="profile.avatar ? profile.avatar.urls.original : null"
            :initials="profile.short_name"
            size="sm"
            class="mr-4"
          />
          <div>
            <div class="font-bold">
              {{ profile.full_name }}
            </div>
            <div class="text-sm text-gray-600 first-letter:uppercase">
              {{ $dayjs(participation.created_at).fromNow() }}
            </div>
          </div>
        </div>
        <div class="lg:ml-auto">
          <Badge :color="participation.state">
            {{ participation.state }}
          </Badge>
        </div>
      </div>
      <TextFormatted v-if="participation.conversation && participation.conversation.latest_message" :max-lines="4" :text="participation.conversation.latest_message.content" class="text-gray-600 mt-3" />
      <div v-if="participation.date" class="mt-2">
        <div class="text-gray-600 font-semibold text-sm">
          Les disponiblités de {{ participation.profile.first_name }}
        </div>
        <div
          class="flex items-center space-x-3 border p-2 mt-1"
        >
          <div class="font-medium text-sm first-letter:uppercase">
            {{ $dayjs(participation.date).format('dddd D MMMM') }}
          </div>
          <div class="flex space-x-3">
            <div v-for="slot in participation.slots" :key="slot" class="p-2 bg-jva-blue-100 text-jva-blue-500 text-sm">
              {{ slot | label('slots') }}
            </div>
          </div>
        </div>
      </div>
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
    },
    display: {
      type: String,
      default: 'benevole'
    }
  },
  computed: {
    mission () {
      return this.participation.mission
    },
    profile () {
      return this.display === 'benevole' ? this.participation.profile : this.participation.mission.responsable
    }
  }
}
</script>
