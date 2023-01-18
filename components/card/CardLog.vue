<template>
  <Box :padding="false" variant="flat">
    <div class="p-6">
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
              <template v-if="log.causer">
                <span class="font-bold">{{ log.causer?.profile.full_name }}</span>
                <template v-if="log.subject_type === 'App\\Models\\Structure'">
                  {{ action }} la structure <span class="font-bold">{{ log?.data?.subject_title }}</span>
                </template>
                <template v-if="log.subject_type === 'App\\Models\\Mission'">
                  {{ action }} la mission <span class="font-bold">{{ log?.data?.subject_title }}</span>
                </template>
                <template v-if="log.subject_type === 'App\\Models\\Participation'">
                  {{ action }} la participation de <span class="font-bold">{{ log?.data?.subject_title }}</span>
                </template>
                <template v-if="log.subject_type === 'App\\Models\\Profile'">
                  {{ action }} le compte <span class="font-bold">{{ log?.data?.subject_title }}</span>
                </template>
              </template>
              <template v-else>
                <template v-if="log.subject_type === 'App\\Models\\Profile'">
                  <span class="font-bold">{{ log?.data?.subject_title }}</span> a crée son compte
                </template>
              </template>
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
              {{ subjectTypeLabel }}
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
      if (this.log.description === 'deleted') {
        return 'a supprimé'
      }
      if (this.log.description === 'duplicated') {
        return 'a dupliqué'
      }
      return this.log.description
    },
    subjectTypeLabel () {
      switch (this.log.subject_type) {
        case 'App\\Models\\Mission':
          return 'Mission'
        case 'App\\Models\\Structure':
          return 'Organisation'
        case 'App\\Models\\Participation':
          return 'Participation'
        case 'App\\Models\\Profile':
          return 'Utilisateur'
        default:
          return this.log.subject_type
      }
    }

  }
}
</script>
