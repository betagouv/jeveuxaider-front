<template>
  <div>
    <slot name="trigger" :onClick="onClick">
      <div
        v-show="multiple || !files.length"
        class="w-full flex justify-center border-2 border-dashed hover:border-jva-blue-500 focus:border-jva-blue-500 cursor-pointer group transition"
        :class="[
          { 'border-jva-blue-500': dragging },
          { 'px-6 pt-5 pb-6': variant == 'default' },
          { 'px-3 pt-2 pb-3': variant == 'compact' },
        ]"
        @dragover.prevent="dragging = true"
        @dragleave="dragging = false"
        @drop.prevent="onDrop"
        @click="onClick"
      >
        <div class="space-y-1 text-center">
          <RiDownload2Line
            :class="[
              'mx-auto text-gray-300 group-hover:text-jva-blue-500 transition fill-current',
              { 'h-10 w-10': variant == 'default' },
              { 'h-8 w-8': variant == 'compact' },
            ]"
          />

          <div class="text-sm text-gray-600">
            <label
              :for="`inputfile--${uuid}`"
              class="relative cursor-pointer font-medium text-jva-blue-500 label"
              @click.stop
            >
              {{ cLabel }}
            </label>
          </div>

          <p v-if="extensions != '*' && variant != 'compact'" class="text-xs text-gray-500">
            Formats acceptés : {{ extensions }}
          </p>

          <p class="text-xs text-gray-500">Taille maximale : {{ $numeral(maxSize, '0 b') }}</p>
        </div>
      </div>
    </slot>

    <input
      :id="`inputfile--${uuid}`"
      ref="inputFile"
      type="file"
      :multiple="multiple"
      class="sr-only"
      :accept="extensions"
      @change="onChange"
    />

    <ul v-if="showFiles && files" role="list" class="divide-y divide-gray-200">
      <li v-for="(file, i) in files" :key="i" class="py-3 flex items-center bg-gray-50">
        <p class="ml-2 text-sm font-medium text-gray-900 truncate mr-auto">
          {{ file.name }}
        </p>

        <div class="flex space-x-2 mr-2">
          <a v-if="file.urls" :href="file.urls.original" target="_blank" class="inline-flex ml-2">
            <BaseButton icon="RiDownloadLine"> Télécharger </BaseButton>
          </a>

          <BaseButton
            icon="RiDeleteBinLine"
            variant="red"
            class="ml-2"
            @click.native.prevent.stop="deleteFile(i)"
          />
        </div>
      </li>
    </ul>

    <BaseAlertDialog
      v-if="warning"
      :is-open="showAlert"
      icon="RiErrorWarningLine"
      :title="warningTitle"
      @confirm="
        () => {
          handleAdd(tmpFiles)
          showAlert = false
        }
      "
      @cancel="
        () => {
          tmpFiles = null
          showAlert = false
        }
      "
      >{{ warning }}</BaseAlertDialog
    >
  </div>
</template>

<script>
import * as mime from 'mime/lite'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  emits: ['add', 'delete'],
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    extensions: {
      type: String,
      default: '*',
    },
    maxSize: {
      type: Number,
      default: 2000000, // 2 Mo
    },
    defaultValue: {
      type: Array,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'default',
      validator: (s) => ['default', 'compact'].includes(s),
    },
    warning: {
      type: String,
      default: null,
    },
    warningTitle: {
      type: String,
      default: 'Ajouter un fichier',
    },
    showFiles: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      newFiles: [],
      existingFiles: this.defaultValue ?? [],
      errors: [],
      dragging: false,
      showAlert: false,
      uuid: uuidv4(),
    }
  },
  computed: {
    cLabel() {
      return (
        this.label ??
        (this.multiple ? 'Sélectionner un ou plusieurs fichiers' : 'Sélectionner un fichier')
      )
    },
    mimeTypes() {
      const mimes = []
      if (this.extensions != '*') {
        const extensions = this.extensions.split(',')
        extensions.forEach((extension) => mimes.push(mime.getType(extension)))
      }
      return mimes
    },
    files() {
      return [...this.newFiles, ...this.existingFiles].filter(Boolean)
    },
  },
  watch: {
    defaultValue(newVal) {
      this.existingFiles = newVal
      this.newFiles = []
    },
  },
  methods: {
    onChange() {
      this.onDropOrChange(this.$refs.inputFile.files)
    },
    onDrop($event) {
      this.onDropOrChange($event.dataTransfer.files)
    },
    onDropOrChange(files) {
      if (this.warning) {
        this.showAlert = true
        this.tmpFiles = files
      } else {
        this.handleAdd(files)
      }
    },
    handleAdd(files) {
      this.addFiles(files)
      this.dragging = false
    },
    // The input need to have the correct files, hence the use of new dataTransfert instead of just an array.
    // Use case : add a file, then delete, then add the same file again.
    addFiles(files) {
      if (this.validateFiles(files)) {
        Array.from(files).forEach((file) => {
          file.uuid = uuidv4()
        })

        this.$emit('add', files)

        const dt = new DataTransfer()
        Array.from(files).forEach((file) => dt.items.add(file))
        if (this.multiple) {
          this.newFiles.forEach((file) => dt.items.add(file))
        }
        this.$refs.inputFile.files = dt.files
        this.newFiles = dt.files
      }
    },
    deleteFile(index) {
      this.$emit('delete', this.files[index])

      if (this.files[index].id) {
        const existingFilesIndex = this.existingFiles.findIndex(
          (file) => file.id === this.files[index].id
        )
        this.existingFiles.splice(existingFilesIndex, 1)
      } else {
        const dt = new DataTransfer()
        const input = this.$refs.inputFile
        const { files } = input
        Array.from(files).forEach((file, i) => {
          if (index !== i) {
            dt.items.add(file)
          }
        })
        input.files = dt.files
        this.newFiles = dt.files
      }
    },
    validateFiles(files) {
      this.errors = []
      this.validateNbFiles(files)
      Array.from(files).forEach((file) => {
        this.validateSize(file)
        this.validateExtension(file)
      })

      if (this.errors.length) {
        const toast = useToast()
        toast.error(this.errors.join('\n'))
        this.$refs.inputFile.value = null
        return false
      }
      return true
    },
    validateNbFiles(files) {
      if (!this.multiple && files.length > 1) {
        this.errors.push('Un seul fichier autorisé.')
      }
    },
    validateSize(file) {
      if (this.maxSize && file.size > this.maxSize) {
        this.errors.push(`La taille ne doit pas dépasser ${this.$numeral(this.maxSize, '0 b')}.`)
      }
    },
    validateExtension(file) {
      if (this.extensions != '*' && !this.mimeTypes.includes(file.type)) {
        this.errors.push(
          `Seuls les fichiers ayant les extensions suivantes sont autorisés : ${this.extensions}.`
        )
      }
    },
    onClick() {
      this.$refs.inputFile.click()
    },
  },
})
</script>

<style lang="postcss" scoped>
.label:focus-within {
  outline-style: solid;
  outline-color: #0a76f6;
  outline-width: 2px;
  outline-offset: 2px;
}
</style>
