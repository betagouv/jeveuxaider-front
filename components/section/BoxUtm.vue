<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div v-if="showTitle" class="uppercase font-semibold text-gray-600">
        {{ title }}
      </div>
    </div>
    <BaseBox :variant="boxVariant" :padding="boxPadding">
      <BaseDescriptionList>
        <BaseDescriptionListItem term="Source" :description="model.utm_source" />
        <BaseDescriptionListItem term="Campaign" :description="model.utm_campaign" />
        <BaseDescriptionListItem term="Medium" :description="model.utm_medium" />
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    model: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: 'UTM',
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
})
</script>
