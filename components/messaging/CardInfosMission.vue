<template>
  <div class="flex">
    <div class="w-10 flex items-center justify-center">
      <span class="-rotate-90 whitespace-nowrap uppercase text-jva-blue-500">
        La mission</span>
    </div>
    <div class="p-4 lg:p-6 flex-1 flex flex-col gap-4 border border-gray-300 border-l-4 border-l-jva-blue-500">
      <div class="flex items-center">
        <div class="text-xl font-bold">
          {{ mission.name }}
        </div>
        <nuxt-link :to="mission.full_url" target="_blank">
          <RiExternalLinkLine class="text-jva-blue-500 fill-current h-6 w-6" />
        </nuxt-link>
      </div>
      <div class="flex space-x-4 items-center">
        <Badge v-if="mission.type == 'Mission à distance'">
          Mission à distance
        </Badge>
        <Badge v-if="mission.type == 'Mission en présentiel'">
          Mission en présentiel
        </Badge>
        <div v-if="mission.zip && mission.type == 'Mission en présentiel'" class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ mission.city }} ({{ mission.zip }})
          </p>
        </div>
        <div class="flex space-x-1 truncate text-sm text-cool-gray-500">
          <RiGroupFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ mission.places_left | pluralize('place restante', 'places restantes') }}
          </p>
        </div>
      </div>
      <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
        <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="truncate leading-none">
          Du <span class="font-semibold">XXX</span> au <span class="font-semibold">YYY</span>
        </p>
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
    mission: {
      type: Object,
      required: true
    }
  },
  computed: {

  }
}
</script>

<style>

</style>
