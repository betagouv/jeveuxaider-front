<template>
  <div>
    <div
      v-for="(i, index) in limit"
      :key="index"
      class="relative inline-flex flex-col mb-auto group cursor-pointer w-full"
      @click.prevent="openModal = index"
    >
      <template v-if="defaults[index]">
        <img
          :src="getSrc(defaults[index])"
          :srcset="getSrcset(defaults[index])"
          :sizes="previewSizes"
          class="w-full h-auto shadow-xl"
        />
        <div
          class="absolute z-10 inset-0"
          style="background: linear-gradient(141deg, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.7) 120%)"
        />
      </template>

      <slot v-else name="empty">
        <div
          class="w-full h-full min-h-[120px] cursor-pointer border-dashed border-2 transition hover:border-jva-blue-500 flex items-center justify-center"
        >
          <div class="text-xs text-center text-jva-blue-500">Selectionnez<br />un visuel</div>
        </div>
      </slot>

      <div
        v-if="!hidePencil"
        class="absolute z-20 flex justify-center items-center w-8 h-8 text-[#070191] bg-white rounded-full opacity-75 group-hover:opacity-100 pointer-events-none transition"
        style="right: 12px; bottom: 12px"
      >
        <RiPencilLine class="text-[#070191] w-4" />
      </div>
      <ClientOnly>
        <Teleport to="#teleport-body-end">
          <BaseModal
            :is-open="openModal === index"
            title="Choisissez un visuel"
            @close="openModal = null"
          >
            <div class="space-y-8">
              <div v-for="group in mediasByGroups" :key="group.id">
                <div class="mb-3 text-gray-600 uppercase text-xs">
                  {{ group.label }}
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <img
                    v-for="media in group.medias"
                    :key="media.id"
                    :srcset="media.urls[previewConversion]"
                    :alt="media.name"
                    class="cursor-pointer transition ring-offset-4 hover:opacity-50"
                    :class="[
                      {
                        '!opacity-100 ring-2 ring-jva-blue-500':
                          defaults[index] && defaults[index].id == media.id,
                      },
                      {
                        'opacity-25': defaults[index] && defaults[index].id != media.id,
                      },
                    ]"
                    @click.stop="onNewSelection(media, index)"
                  />
                </div>
              </div>
            </div>
          </BaseModal>
        </Teleport>
      </ClientOnly>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    medias: {
      type: Array,
      required: true,
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
    hidePencil: { type: Boolean, default: false },
  },
  data() {
    return {
      openModal: null,
    }
  },
  computed: {
    mediasByGroups() {
      const groups = []
      this.$labels.domaines.forEach((domaine) => {
        groups.push({
          id: `domaine_${domaine.key}`,
          label: `Parmi le domaine ${domaine.label}`,
          medias: [],
          weight: 2,
        })
      })

      this.medias.forEach((media) => {
        switch (media.model_type) {
          case 'App\\Models\\Domaine':
            groups.find((group) => group.id == `domaine_${media.model_id}`)?.medias.push(media)
            break
          case 'App\\Models\\Reseau': {
            const group = groups.find((group) => group.id == `reseau__${media.model.id}`)
            if (!group) {
              groups.push({
                id: `reseau__${media.model.id}`,
                label: `Parmi le réseau ${media.model.name}`,
                medias: [],
                weight: 1,
              })
            }
            groups.find((group) => group.id == `reseau__${media.model.id}`).medias.push(media)
            break
          }

          default:
            break
        }
      })
      return groups.filter((group) => group.medias.length).sort((a, b) => a.weight - b.weight)
    },
  },
  methods: {
    onNewSelection(media, index) {
      this.$emit('change', { media, index })
    },
    getSrcset(item) {
      return item.urls?.[this.previewConversion]
    },
    getSrc(item) {
      return item.urls?.original
    },
  },
})
</script>
