<template>
  <BaseBox :padding="false" variant="flat">
    <div class="p-6">
      <div class="flex flex-col lg:flex-row lg:justify-between gap-8">
        <div class="flex">
          <BaseAvatar
            :img-srcset="log.causer?.profile.avatar && log.causer?.profile.avatar.urls.thumbMedium"
            :img-src="log.causer?.profile.avatar ? log.causer?.profile.avatar.urls.original : null"
            :initials="log.causer?.profile.short_name"
            size="sm"
            class="mr-4"
          />
          <div>
            <div>
              <template v-if="log.causer">
                <span class="font-bold">{{ log.causer?.profile.full_name }} </span>
                <template v-if="log.log_name === 'export'">
                  {{ action }}
                  <span class="font-bold">
                    {{ log.properties?.items_count }} {{ log.properties?.type }}</span
                  >
                </template>

                <template v-if="log.subject_type === 'App\\Models\\Structure'">
                  {{ action }} la structure
                  <span class="font-bold">{{ log?.subject?.name }}</span>
                </template>

                <template v-if="log.subject_type === 'App\\Models\\Mission'">
                  {{ action }} la mission
                  <span class="font-bold">{{ log?.subject?.name }}</span>
                </template>

                <template v-if="log.subject_type === 'App\\Models\\Participation'">
                  <template v-if="log.description === 'created'">
                    a candidaté à la mission
                    <span class="font-bold">{{ log?.subject?.mission?.name }}</span>
                  </template>
                  <template v-if="log.description === 'updated'">
                    modifié la candidature de
                    <span class="font-bold">{{ log?.subject?.profile?.full_name }}</span>
                    sur la mission
                    <span class="font-bold">{{ log?.subject?.mission?.name }}</span>
                  </template>
                </template>

                <template v-if="log.subject_type === 'App\\Models\\Profile'">
                  {{ action }} le compte
                  <span class="font-bold">{{ log?.subject?.full_name }}</span>
                </template>

                <template v-if="log.subject_type === 'App\\Models\\Rule'">
                  <template v-if="log.description === 'created'">
                    a créé la règle
                    <span class="font-bold">{{ log?.subject?.name }}</span>
                  </template>
                  <template v-if="log.description === 'updated'">
                    a modifié la règle
                    <span class="font-bold">{{ log?.subject?.name }}</span>
                  </template>
                  <template v-if="log.description === 'executed'">
                    a exécuté la règle
                    <span class="font-bold">{{ log?.subject?.name }}</span> sur
                    <span class="font-bold">{{ log?.properties?.items_count }} élément(s)</span>
                  </template>
                </template>
              </template>
              <template v-else>
                <template
                  v-if="
                    log.subject_type === 'App\\Models\\Profile' && log.description === 'created'
                  "
                >
                  <span class="font-bold">{{ log?.subject?.full_name }}</span>
                  a crée son compte
                </template>

                <template
                  v-else-if="
                    log.subject_type === 'App\\Models\\Mission' &&
                    log.description === 'updated' &&
                    log.properties?.attributes?.automatically_closed_at
                  "
                >
                  <span class="font-bold">[AUTO]</span>
                  a automatiquement clôturé la mission
                  <span class="font-bold">{{ log?.subject?.name }}</span>
                </template>

                <template
                  v-else-if="
                    log.subject_type === 'App\\Models\\Participation' &&
                    log.description === 'updated' &&
                    log.event === 'updated - auto closed'
                  "
                >
                  <span class="font-bold">[AUTO]</span>
                  a automatiquement refusé la candidature de
                  <span class="font-bold">{{ log?.subject?.profile?.full_name }}</span>
                  suite à la clôture de la mission
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
            <DsfrBadge size="sm" type="info" no-icon>
              {{ subjectTypeLabel }}
            </DsfrBadge>
          </div>
        </div>
      </div>
    </div>
  </BaseBox>
</template>

<script>
export default defineNuxtComponent({
  props: {
    log: {
      type: Object,
      default: null,
    },
  },
  computed: {
    action() {
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
      if (this.log.log_name === 'export') {
        return 'a exporté'
      }
      return this.log.description
    },
    subjectTypeLabel() {
      switch (this.log.subject_type) {
        case 'App\\Models\\Mission':
          return 'Mission'
        case 'App\\Models\\Structure':
          return 'Organisation'
        case 'App\\Models\\Participation':
          return 'Participation'
        case 'App\\Models\\Profile':
          return 'Utilisateur'
        case 'App\\Models\\Rule':
          return 'Règle'
        default:
          return this.log.subject_type
      }
    },
  },
})
</script>
