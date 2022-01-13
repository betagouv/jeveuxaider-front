<template>
  <div>
    <div
      v-show="multiple || !files.length"
      ref="dropZone"
      class="max-w-lg w-full flex justify-center px-6 pt-5 pb-6 border-2  border-dashed rounded-lg hover:border-jva-blue-500 focus:border-jva-blue-500 cursor-pointer group transition"
      :class="[
        { 'border-jva-blue-500': dragging },
        { 'border-gray-300': !dragging }
      ]"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="onDrop"
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

    <ul v-if="files" role="list" class="divide-y divide-gray-200">
      <li
        v-for="(file, i) in files"
        :key="i"
        class="py-3 flex justify-between items-center bg-gray-50 rounded-lg"
      >
        <p class="text-sm font-medium text-gray-900 truncate">
          {{ file.name }}
        </p>

        <Button icon="TrashIcon" class="ml-2" @click.native.prevent.stop="removeFile(i)">
          Retirer
        </Button>
      </li>
    </ul>
  </div>
</template>

<script>
const mime = require('mime-types')

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
      errors: [],
      dragging: false
    }
  },
  computed: {
    mimeTypes () {
      const mimes = []
      const extensions = this.extensions.split(',')
      extensions.forEach(extension => mimes.push(mime.lookup(extension)))
      return mimes
    }
  },
  methods: {
    onChange () {
      this.addFiles(this.$refs.inputFile.files)
    },
    onDrop ($event) {
      this.addFiles($event.dataTransfer.files)
      this.dragging = false
    },
    addFiles (files) {
      if (this.validateFiles(files)) {
        const dt = new DataTransfer()
        files.forEach(file => dt.items.add(file))
        if (this.multiple) {
          this.files.forEach(file => dt.items.add(file))
        }
        this.$refs.inputFile.files = dt.files
        this.files = dt.files
        this.$emit('change', this.files)
      }
    },
    removeFile (index) {
      const dt = new DataTransfer()
      const input = this.$refs.inputFile
      const { files } = input
      files.forEach((file, i) => {
        if (index !== i) {
          dt.items.add(file)
        }
      })
      input.files = dt.files
      this.files = dt.files
      this.$emit('change', this.files)
    },
    validateFiles (files) {
      this.errors = []
      this.validateNbFiles(files)
      files.forEach((file) => {
        this.validateSize(file)
        this.validateExtension(file)
      })

      if (this.errors.length) {
        this.$refs.inputFile.value = null
        this.$toast.error(this.errors.join('\n'))
        return false
      }
      return true
    },
    validateNbFiles (files) {
      if (!this.multiple && files.length > 1) {
        this.errors.push('Un seul fichier autorisé.')
      }
    },
    validateSize (file) {
      if (this.maxSize && file.size > this.maxSize) {
        this.errors.push(
          `La taille ne doit pas dépasser ${this.$options.filters.formatNumber(this.maxSize, '0 b')}.`
        )
      }
    },
    validateExtension (file) {
      if (!this.mimeTypes.includes(file.type)) {
        this.errors.push(
          `Seuls les fichiers ayant les extensions suivantes sont autorisés : ${this.extensions}.`
        )
      }
    },
    onClick () {
      this.$refs.inputFile.click()
    }
  }
}
</script>
