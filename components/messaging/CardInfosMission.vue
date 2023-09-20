<template>
  <div class="flex flex-col lg:flex-row">
    <div class="lg:w-10 flex flex-col lg:flex-row lg:items-center lg:justify-center">
      <span class="lg:-rotate-90 whitespace-nowrap uppercase text-jva-blue-500"> La mission </span>
    </div>
    <div
      class="p-4 lg:p-6 flex-1 flex flex-col gap-4 border border-gray-300 border-l-4 border-l-jva-blue-500"
    >
      <div class="flex items-center gap-4">
        <div class="text-lg lg:text-xl font-bold">
          {{ mission.name }}
        </div>
        <nuxt-link
          :to="
            !['volontaire'].includes($stores.auth.contextRole)
              ? `/admin/missions/${mission.id}`
              : `${mission.full_url}`
          "
          target="_blank"
        >
          <RiExternalLinkLine class="text-jva-blue-500 fill-current h-6 w-6" />
        </nuxt-link>
      </div>
      <div class="flex flex-wrap gap-4 items-center">
        <DsfrBadge v-if="mission.type == 'Mission à distance'"> Mission à distance </DsfrBadge>
        <DsfrBadge v-if="mission.type == 'Mission en présentiel'">
          Mission en présentiel
        </DsfrBadge>
        <div
          v-if="mission.zip && mission.type == 'Mission en présentiel'"
          class="flex space-x-1 items-center truncate text-sm text-cool-gray-500"
        >
          <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">{{ mission.city }} ({{ mission.zip }})</p>
        </div>
        <div v-if="showPlacesLeft" class="flex space-x-1 truncate text-sm text-cool-gray-500">
          <RiGroupFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ $filters.pluralize(mission.places_left, 'place restante', 'places restantes') }}
          </p>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiCalendarEventFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ formattedDates || 'Dates non spécifiées' }}
          </p>
        </div>
        <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiTimeFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ formattedCommitment || 'Engagement non spécifié' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinConversationMission from '@/mixins/conversation/mission'

export default defineNuxtComponent({
  mixins: [MixinConversationMission],
  props: {
    showPlacesLeft: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
})
</script>
