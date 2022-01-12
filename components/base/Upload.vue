<template>
  <div>
    <div
      ref="dropZone"
      class="max-w-lg w-full flex justify-center px-6 pt-5 pb-6 border-2  border-dashed rounded-lg hover:border-jva-blue-500 focus:border-jva-blue-500 cursor-pointer group transition"
      :class="[
        { 'border-jva-blue-500': dragging },
        { 'border-gray-300': !dragging }
      ]"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop="onDrop"
      @click="onClick"
    >
      <div class="space-y-1 text-center">
        <DownloadIcon
          class="mx-auto h-12 w-12 text-gray-300 group-hover:text-jva-blue-500 transition"
        />

        <div class="text-sm text-gray-600">
          <label
            for="assetsFieldHandle"
            class="relative cursor-pointer rounded-md font-medium text-jva-blue-500 focus-within:outline-none"
            @click.stop
          >
            <span>Sélectionner un <span v-if="multiple"> ou plusieurs</span> fichier</span>

            <input
              id="assetsFieldHandle"
              ref="inputFile"
              type="file"
              :multiple="multiple"
              name="fields[assetsFieldHandle][]"
              class="sr-only"
              :accept="extensions"
              @change="onChange"
            >
          </label>
        </div>

        <p v-if="extensions != '*'" class="text-xs text-gray-500">
          Formats acceptés : {{ extensions }}
        </p>

        <p class="text-xs text-gray-500">
          Taille maximale : {{ maxSize | formatNumber('0 b') }}
        </p>
      </div>
    </div>

    <ul v-if="files.length" role="list" class="divide-y divide-gray-200">
      <li
        v-for="(file, i) in files"
        :key="i"
        class="py-3 flex justify-between items-center bg-gray-50 rounded-lg"
      >
        <p class="text-sm font-medium text-gray-900 truncate">
          {{ file.name }}
        </p>

        <Button icon="TrashIcon" class="ml-2" @click.native.prevent.stop="onRemove(i)">
          Retirer
        </Button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    extensions: {
      type: String,
      default: '*'
    },
    maxSize: {
      type: Number,
      default: 2000000 // 2 Mo
    }
  },
  data () {
    return {
      files: [],
      dragging: false
    }
  },
  methods: {
    onChange () {
      const files = this.$refs.inputFile.files
      if (this.validateFiles(files)) {
        this.files = files
        this.$emit('change', files)
      }
    },
    onDrop (event) {
      event.preventDefault()
      const files = event.dataTransfer.files
      if (this.validateFiles(files)) {
        this.$refs.inputFile.files = files
        this.files = files
        this.$emit('change', files)
      }
      this.dragging = false
    },
    validateFiles (files) {
      const errors = []

      Array.from(files).forEach((file) => {
        if (this.maxSize && file.size > this.maxSize) {
          errors.push(
            `La taille ne doit pas dépasser ${this.$options.filters.formatNumber(
              this.maxSize,
              '0 b'
            )}`
          )
        }
      })

      if (errors.length) {
        this.$refs.inputFile.value = null
        this.$toast.error(errors.join('\n'))
        return false
      }

      return true
    },
    onRemove (i) {
      this.files = Array.prototype.slice.call(this.files)
      this.files.splice(i, 1)
      this.removeFileFromFileList(i)
      this.$emit('change', this.files)
    },
    removeFileFromFileList (index) {
      const dt = new DataTransfer()
      const input = this.$refs.inputFile
      const { files } = input
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (index !== i) {
          dt.items.add(file)
        }
      }
      input.files = dt.files // Assign the updates list
    },
    onClick () {
      this.$refs.inputFile.click()
    }
  }
}
</script>
