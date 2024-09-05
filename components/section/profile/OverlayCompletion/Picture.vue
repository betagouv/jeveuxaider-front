<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default defineNuxtComponent({
  emits: ['delete'],
  components: {
    Cropper,
  },
  data() {
    return {
      originalSrc: this.$stores.profileOverlayCompletion.avatar?.file
        ? URL.createObjectURL(this.$stores.profileOverlayCompletion.avatar?.file)
        : this.$stores.profileOverlayCompletion.avatar?.urls.original,
    }
  },
  methods: {
    onCropperReady() {
      if (!!this.$stores.profileOverlayCompletion.cropCoordinates) {
        const manualCrop = this.$stores.profileOverlayCompletion.cropCoordinates.split(',')
        this.$refs.cropper.setCoordinates({
          width: manualCrop[0],
          height: manualCrop[1],
          left: manualCrop[2],
          top: manualCrop[3],
        })
      }
    },
    onChange({ coordinates }) {
      this.$stores.profileOverlayCompletion.setCrop(
        `${coordinates.width},${coordinates.height},${coordinates.left},${coordinates.top}`
      )
    },
  },
})
</script>

<template>
  <Cropper
    ref="cropper"
    class="cropper h-[280px]"
    :src.sync="originalSrc"
    :stencil-props="{ aspectRatio: 1 }"
    :resize-image="false"
    :transitions="false"
    :min-width="200"
    :min-height="200"
    @ready="onCropperReady"
    @change="onChange"
  />

  <div class="flex justify-center mt-2">
    <DsfrButton
      type="tertiary-no-outline"
      size="sm"
      icon="RiCloseLine"
      class="text-red-700"
      @click="$emit('delete')"
    >
      Supprimer
    </DsfrButton>
  </div>
</template>

<style lang="postcss" scoped>
:deep(.vue-advanced-cropper__background),
:deep(.vue-advanced-cropper__foreground) {
  background: white;
}

:deep(.vue-advanced-cropper__foreground) {
  opacity: 0.4;
}
</style>
