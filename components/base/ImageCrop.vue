<template>
  <div>
    <BaseUpload
      v-if="!files.length"
      :show-files="false"
      label="Ajouter une photo"
      :default-value="files"
      extensions=".jpg, .png, .webp"
      :variant="uploadVariant"
      :max-size="uploadMaxSize"
      :warning-title="warningTitle"
      :warning="warning"
      @add="onUploadAdd"
    >
      <template #trigger="triggerSlotData">
        <slot name="trigger" v-bind="triggerSlotData" />
      </template>
    </BaseUpload>

    <slot v-else name="preview" v-bind="{ setShowModal, previewSrcset }">
      <div class="flex flex-col h-full">
        <!-- Preview -->
        <div
          class="preview-wrapper flex-grow"
          :style="{
            maxWidth: previewWidth ? `${previewWidth}px` : null,
            maxHeight: previewHeight
              ? `${previewHeight}px`
              : ratio
              ? `${previewWidth / ratio}px`
              : null,
          }"
        >
          <img
            alt="Preview"
            class="preview shadow-xl object-center w-full h-full"
            :class="[
              { 'object-cover': previewFit == 'cover' },
              { 'object-contain': previewFit == 'contain' },
              previewClasses,
            ]"
            :srcset="previewSrcset"
            :sizes="previewWidth ? `${previewWidth}px` : null"
            :width="previewWidth ? previewWidth : null"
            :height="previewHeight ? previewHeight : ratio ? previewWidth / ratio : null"
            :style="{
              aspectRatio: ratio ? ratio : null,
              width: previewWidth ? `${previewWidth}px` : null,
              height: previewHeight ? `${previewHeight}px` : null,
            }"
          />
        </div>

        <!-- Actions -->
        <div class="actions mt-4 flex items-stretch space-x-4">
          <slot name="button-crop" :events="{ showModal }">
            <BaseButton
              variant="secondary"
              class="button-crop"
              :size="variant == 'compact' ? 'xs' : 'sm'"
              @click.native.prevent="showModal = true"
            >
              Recadrer
            </BaseButton>
          </slot>

          <slot :events="{ onDelete }" name="button-delete">
            <BaseButton
              :disabled="disableDelete"
              variant="red"
              icon="RiDeleteBinLine"
              :size="variant == 'compact' ? 'xs' : 'sm'"
              class="button-delete"
              @click.native.prevent="onDelete"
            />
          </slot>
        </div>
      </div>
    </slot>

    <ClientOnly>
      <Teleport to="#teleport-body-end">
        <BaseModal
          :key="`modal_crop_${uuid}`"
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

          <template #footer>
            <slot name="modalFooter" v-bind="{ doCrop, setShowModal, onDelete }">
              <DsfrButton type="secondary" @click="showModal = false"> Annuler </DsfrButton>
              <DsfrButton @click="doCrop"> Valider </DsfrButton>
            </slot>
          </template>
        </BaseModal>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  emits: ['add', 'delete', 'crop'],
  components: {
    Cropper,
  },
  props: {
    defaultValue: { type: Object, default: () => {} },
    previewWidth: { type: Number, default: 200 },
    previewHeight: { type: Number, default: null },
    previewFit: {
      type: String,
      default: 'cover',
      validator: (s) => ['cover', 'contain'].includes(s),
    },
    previewClasses: { type: String, default: '' },
    previewConversion: { type: String, default: 'formPreview' },
    minWidth: { type: Number, default: 200 },
    minHeight: { type: Number, default: null },
    maxWidth: { type: Number, default: 8000 },
    maxHeight: { type: Number, default: 8000 },
    ratio: { type: Number, default: 1 },
    variant: {
      type: String,
      default: 'default',
      validator: (s) => ['default', 'compact'].includes(s),
    },
    uploadVariant: { type: String, default: 'default' },
    uploadMaxSize: { type: Number, default: 5000000 },
    disableDelete: { type: Boolean, default: false }, // @todo handle relations
    warningTitle: { type: String, default: null },
    warning: { type: String, default: null },
  },
  data() {
    return {
      showModal: false,
      files: this.defaultValue?.urls ? [this.defaultValue] : [],
      previewSrcset:
        this.defaultValue?.urls?.[this.previewConversion] ?? this.defaultValue?.urls?.original,
      originalSrc: this.defaultValue?.urls?.original,
      manipulations: this.defaultValue?.manipulation ?? {},
      uuid: uuidv4(),
    }
  },
  watch: {
    defaultValue(newDefaultValue) {
      this.files = newDefaultValue?.urls ? [newDefaultValue] : []
      this.previewSrcset =
        newDefaultValue?.urls?.[this.previewConversion] ?? newDefaultValue?.urls?.original
      this.originalSrc = newDefaultValue?.urls?.original
      this.manipulations = newDefaultValue?.manipulation ?? {}
    },
  },
  methods: {
    onUploadAdd(files) {
      const errors = []
      const img = URL.createObjectURL(files[0])
      const imgDom = document.createElement('img')
      imgDom.src = img
      imgDom.onload = () => {
        if (imgDom.width > this.maxWidth) {
          errors.push(`La largeur ne doit pas dépasser ${this.maxWidth} pixels.`)
        }
        if (imgDom.height > this.maxHeight) {
          errors.push(`La hauteur ne doit pas dépasser ${this.maxWidth} pixels.`)
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
    onDelete() {
      if (!this.disableDelete) {
        this.$emit('delete', this.files[0])
        this.files = []
        this.manipulations = {}
      }
    },
    onCropperReady() {
      if (this.manipulations?.manualCrop) {
        const manualCrop = this.manipulations.manualCrop.split(',')
        this.$refs.cropper.setCoordinates({
          width: manualCrop[0],
          height: manualCrop[1],
          left: manualCrop[2],
          top: manualCrop[3],
        })
      }
    },
    doCrop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult()
      this.manipulations.manualCrop = `${coordinates.width},${coordinates.height},${coordinates.left},${coordinates.top}`
      this.$emit('crop', {
        manipulations: this.manipulations,
        file: this.files[0],
      })
      this.previewSrcset = canvas.toDataURL('image/jpeg')
      this.showModal = false
    },
    setShowModal(val) {
      this.showModal = val
    },
  },
})
</script>
