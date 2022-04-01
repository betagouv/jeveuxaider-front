<template>
  <MediaPicker
    :medias="medias"
    :defaults="defaults"
    :limit="limit"
    :preview-conversion="previewConversion"
    :preview-sizes="previewSizes"
    @change="$emit('change', $event)"
  />
</template>

<script>
export default {
  props: {
    reseauIds: {
      type: Array,
      default: null
    },
    domaineIds: {
      type: Array,
      default: () => []
    },
    defaults: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 1
    },
    previewConversion: { type: String, default: 'formPreview' },
    previewSizes: { type: String, default: undefined }
  },
  data () {
    return {
      openModal: null,
      mediasFromDomaines: [],
      mediasFromReseau: []
    }
  },
  computed: {
    medias () {
      return [...this.mediasFromReseau, ...this.mediasFromDomaines]
    }
  },
  watch: {
    domaineIds: {
      immediate: false,
      async handler () {
        await this.fetchMediasFromDomaines()
      }
    }
  },
  created () {
    this.fetchMedias()
  },
  methods: {
    fetchMedias () {
      Promise.all([
        this.reseauIds ? this.fetchMediasFromReseau() : null,
        this.fetchMediasFromDomaines()
      ])
    },
    async fetchMediasFromReseau () {
      const { data: medias } = await this.$axios.get('/medias', {
        params: {
          'filter[collection_name]': 'reseau__illustrations_antennes',
          'filter[model_id]': this.reseauIds,
          pagination: 99
        }
      })
      this.mediasFromReseau = medias.data
    },
    async fetchMediasFromDomaines () {
      const { data: medias } = await this.$axios.get('/medias', {
        params: {
          'filter[collection_name]': 'domaine__illustrations_organisation',
          'filter[model_id]': this.domaineIds.join(','),
          pagination: 99
        }
      })
      this.mediasFromDomaines = medias.data
    },
    onNewSelection (media, index) {
      this.$emit('change', { media, index })
    }
  }
}
</script>
