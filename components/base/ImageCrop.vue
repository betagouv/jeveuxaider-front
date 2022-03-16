<template>
  <div>
    <Upload
      v-if="!files.length"
      label="Ajouter une photo"
      :default-value="files"
      extensions=".jpg, .png, .webp"
      :variant="uploadVariant"
      :max-size="uploadMaxSize"
      @add="onUploadAdd"
    />

    <div v-else class="flex flex-col h-full">
      <!-- Preview -->
      <div
        class="preview-wrapper flex-grow"
        :style="{
          maxWidth: previewWidth ? `${previewWidth}px` : null,
          maxHeight: previewHeight ? `${previewHeight}px` : ratio ? `${previewWidth / ratio}px` : null,
        }"
      >
        <img
          alt="Preview"
          class="preview rounded-lg shadow-xl object-center w-full h-full"
          :class="[
            {'object-cover': previewFit == 'cover'},
            {'object-contain': previewFit == 'contain'},
            previewClasses
          ]"
          :srcset="previewSrcset"
          :sizes="previewWidth ? `${previewWidth}px` : null"
          :width="previewWidth ? previewWidth : null"
          :height="previewHeight ? previewHeight : ratio ? previewWidth / ratio : null"
          :style="{
            aspectRatio: ratio ? ratio : null,
            width: previewWidth ? `${previewWidth}px` : null,
            height: previewHeight ? `${previewHeight}px` : null
          }"
        >
      </div>

      <!-- Actions -->
      <div class="actions mt-4 flex items-stretch space-x-4">
        <slot name="button-crop" :events="{ showModal }">
          <Button
            variant="secondary"
            class="button-crop"
            :size="variant == 'compact' ? 'xs' : 'sm'"
            @click.native.prevent="showModal = true"
          >
            Recadrer
          </Button>
        </slot>

        <slot :events="{ onDelete }" name="button-delete">
          <Button
            :disabled="disableDelete"
            variant="red"
            icon="TrashIcon"
            :size="variant == 'compact' ? 'xs' : 'sm'"
            class="button-delete"
            @click.native.prevent="onDelete"
          />
        </slot>
      </div>

      <portal to="body-end">
        <Modal
          :is-open="showModal"
          title="Recadrer"
          @close="showModal = false"
        >
          <Cropper
            ref="cropper"
            class="cropper"
            :src.sync="originalSrc"
            :stencil-props="{ aspectRatio: ratio }"
            :resize-image="false"
            :transitions="false"
            :min-width="minWidth"
            :min-height="minHeight ? minHeight : ratio ? minWidth / ratio : null"
            @ready="onCropperReady"
          />

          <template #footer slot-scope="">
            <Button class="mr-3" variant="white" @click.native="showModal = false">
              Annuler
            </Button>

            <Button @click.native="doCrop">
              Valider
            </Button>
          </template>
        </Modal>
      </portal>
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
  components: {
    Cropper
  },
  props: {
    defaultValue: { type: Object, default: () => {} },
    previewWidth: { type: Number, default: 200 },
    previewHeight: { type: Number, default: null },
    previewFit: { type: String, default: 'cover', validator: s => ['cover', 'contain'].includes(s) },
    previewClasses: { type: String, default: '' },
    previewConversion: { type: String, default: 'formPreview' },
    minWidth: { type: Number, default: 200 },
    minHeight: { type: Number, default: null },
    maxWidth: { type: Number, default: 4000 },
    maxHeight: { type: Number, default: 4000 },
    ratio: { type: Number, default: 1 },
    variant: { type: String, default: 'default', validator: s => ['default', 'compact'].includes(s) },
    uploadVariant: { type: String, default: 'default' },
    uploadMaxSize: { type: Number, default: 1000000 },
    disableDelete: { type: Boolean, default: false } // @todo handle relations
  },
  data () {
    return {
      showModal: false,
      files: this.defaultValue?.urls ? [this.defaultValue] : [],
      previewSrcset: this.defaultValue?.urls?.[this.previewConversion] ?? this.defaultValue?.urls?.original,
      originalSrc: this.defaultValue?.urls?.original,
      manipulations: this.defaultValue?.manipulation ?? {}
    }
  },
  methods: {
    onUploadAdd (files) {
      const errors = []
      const img = URL.createObjectURL(files[0])
      const imgDom = document.createElement('img')
      imgDom.src = img
      imgDom.onload = () => {
        if (imgDom.width > this.maxWidth) {
          errors.push(
            `La largeur ne doit pas dépasser ${this.maxWidth} pixels.`
          )
        }
        if (imgDom.height > this.maxHeight) {
          errors.push(
            `La hauteur ne doit pas dépasser ${this.maxWidth} pixels.`
          )
        }

        if (errors.length === 0) {
          this.$emit('add', files[0])
          this.files = files
          this.previewSrcset = img
          this.originalSrc = this.previewSrcset
        } else {
          this.files = []
          this.$toast.error(errors.join('\n'))
        }
      }
    },
    onDelete () {
      if (!this.disableDelete) {
        this.$emit('delete', this.files[0])
        this.files = []
        this.manipulations = {}
      }
    },
    onCropperReady () {
      if (this.manipulations?.manualCrop) {
        const manualCrop = this.manipulations.manualCrop.split(',')
        this.$refs.cropper.setCoordinates({
          width: manualCrop[0],
          height: manualCrop[1],
          left: manualCrop[2],
          top: manualCrop[3]
        })
      }
    },
    doCrop () {
      const { coordinates, canvas } = this.$refs.cropper.getResult()
      this.$set(this.manipulations, 'manualCrop', `${coordinates.width},${coordinates.height},${coordinates.left},${coordinates.top}`)
      this.$emit('crop', { manipulations: this.manipulations, file: this.files[0] })
      this.previewSrcset = canvas.toDataURL('image/jpeg')
      this.showModal = false
    }
  }
}
</script>
