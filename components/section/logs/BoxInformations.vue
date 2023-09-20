<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Modifications</div>
    </div>
    <BaseBox :variant="boxVariant" :padding="boxPadding">
      <slot name="box-before" />
      <BaseDescriptionList v-if="activityLog">
        <BaseDescriptionListItem term="User ID" :description="activityLog.causer_id" />
        <BaseDescriptionListItem term="Subject ID" :description="activityLog.subject_id" />
        <BaseDescriptionListItem term="Subject type" :description="activityLog.subject_type" />
        <BaseDescriptionListItem
          term="Date"
          :description="$dayjs(activityLog.created_at).fromNow()"
        />
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    activityLog: {
      type: Object,
      required: true,
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
})
</script>
