<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div v-if="showTitle" class="uppercase font-semibold text-gray-600">
        Actions
      </div>
      <Link :to="`/admin/other/logs?filter[search]=${profile.email}`" icon="ChevronRightIcon">
        {{ linkLabel }}
      </Link>
    </div>
    <Box :variant="boxVariant" :padding="boxPadding" :loading="loading">
      <slot name="box-before" />
      <DescriptionList v-if="logs">
        <DescriptionListItem term="Total" :description="logs.activity_logs_count" />
        <DescriptionListItem term="30 dern. jours" :description="logs.activity_logs_last_days_count" />
        <DescriptionListItem term="Dernière action" :description="logs.last_activity_log ? $dayjs(logs.last_activity_log?.created_at).fromNow() : null" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true
    },
    showAction: {
      type: Boolean,
      default: true
    },
    linkLabel: {
      type: String,
      default: 'Consulter'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    boxVariant: {
      type: [String],
      default: 'flat'
    },
    boxPadding: {
      type: [String, Boolean],
      default: 'xs'
    }
  },
  data () {
    return {
      loading: true,
      logs: null
    }
  },
  async fetch () {
    this.loading = true

    await this.$axios.get(`/users/${this.profile.user_id}/actions`).then((response) => {
      this.loading = false
      this.logs = response.data
    })
  },
  watch: {
    profile: '$fetch'
  }
}
</script>
