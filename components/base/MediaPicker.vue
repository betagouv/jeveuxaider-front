<template>
  <div class="relative inline-flex flex-col group">
    <img
      :srcset="selectedMediaSrcset"
      class="w-full h-auto rounded-lg cursor-pointer shadow-xl transition"
      @click.prevent="showModal = true"
    >
    <div
      class="z-1 absolute flex justify-center items-center w-8 h-8 text-[#070191] bg-white rounded-full opacity-75 group-hover:opacity-100 pointer-events-none"
      style="right: 12px; bottom: 12px"
    >
      <!-- <div
        class="text-[#070191]"
        v-html="require('@/assets/images/icones/heroicon/edit.svg?raw')"
      /> -->
    </div>

    <!-- <Modal
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
      </Modal> -->
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [String, Number], default: null },
    medias: {
      type: Array,
      default: () => { return [] }
    },
    conversion: {
      type: String,
      default: 'formPreview'
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    },
    selectedMediaSrcset () {
      return this.value?.urls[this.conversion]
    }
  }
}
</script>
