<template>
  <BaseDrawer :is-open="Boolean(activityLogId)" @close="$emit('close')">
    <template #title>
      <BaseHeading v-if="profile" :level="3" class="text-jva-blue-500">
        <nuxt-link no-prefetch :to="`/admin/utilisateurs/${profile.id}`" class="hover:underline">
          {{ profile.full_name }}
        </nuxt-link>
      </BaseHeading>
    </template>
    <template v-if="profile && activityLog">
      <div v-if="activityLog.causer?.roles || profile.tags" class="mt-2 mb-4 flex flex-wrap gap-2">
        <template v-if="activityLog.causer?.roles">
          <DsfrTag v-for="role in activityLog.causer.roles" :key="role.id">
            {{ $filters.label(role.name, 'roles') }}
          </DsfrTag>
        </template>
        <template v-if="profile.tags">
          <DsfrTag v-for="tag in profile.tags" :key="tag.id">
            {{ tag.name }}
          </DsfrTag>
        </template>
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :activity-log="activityLog" />
      <BoxChanges class="mb-8" :activity-log="activityLog" />
      <div class="flex justify-center mb-10">
        <BaseLink v-if="url" :to="url" class="uppercase font-semibold text-sm hover:underline">
          Accéder à l'élément
        </BaseLink>
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
import BoxInformations from '@/components/section/logs/BoxInformations.vue'
import BoxChanges from '@/components/section/logs/BoxChanges.vue'

export default defineNuxtComponent({
  components: {
    BoxInformations,
    BoxChanges,
  },
  props: {
    activityLogId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      activityLog: null,
      profile: null,
    }
  },

  computed: {
    url() {
      if (this.activityLog.description === 'deleted') {
        return null
      }

      switch (this.activityLog.subject_type) {
        case 'App\\Models\\Mission':
          return `/admin/missions/${this.activityLog.subject_id}`
        case 'App\\Models\\Structure':
          return `/admin/organisations/${this.activityLog.subject_id}`
        case 'App\\Models\\Participation':
          return `/admin/participations?filter[search]=${this.activityLog.subject_id}`
        case 'App\\Models\\Profile':
          return `/admin/utilisateurs/${this.activityLog.subject_id}`
        default:
          return null
      }
    },
  },
  watch: {
    activityLogId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.activityLogId) {
        return null
      }
      const activityLog = await apiFetch(`/activity-logs/${this.activityLogId}`)
      this.activityLog = activityLog
      this.profile = activityLog.causer ? activityLog.causer.profile : activityLog.subject
    },
  },
})
</script>
