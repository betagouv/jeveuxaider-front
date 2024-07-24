<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div v-if="showTitle" class="uppercase font-semibold text-gray-600">Actions</div>
      <DsfrLink :to="`/admin/other/logs?filter[search]=${profile.email}`" class="text-jva-blue-500">
        {{ linkLabel }}
      </DsfrLink>
    </div>
    <BaseBox :variant="boxVariant" :padding="boxPadding" :loading="loading">
      <slot name="box-before" />
      <BaseDescriptionList v-if="logs">
        <BaseDescriptionListItem term="Total" :description="logs.activity_logs_count" />
        <BaseDescriptionListItem
          term="30 dern. jours"
          :description="logs.activity_logs_last_days_count"
        />
        <BaseDescriptionListItem
          term="Dernière action"
          :description="
            logs.last_activity_log ? $dayjs(logs.last_activity_log?.created_at).fromNow() : null
          "
        />
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    profile: {
      type: Object,
      required: true,
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    linkLabel: {
      type: String,
      default: 'Consulter',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    boxVariant: {
      type: [String],
      default: 'flat',
    },
    boxPadding: {
      type: [String, Boolean],
      default: 'xs',
    },
  },
  data() {
    return {
      loading: true,
      logs: null,
    }
  },
  created() {
    this.fetch()
  },
  watch: {
    profile: 'fetch',
  },
  methods: {
    async fetch() {
      this.loading = true

      await apiFetch(`/users/${this.profile.user_id}/actions`).then((response) => {
        this.loading = false
        this.logs = response
      })
    },
  },
})
</script>
