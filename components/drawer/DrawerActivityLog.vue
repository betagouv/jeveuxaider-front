<template>
  <Drawer :is-open="Boolean(activityLogId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="profile" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/utilisateurs/${profile.id}`" class="hover:underline">
          {{ profile.full_name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="profile && activityLog">
      <div
        v-if="activityLog.causer?.roles || profile.tags"
        class="mt-2 mb-4 flex flex-wrap gap-2"
      >
        <template v-if="activityLog.causer?.roles">
          <Tag v-for="role in activityLog.causer.roles" :key="role.id">
            {{ role.name|label('roles') }}
          </Tag>
        </template>
        <template v-if="profile.tags">
          <Tag v-for="tag in profile.tags" :key="tag.id">
            {{ tag.name }}
          </Tag>
        </template>
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :activity-log="activityLog" />
      <BoxChanges class="mb-8" :activity-log="activityLog" />
      <div class="flex justify-center mb-10">
        <Link v-if="url" :to="url" class="uppercase font-semibold text-sm hover:underline">
          Accéder à l'élément
        </Link>
      </div>
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/logs/BoxInformations'
import BoxChanges from '@/components/section/logs/BoxChanges'
import Tag from '@/components/dsfr/Tag'

export default {
  components: {
    Tag,
    BoxInformations,
    BoxChanges
  },
  props: {
    activityLogId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      activityLog: null,
      profile: null
    }
  },
  async fetch () {
    if (!this.activityLogId) {
      return null
    }
    const { data: activityLog } = await this.$axios.get(`/activity-logs/${this.activityLogId}`)
    this.activityLog = activityLog
    this.profile = activityLog.causer ? activityLog.causer.profile : activityLog.subject
  },
  computed: {
    url () {
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
    }
  },
  watch: {
    activityLogId: '$fetch'
  }
}
</script>
