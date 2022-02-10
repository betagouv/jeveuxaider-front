<template>
  <div>
    <Upload
      v-if="!files.length"
      label="Ajouter une photo"
      :default-value="files"
      extensions=".jpg, .png, .webp"
      @add="onUploadAdd"
    />

    <template v-else>
      <!-- Preview -->
      <div :style="`width: ${previewWidth}px; height: ${previewWidth * ratio}px`">
        <img
          class="rounded-lg shadow-xl object-cover object-center w-full h-full"
          :srcset="previewSrcset"
          alt="Preview"
          :sizes="`${previewWidth}px`"
          :width="previewWidth"
          :height="previewWidth * ratio"
        >
      </div>

      <!-- Actions -->
      <div class="mt-4 flex items-start space-x-4">
        <slot name="button-crop" :events="{ showModal }">
          <Button
            variant="secondary"
            @click.native.prevent="showModal = true"
          >
            Recadrer
          </Button>
        </slot>

        <slot :events="{ onDelete }" name="button-delete">
          <Button
            variant="red"
            icon="TrashIcon"
            @click.native.prevent="onDelete"
          >
            Supprimer
          </Button>
        </slot>
      </div>

      <Modal
        v-if="showModal"
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
          :min-height="minWidth * ratio"
          @ready="onCropperReady"
        />

        <template #footer slot-scope="">
          <Button variant="secondary" @click.native.prevent.stop="showModal = false">
            Annuler
          </Button>

          <Button @click.native.prevent.stop="doCrop">
            Valider
          </Button>
        </template>
      </Modal>
    </template>
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
    minWidth: { type: Number, default: 200 },
    ratio: { type: Number, default: 1 }
  },
  data () {
    return {
      showModal: false,
      files: this.defaultValue ? [this.defaultValue] : [],
      previewSrcset: this.defaultValue?.urls?.formPreview ?? this.defaultValue?.urls?.original,
      originalSrc: this.defaultValue?.urls?.original,
      manipulations: this.defaultValue?.manipulations ?? {}
    }
  },
  methods: {
    onUploadAdd (files) {
      this.$emit('add', files[0])
      this.files = files
      this.previewSrcset = URL.createObjectURL(files[0])
      this.originalSrc = this.previewSrcset
    },
    onDelete () {
      this.$emit('delete', this.files[0])
      this.files = []
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
