<template>
  <div>
    <Upload extensions=".jpg, .png, .webp" @change="onUploadChange" />

    <div class="bg-yellow-100 p-4 text-sm rounded-lg">
      <button @click.prevent="showModal = true">
        Show modal
      </button>

      <Modal
        v-if="showModal"
        title="Mon titre Mon titre Mon titre Mon titre Mon titre Mon titre"
        @close="showModal = false"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat fringilla porta. Phasellus ligula mauris, facilisis pulvinar egestas sit amet, egestas et velit. Vivamus accumsan, risus vel interdum finibus, libero justo hendrerit sem, quis viverra nisi magna eu neque. Donec faucibus sapien auctor lobortis ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Nullam tempus, odio vel finibus condimentum, tellus neque egestas leo, in ultrices elit metus non nibh. Sed at imperdiet velit. Nullam eget dapibus turpis, ac aliquam massa. Morbi fermentum nisi quis orci euismod posuere. Aenean eget malesuada neque. Aenean vehicula libero posuere mi ultrices semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sit amet mauris neque.
        </p>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    onUploadChange (files) {
      if (files[0]) {
        this.$emit('change', files[0])
      } else {
        this.$emit('delete')
      }
    }
  }
}
</script>
