<template>
  <div>
    <div
      v-show="multiple || !files.length"
      ref="dropZone"
      class="w-full flex justify-center  border-2  border-dashed rounded-lg hover:border-jva-blue-500 focus:border-jva-blue-500 cursor-pointer group transition"
      :class="[
        { 'border-jva-blue-500': dragging },
        { 'border-gray-300': !dragging },
        { 'px-6 pt-5 pb-6': variant == 'default' },
        { 'px-3 pt-2 pb-3': variant == 'compact' },
      ]"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="onDrop"
      @click="onClick"
    >
      <div class="space-y-1 text-center">
        <DownloadIcon
          class="mx-auto  text-gray-300 group-hover:text-jva-blue-500 transition"
          :class="[{ 'h-12 w-12': variant == 'default' }, { 'h-8 w-8': variant == 'compact' }]"
        />

        <div class="text-sm text-gray-600">
          <label
            for="assetsFieldHandle"
            class="relative cursor-pointer rounded-md font-medium text-jva-blue-500 focus-within:outline-none"
            @click.stop
          >
            {{ cLabel }}

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

        <p v-if="extensions != '*' && variant != 'compact'" class="text-xs text-gray-500">
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
        class="py-3 flex items-center bg-gray-50 rounded-lg"
      >
        <p class="ml-2 text-sm font-medium text-gray-900 truncate mr-auto">
          {{ file.name }}
        </p>

        <div class="flex space-x-2 mr-2">
          <a v-if="file.urls" :href="file.urls.original" target="_blank" class="inline-flex ml-2">
            <Button icon="DownloadIcon">
              Télécharger
            </Button>
          </a>

          <Button icon="TrashIcon" variant="red" class="ml-2" @click.native.prevent.stop="deleteFile(i)" />
        </div>
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
    },
    defaultValue: {
      type: Array,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: 'default',
      validator: s => ['default', 'compact'].includes(s)
    }
  },
  data () {
    return {
      newFiles: [],
      existingFiles: this.defaultValue ?? [],
      errors: [],
      dragging: false
    }
  },
  computed: {
    cLabel () {
      return this.label ?? (this.multiple ? 'Sélectionner un ou plusieurs fichiers' : 'Sélectionner un fichier')
    },
    mimeTypes () {
      const mimes = []
      if (this.extensions != '*') {
        const extensions = this.extensions.split(',')
        extensions.forEach(extension => mimes.push(mime.lookup(extension)))
      }
      return mimes
    },
    files () {
      return [...this.newFiles, ...this.existingFiles].filter(Boolean)
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
    // The input need to have the correct files, hence the use of new dataTransfert instead of just an array.
    // Use case : add a file, then delete, then add the same file again.
    addFiles (files) {
      if (this.validateFiles(files)) {
        this.$emit('add', files)

        const dt = new DataTransfer()
        files.forEach(file => dt.items.add(file))
        if (this.multiple) {
          this.newFiles.forEach(file => dt.items.add(file))
        }
        this.$refs.inputFile.files = dt.files
        this.newFiles = dt.files
      }
    },
    deleteFile (index) {
      this.$emit('delete', this.files[index])

      if (this.files[index].id) {
        const existingFilesIndex = this.existingFiles.findIndex(
          file => file.id === this.files[index].id
        )
        this.existingFiles.splice(existingFilesIndex, 1)
      } else {
        const dt = new DataTransfer()
        const input = this.$refs.inputFile
        const { files } = input
        files.forEach((file, i) => {
          if (index !== i) {
            dt.items.add(file)
          }
        })
        input.files = dt.files
        this.newFiles = dt.files
      }
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
      if (this.extensions != '*' && !this.mimeTypes.includes(file.type)) {
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
