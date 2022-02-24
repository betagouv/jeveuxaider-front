<template>
  <Box :padding="false">
    <div class="border-b p-6">
      <div class="font-bold">
        {{ temoignage.participation.mission.name }}
      </div>
      <div class="text-gray-500 text-sm mt-2">
        {{ temoignage.participation.mission.structure.name }}
      </div>
    </div>
    <div class="p-6">
      <div class="flex justify-between gap-8">
        <div class="flex">
          <Avatar
            :image="temoignage.participation.profile.avatar && temoignage.participation.profile.avatar.urls.thumbMedium"
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
        <div class="">
          <StarRating
            :rating="temoignage.grade"
            :show-rating="false"
            inactive-color="#E0E0E0"
            active-color="#EF9F03"
            :read-only="true"
            :star-size="22"
          />
        </div>
      </div>
      <div class="mt-8">
        <TextFormatted v-if="temoignage.testimony" :max-lines="4" :text="`“${temoignage.testimony}“`" class="text-gray-500 max-w-lg" />
      </div>
    </div>
  </Box>
</template>

<script>

export default {
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
