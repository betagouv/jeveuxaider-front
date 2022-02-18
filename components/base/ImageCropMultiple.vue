<template>
  <div>
    <ImageCrop
      v-for="(value, index) in values"
      :key="index"
      :default-value="value"
      :preview-width="previewWidth"
      :preview-height="previewHeight"
      :preview-fit="previewFit"
      :preview-classes="previewClasses"
      :min-width="minWidth"
      :min-height="minHeight"
      :ratio="ratio"
      :variant="variant"
      :upload-variant="uploadVariant"
      :upload-max-size="uploadMaxSize"
      :disable-delete="disableDelete"
      @add="onAdd($event)"
      @delete="onDelete($event, index)"
      @crop="$emit('crop', $event)"
    />
  </div>
</template>

<script>

export default {
  props: {
    limit: { type: Number, default: null },
    medias: { type: Array, default: () => [] },
    previewWidth: { type: Number, default: 200 },
    previewHeight: { type: Number, default: null },
    previewFit: { type: String, default: 'cover', validator: s => ['cover', 'contain'].includes(s) },
    previewClasses: { type: String, default: '' },
    minWidth: { type: Number, default: 200 },
    minHeight: { type: Number, default: null },
    ratio: { type: Number, default: 1 },
    variant: { type: String, default: 'default', validator: s => ['default', 'compact'].includes(s) },
    uploadVariant: { type: String, default: 'default' },
    uploadMaxSize: { type: Number, default: 1000000 },
    disableDelete: { type: Boolean, default: false }
  },
  data () {
    return {
      addedMedias: 0,
      // deletedMedias: 0,
      values: this.medias
    }
  },
  computed: {
    nbMedias () {
      const nbMedias = this.medias.length + this.addedMedias
      return this.limit ? Math.min(this.limit, nbMedias) : nbMedias
    }
  },
  methods: {
    onAdd ($event) {
      this.addedMedias++
      this.$emit('add', $event)
    },
    onDelete ($event, index) {
      // this.values.splice(index, 1)
      // this.deletedMedias++
      this.$emit('delete', $event)
    }
  }
}
</script>
