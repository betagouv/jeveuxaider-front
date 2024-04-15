<template>
  <BaseMediaPicker
    :medias="mediasFromDomaine"
    :defaults="defaults"
    :limit="limit"
    :preview-conversion="previewConversion"
    :preview-sizes="previewSizes"
    :hide-pencil="hidePencil"
    @change="$emit('change', $event)"
  >
    <template #empty>
      <slot name="empty" />
    </template>
  </BaseMediaPicker>
</template>

<script>
export default defineNuxtComponent({
  props: {
    collection: {
      type: String,
      required: true,
    },
    domaineIds: {
      type: Array,
      default: () => [],
    },
    defaults: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 1,
    },
    previewConversion: { type: String, default: 'formPreview' },
    previewSizes: { type: String, default: undefined },
    hidePencil: { type: Boolean, default: false },
  },
  data() {
    return {
      openModal: null,
      mediasFromDomaine: [],
    }
  },
  watch: {
    domaineIds: {
      immediate: true,
      async handler() {
        await this.fetchMediasDomaine()
      },
    },
  },
  methods: {
    async fetchMediasDomaine() {
      const medias = await apiFetch('/medias', {
        params: {
          'filter[collection_name]': this.collection,
          'filter[model_id]': this.domaineIds.join(','),
          pagination: -1,
        },
      })

      this.mediasFromDomaine = medias.data
    },
    onNewSelection(media, index) {
      this.$emit('change', { media, index })
    },
  },
})
</script>
