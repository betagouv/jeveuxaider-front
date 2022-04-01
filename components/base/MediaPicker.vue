<template>
  <div>
    <div
      v-for="(i, index) in limit"
      :key="index"
      class="relative inline-flex flex-col mb-auto group rounded-lg cursor-pointer"
      @click.prevent="openModal = index"
    >
      <template v-if="defaults[index]">
        <img
          :src="getSrc(defaults[index])"
          :srcset="getSrcset(defaults[index])"
          :sizes="previewSizes"
          class="w-full h-auto rounded-lg shadow-xl"
        >
        <div
          class="absolute z-10 inset-0 rounded-lg"
          style="background: linear-gradient(141deg, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.7) 120%)"
        />
      </template>

      <div
        v-else
        class="w-full h-full min-h-[120px] rounded-lg cursor-pointer border-dashed border-2 transition hover:border-jva-blue-500 flex items-center justify-center"
      >
        <div class="text-xs text-center text-jva-blue-500">
          Selectionnez<br>un visuel
        </div>
      </div>

      <div
        class="absolute z-20 flex justify-center items-center w-8 h-8 text-[#070191] bg-white rounded-full opacity-75 group-hover:opacity-100 pointer-events-none transition"
        style="right: 12px; bottom: 12px"
      >
        <PencilIcon class="text-[#070191] w-4" />
      </div>

      <portal to="body-end">
        <Modal
          :is-open="openModal === index"
          title="Choisissez un visuel"
          @close="openModal = null"
        >
          <div class="grid sm:grid-cols-2 gap-4">
            <img
              v-for="media in medias"
              :key="media.id"
              :srcset="media.urls[previewConversion]"
              :alt="media.name"
              class="rounded-lg cursor-pointer transition ring-offset-4 hover:opacity-50"
              :class="[
                {'!opacity-100 ring-2 ring-jva-blue-500': defaults[index] && defaults[index].id == media.id},
                {'opacity-25': defaults[index] && defaults[index].id != media.id}
              ]"
              @click.stop="onNewSelection(media, index)"
            >
          </div>
        </Modal>
      </portal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    medias: {
      type: Array,
      required: true
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
      openModal: null
    }
  },
  computed: {
    mediasByGroups () {
      const groups = [
        {
          id: 'reseau',
          label: 'parmi ceux mon réseau'
        }
      ]

      this.$labels.domaines.forEach((domaine) => {
        groups.push({
          id: `domaine_${domaine.key}`,
          label: `parmi le domaine ${domaine.label}`
        })
      })

      return groups

      // const mediasGrouped = [
      //   {
      //     id: 'domaine_1'
      //   }
      // ]
      // this.medias.forEach((media) => {
      //   switch (media.model_type) {
      //     case 'App\\Models\\Domaine':
      //       mediasGrouped
      //       break
      //     default:
      //       break
      //   }
      // })
      // return mediasGrouped
    }
  },
  methods: {
    onNewSelection (media, index) {
      this.$emit('change', { media, index })
    },
    getSrcset (item) {
      return item.urls?.[this.previewConversion]
    },
    getSrc (item) {
      return item.urls?.original
    }
  }
}
</script>
