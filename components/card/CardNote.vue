<template>
  <Box :padding="false" variant="flat">
    <div class="p-6">
      <div class="mb-8 ">
        <div class="flex justify-between p-4 bg-gray-50">
          <div class="font-semibold">
            {{ note.notable.name }}
          </div>
          <DsfrLink icon="RiArrowRightLine" :to="url" class="ml-8 flex-none self-center">
            Voir
          </DsfrLink>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row lg:justify-between gap-8">
        <div class="flex">
          <Avatar
            :img-srcset="note.user.profile.avatar && note.user.profile.avatar.urls.thumbMedium"
            :img-src="note.user.profile.avatar ? note.user.profile.avatar.urls.original : null"
            :initials="note.user.profile.short_name"
            size="sm"
            class="mr-4"
          />
          <div>
            <div class="font-bold">
              {{ note.user.profile.full_name }}
            </div>
            <div class="text-sm text-gray-600">
              {{ $dayjs().to($dayjs(note.created_at)).charAt(0).toUpperCase() + $dayjs().to($dayjs(note.created_at)).slice(1) }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center" />
      </div>
      <div class="mt-8">
        <TextFormatted v-if="note.content" :max-lines="4" :text="`“${note.content}“`" class="text-gray-500" />
      </div>
    </div>
  </Box>
</template>

<script>
import DsfrLink from '@/components/dsfr/Link.vue'

export default {
  components: {
    DsfrLink
  },
  props: {
    note: {
      type: Object,
      default: null
    }
  },
  computed: {
    url () {
      switch (this.note.notable_type) {
        case 'App\\Models\\Mission': return `/admin/missions/${this.note.notable_id}`
        case 'App\\Models\\Structure': return `/admin/organisations/${this.note.notable_id}`
        default: return ''
      }
    }
  }
}
</script>
