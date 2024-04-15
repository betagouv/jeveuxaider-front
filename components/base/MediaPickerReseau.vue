<template>
  <BaseMediaPicker
    :medias="medias"
    :defaults="defaults"
    :limit="limit"
    :preview-conversion="previewConversion"
    :preview-sizes="previewSizes"
    @change="$emit('change', $event)"
  />
</template>

<script>
export default defineNuxtComponent({
  props: {
    reseaux: {
      type: Array,
      required: true,
      validator: (value) => value.length,
    },
    domaineIds: {
      type: Array,
      default: () => [],
    },
    defaults: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 1,
    },
    previewConversion: { type: String, default: 'formPreview' },
    previewSizes: { type: String, default: undefined },
  },
  data() {
    return {
      openModal: null,
      mediasFromDomaines: [],
      mediasFromReseau: [],
    }
  },
  computed: {
    medias() {
      return [...this.mediasFromReseau, ...this.mediasFromDomaines]
    },
  },
  watch: {
    domaineIds: {
      immediate: false,
      async handler() {
        await this.fetchMediasFromDomaines()
      },
    },
  },
  created() {
    this.fetchMedias()
  },
  methods: {
    fetchMedias() {
      Promise.all([this.fetchMediasFromReseau(), this.fetchMediasFromDomaines()])
    },
    async fetchMediasFromReseau() {
      if (!this.reseaux.length) {
        return
      }
      const medias = await apiFetch('/medias', {
        params: {
          'filter[collection_name]': 'reseau__illustrations_antennes',
          'filter[model_id]': this.reseaux.map((reseau) => reseau.id).join(','),
          pagination: -1,
        },
      })
      this.mediasFromReseau = medias.data
    },
    async fetchMediasFromDomaines() {
      const medias = await apiFetch('/medias', {
        params: {
          'filter[collection_name]': 'domaine__illustrations_organisation',
          'filter[model_id]': this.domaineIds.join(','),
          pagination: -1,
        },
      })
      this.mediasFromDomaines = medias.data
    },
    onNewSelection(media, index) {
      this.$emit('change', { media, index })
    },
  },
})
</script>
