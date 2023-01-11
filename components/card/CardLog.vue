<template>
  <Box :padding="false" variant="flat">
    <div class="p-6">
      <!-- <div class="mb-8">
        <div class="flex justify-between p-4 bg-gray-50">
          <div class="font-semibold">
            XXX
          </div>
          <DsfrLink
            icon="RiArrowRightLine"
            :to="url"
            class="ml-8 flex-none self-center"
          >
            Voir
          </DsfrLink>
        </div>
      </div> -->
      <div class="flex flex-col lg:flex-row lg:justify-between gap-8">
        <div class="flex">
          <Avatar
            :img-srcset="
              log.causer?.profile.avatar &&
                log.causer?.profile.avatar.urls.thumbMedium
            "
            :img-src="
              log.causer?.profile.avatar
                ? log.causer?.profile.avatar.urls.original
                : null
            "
            :initials="log.causer?.profile.short_name"
            size="sm"
            class="mr-4"
          />
          <div>
            <div>
              <span class="font-bold">{{ log.causer?.profile.full_name }}</span> {{ action }} <span class="font-bold">{{ objectName }}</span>
            </div>
            <div class="text-sm text-gray-600">
              {{
                $dayjs().to($dayjs(log.created_at)).charAt(0).toUpperCase() +
                  $dayjs().to($dayjs(log.created_at)).slice(1)
              }}
            </div>
          </div>
          <div class="ml-4">
            <DsfrBadge
              size="sm"
              type="info"
              no-icon
            >
              {{ log.subject_type.replace('App\\Models\\','') }}
            </DsfrBadge>
          </div>
        </div>
      </div>
    </div>
  </Box>
</template>

<script>
import DsfrBadge from '@/components/dsfr/Badge.vue'

export default {
  components: { DsfrBadge },
  props: {
    log: {
      type: Object,
      default: null
    }
  },
  computed: {
    url () {
      switch (this.log.subject_type) {
        case 'App\\Models\\Mission':
          return `/admin/missions/${this.log.subject_id}`
        case 'App\\Models\\Structure':
          return `/admin/organisations/${this.log.subject_id}`
        default:
          return ''
      }
    },
    structure () {
      return this.log.subject_type === 'App\\Models\\Structure'
        ? this.log.subject
        : null
    },
    mission () {
      return this.log.subject_type === 'App\\Models\\Mission'
        ? this.log.subject
        : null
    },
    participation () {
      return this.log.subject_type === 'App\\Models\\Participation'
        ? this.log.subject
        : null
    },
    action () {
      if (this.log.log_name === 'note') {
        return 'a ajouté une note à'
      }
      if (this.log.description === 'created') {
        return 'a créé'
      }
      if (this.log.description === 'updated') {
        return 'a modifié'
      }
      return this.log.description
    },
    objectName () {
      if (this.mission || this.structure) {
        return this.log.subject.name
      }
      if (this.participation) {
        return this.log?.participationMission?.name
      }
      return this.log.subject_type
    }
  }
}
</script>
