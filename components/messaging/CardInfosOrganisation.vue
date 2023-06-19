<template>
  <div class="flex">
    <div class="w-10 flex items-center justify-center">
      <span class="-rotate-90 whitespace-nowrap uppercase text-jva-blue-500">
        L’organisation</span>
    </div>
    <div class="p-4 lg:p-6 flex-1 flex flex-col gap-4 border border-gray-300 border-l-4 border-l-jva-blue-500">
      <div class="flex items-center gap-4">
        <div class="text-xl font-bold">
          {{ organisation.name }}
        </div>
        <nuxt-link v-if="isAssociation" :to="organisation.full_url" target="_blank">
          <RiExternalLinkLine class="text-jva-blue-500 fill-current h-6 w-6" />
        </nuxt-link>
      </div>
      <div class="flex space-x-4 items-center">
        <Badge>
          {{ organisation.statut_juridique | label('structure_legal_status') }}
        </Badge>
        <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            Inscrite le {{ $dayjs(organisation.created_at).format('D MMM YYYY') }}
          </p>
        </div>
        <div v-if="organisation.zip" class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
          <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="truncate leading-none">
            {{ organisation.city }} ({{ organisation.zip }})
          </p>
        </div>
      </div>
      <div class="flex space-x-1 items-center text-sm text-cool-gray-500">
        <p class="">
          {{ organisation.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from '@/components/dsfr/Badge.vue'
import MixinConversationOrganisation from '@/mixins/conversation/organisation'

export default {
  components: {
    Badge
  },
  mixins: [MixinConversationOrganisation],
  props: {

  },
  computed: {

  }
}
</script>

<style>

</style>
