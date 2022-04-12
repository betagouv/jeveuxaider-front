<template>
  <Drawer :is-open="Boolean(ressourceId)" @close="$emit('close')">
    <AlertDialog
      v-if="ressource"
      theme="danger"
      title="Supprimer la ressource"
      :text="`Vous êtes sur le point de supprimer la ressource ${ressource.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <Heading v-if="ressource" :level="3" class="text-jva-blue-500">
        {{ ressource.title }}
      </Heading>
    </template>
    <template v-if="ressource">
      <OnlineIndicator :published="ressource.is_published" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/ressources/${ressource.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
        <Button variant="white" size="sm" icon="TrashIcon" @click.native="() => showAlert = true" />
      </div>
      <div class="border-t -mx-6 my-6" />
      <div class="text-jva-blue-500 flex items-center text-sm font-bold cursor-pointer hover:text-jva-blue-400" @click="handleDownload">
        <DownloadIcon class="h-4 w-4 mr-4" /> Accéder à la ressource
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :ressource="ressource" />
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/ressource/BoxInformations'
import OnlineIndicator from '@/components/custom/OnlineIndicator'

export default {
  components: {
    BoxInformations,
    OnlineIndicator
  },
  props: {
    ressourceId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      ressource: null,
      showAlert: false
    }
  },
  async fetch () {
    if (!this.ressourceId) {
      return null
    }
    const { data: ressource } = await this.$axios.get(`/documents/${this.ressourceId}`)
    this.ressource = ressource
    this.$emit('loaded', ressource)
  },
  watch: {
    ressourceId: '$fetch'
  },
  methods: {
    handleDownload () {
      if (this.ressource.type === 'file') {
        if (this.ressource.file.urls) {
          window.open(this.ressource.file.urls.original, '_blank').focus()
        }
      }
      if (this.ressource.type === 'link') {
        window.open(this.ressource.link, '_blank').focus()
      }
    },
    async handleConfirmDelete () {
      await this.$axios.delete(`/documents/${this.ressourceId}/delete`).then((res) => {
        this.showAlert = false
        this.$emit('close')
        this.$emit('refetch')
      }).catch(() => {})
    }
  }
}
</script>
