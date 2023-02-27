<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Modifications
      </div>
    </div>
    <Box :variant="boxVariant" :padding="boxPadding">
      <slot name="box-before" />
      <DescriptionList v-if="activityLog">
        <DescriptionListItem term="User ID" :description="activityLog.causer_id" />
        <DescriptionListItem term="Subject ID" :description="activityLog.subject_id" />
        <DescriptionListItem term="Subject type" :description="activityLog.subject_type" />
        <DescriptionListItem term="Date" :description="$dayjs(activityLog.created_at).fromNow()" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    activityLog: {
      type: Object,
      required: true
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
    }
  }
}
</script>
