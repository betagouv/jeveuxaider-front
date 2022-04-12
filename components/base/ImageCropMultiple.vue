<template>
  <div>
    <ImageCrop
      v-for="(value, index) in values"
      :key="value.id"
      :default-value="value"
      :preview-width="previewWidth"
      :preview-height="previewHeight"
      :preview-fit="previewFit"
      :preview-classes="previewClasses"
      :preview-conversion="previewConversion"
      :min-width="minWidth"
      :min-height="minHeight"
      :ratio="ratio"
      :variant="variant"
      :upload-variant="uploadVariant"
      :upload-max-size="uploadMaxSize"
      :disable-delete="disableDelete && !!value.created_at"
      :warning-title="warningTitle"
      :warning="warning"
      @add="onAdd($event, index)"
      @delete="onDelete($event, index)"
      @crop="$emit('crop', $event)"
    />
  </div>
</template>

<script>
import uniqid from 'uniqid'

export default {
  props: {
    limit: { type: Number, default: null },
    medias: { type: Array, default: () => [] },
    previewWidth: { type: Number, default: 200 },
    previewHeight: { type: Number, default: null },
    previewFit: { type: String, default: 'cover', validator: s => ['cover', 'contain'].includes(s) },
    previewClasses: { type: String, default: '' },
    previewConversion: { type: String, default: '' },
    minWidth: { type: Number, default: 200 },
    minHeight: { type: Number, default: null },
    ratio: { type: Number, default: 1 },
    variant: { type: String, default: 'default', validator: s => ['default', 'compact'].includes(s) },
    uploadVariant: { type: String, default: 'default' },
    uploadMaxSize: { type: Number, default: 1000000 },
    disableDelete: { type: Boolean, default: false },
    warningTitle: { type: String, default: null },
    warning: { type: String, default: null }
  },
  data () {
    return {
      values: this.medias
    }
  },
  computed: {

  },
  mounted () {
    if (!this.limit || this.values.length < this.limit) {
      this.addEmptyMedia()
    }
  },
  methods: {
    onAdd ($event, index) {
      this.$emit('add', $event)
      if (!this.limit || this.values.length < this.limit) {
        this.addEmptyMedia()
      }
    },
    onDelete ($event, index) {
      this.values.splice(index, 1)
      this.$emit('delete', $event)

      // @todo: seulement si necessaire
      if (this.limit && this.limit == (this.values.length + 1)) {
        this.addEmptyMedia()
      }
    },
    addEmptyMedia () {
      this.values.push({ id: uniqid() })
    }
  }
}
</script>
