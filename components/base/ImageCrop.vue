<template>
  <div>
    <Upload v-if="!value.length" :default-value="value" extensions=".jpg, .png, .webp" @add="onUploadAdd" @delete="onUploadDelete" />

    <template v-else>
      <!-- Preview -->
      <div>
        <img class="rounded-lg shadow-xl" :srcset="previewSrcset" alt="Preview" :sizes="`${previewWidth}px`" :width="previewWidth">
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
        title="Mon titre Mon titre Mon titre Mon titre Mon titre Mon titre"
        @close="showModal = false"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat fringilla porta. Phasellus ligula mauris, facilisis pulvinar egestas sit amet, egestas et velit. Vivamus accumsan, risus vel interdum finibus, libero justo hendrerit sem, quis viverra nisi magna eu neque. Donec faucibus sapien auctor lobortis ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Nullam tempus, odio vel finibus condimentum, tellus neque egestas leo, in ultrices elit metus non nibh. Sed at imperdiet velit. Nullam eget dapibus turpis, ac aliquam massa. Morbi fermentum nisi quis orci euismod posuere. Aenean eget malesuada neque. Aenean vehicula libero posuere mi ultrices semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sit amet mauris neque.
        </p>
      </Modal>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    defaultValue: { type: Array, default: () => [] },
    previewWidth: { type: Number, default: 200 }
  },
  data () {
    return {
      showModal: false,
      value: this.defaultValue ?? [],
      previewSrcset: this.defaultValue[0]?.urls?.big
    }
  },
  methods: {
    onUploadAdd (files) {
      this.$emit('add', files)
      this.value = files
      this.previewSrcset = URL.createObjectURL(files[0])
    },
    onUploadDelete (file) {
      this.$emit('delete', file)
    },
    onDelete () {
      this.$emit('delete', this.value[0])
      this.value = []
    }
  }
}
</script>
