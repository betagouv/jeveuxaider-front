<template>
  <Box :padding="false" variant="flat">
    <div class="border-b p-6">
      <div class="font-bold">
        {{ temoignage.participation.mission.name }}
      </div>
      <div v-if="$store.getters.contextRole != 'responsable'" class="text-gray-500 text-sm mt-2">
        {{ temoignage.participation.mission.structure.name }}
      </div>
    </div>
    <div class="p-6">
      <div class="flex flex-col lg:flex-row lg:justify-between gap-8">
        <div class="flex">
          <Avatar
            :img-srcset="temoignage.participation.profile.avatar && temoignage.participation.profile.avatar.urls.thumbMedium"
            :img-src="temoignage.participation.profile.avatar ? temoignage.participation.profile.avatar.urls.original : null"
            :initials="temoignage.participation.profile.short_name"
            size="sm"
            class="mr-4"
          />
          <div>
            <div class="font-bold">
              {{ temoignage.participation.profile.full_name }}
            </div>
            <div class="text-sm text-gray-600">
              {{ $dayjs().to($dayjs(temoignage.created_at)).charAt(0).toUpperCase() + $dayjs().to($dayjs(temoignage.created_at)).slice(1) }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <StarRating
            :rating="temoignage.grade"
            :show-rating="false"
            inactive-color="#E0E0E0"
            active-color="#EF9F03"
            :read-only="true"
            :star-size="22"
          />
          <OnlineIndicator v-if="['admin', 'referent', 'referent_regional'].includes($store.getters.contextRole)" :published="temoignage.is_published" class="mt-2" />
        </div>
      </div>
      <div class="mt-8">
        <TextFormatted v-if="temoignage.testimony" :max-lines="4" :text="`“${temoignage.testimony}“`" class="text-gray-500" />
      </div>
    </div>
  </Box>
</template>

<script>
import OnlineIndicator from '@/components/custom/OnlineIndicator'

export default {
  components: {
    OnlineIndicator
  },
  props: {
    temoignage: {
      type: Object,
      default: null
    }
  },
  computed: {

  }
}
</script>
