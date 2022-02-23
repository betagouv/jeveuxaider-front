<template>
  <div>
    <div v-for="(i, index) in limit" :key="index" class="relative inline-flex flex-col mb-auto group">
      <img
        v-if="values[index]"
        :srcset="values[index].urls.formPreview"
        class="w-full h-auto rounded-lg cursor-pointer shadow-xl transition"
        @click.prevent="openModal = index"
      >
      <div
        v-else
        class="w-full h-full min-h-[120px] rounded-lg cursor-pointer border-dashed border-2 transition hover:border-jva-blue-500 flex items-center justify-center"
        @click.prevent="openModal = index"
      >
        <div class="text-xs text-jva-blue-500">
          Selectionnez un visuel
        </div>
      </div>

      <div
        class="z-1 absolute flex justify-center items-center w-8 h-8 text-[#070191] bg-white rounded-full opacity-75 group-hover:opacity-100 pointer-events-none transition"
        style="right: 12px; bottom: 12px"
      >
        <PencilIcon class="text-[#070191] w-4" />
      </div>

      <Modal
        :is-open="openModal === index"
        title="Choisissez un visuel"
        @close="openModal = null"
      >
        <div class="grid sm:grid-cols-2 gap-4">
          <img
            v-for="media in mediasFromDomaine"
            :key="media.id"
            :srcset="media.urls.formPreview"
            :alt="media.name"
            class="rounded-lg cursor-pointer transition ring-offset-4 hover:opacity-50"
            :class="[
              {'!opacity-100 ring-2 ring-jva-blue-500': values[index] && values[index].id == media.id},
              {'opacity-25': values[index] && values[index].id != media.id}
            ]"
            @click.stop="onNewSelection(media, index)"
          >
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collection: {
      type: String,
      required: true
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
    }
  },
  data () {
    return {
      openModal: null,
      mediasFromDomaine: [],
      values: this.defaults
    }
  },
  watch: {
    domaineIds: {
      immediate: true,
      async handler () {
        await this.fetchMediasDomaine()
      }
    }
  },
  methods: {
    async fetchMediasDomaine () {
      const { data: medias } = await this.$axios.get('/medias', {
        params: {
          'filter[collection_name]': this.collection,
          'filter[model_id]': this.domaineIds.join(','),
          itemsPerPage: 99
        }
      })

      this.mediasFromDomaine = medias.data
    },
    onNewSelection (media, index) {
      console.log('onNewSelection', index)
      this.$emit('change', { media, index })
    }
  }
}
</script>
