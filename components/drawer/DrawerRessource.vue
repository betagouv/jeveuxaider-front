<template>
  <BaseDrawer :is-open="Boolean(ressourceId)" @close="$emit('close')">
    <BaseAlertDialog
      v-if="ressource"
      theme="danger"
      title="Supprimer la ressource"
      :text="`Vous êtes sur le point de supprimer la ressource ${ressource.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <BaseHeading v-if="ressource" :level="3" class="text-jva-blue-500">
        {{ ressource.title }}
      </BaseHeading>
    </template>
    <template v-if="ressource">
      <OnlineIndicator :published="ressource.is_published" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/ressources/${ressource.id}/edit`" class="inline-flex">
          <BaseButton variant="white" size="sm" icon="RiPencilLine"> Modifier </BaseButton>
        </nuxt-link>
        <BaseButton
          variant="white"
          size="sm"
          icon="RiDeleteBinLine"
          @click.native="() => (showAlert = true)"
        />
      </div>
      <div class="border-t -mx-6 my-6" />
      <div
        class="group text-jva-blue-500 flex items-center text-sm font-bold cursor-pointer hover:text-jva-blue-400"
        @click="handleDownload"
      >
        <RiDownloadLine
          class="text-jva-blue-500 group-hover:text-jva-blue-400 h-4 w-4 mr-4 fill-current"
        />
        Accéder à la ressource
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :ressource="ressource" />
    </template>
  </BaseDrawer>
</template>

<script>
import BoxInformations from '@/components/section/ressource/BoxInformations.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'

export default defineNuxtComponent({
  components: {
    BoxInformations,
    OnlineIndicator,
  },
  props: {
    ressourceId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      ressource: null,
      showAlert: false,
    }
  },

  watch: {
    ressourceId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.ressourceId) {
        return null
      }
      const ressource = await apiFetch(`/documents/${this.ressourceId}`)
      this.ressource = ressource
      this.$emit('loaded', ressource)
    },
    handleDownload() {
      if (this.ressource.type === 'file') {
        if (this.ressource.file.urls) {
          window.open(this.ressource.file.urls.original, '_blank').focus()
        }
      }
      if (this.ressource.type === 'link') {
        window.open(this.ressource.link, '_blank').focus()
      }
    },
    async handleConfirmDelete() {
      await apiFetch(`/documents/${this.ressourceId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          this.showAlert = false
          this.$emit('close')
          this.$emit('refetch')
        })
        .catch(() => {})
    },
  },
})
</script>
