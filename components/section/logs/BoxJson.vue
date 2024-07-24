<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">JSON</div>
    </div>
    <BaseBox :variant="boxVariant" :padding="boxPadding">
      <slot name="box-before" />
      <vue-json-pretty :data="json" />
    </BaseBox>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default defineNuxtComponent({
  components: {
    VueJsonPretty,
  },
  props: {
    json: {
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
