<template>
  <FormMissionEditWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="mission">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Choisissez un visuel</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div v-for="media in medias" :key="media.id" class="relative">
          <div
            v-if="media.id === selectedMediaId"
            class="absolute top-3 right-3 bg-white rounded-full"
          >
            <RiCheckboxCircleFill
              class="h-6 text-jva-blue-500 fill-current group-hover:text-jva-blue-500"
            />
          </div>
          <img
            :srcset="media.urls['formPreview']"
            :alt="media.name"
            :class="[
              'object-contain cursor-pointer transition hover:opacity-100',
              { 'ring-4 ring-[#6A6AF4]': media.id === selectedMediaId },
              { 'opacity-30': media.id !== selectedMediaId },
            ]"
            @click.stop="onMediaClick(media)"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <DsfrButton :loading="loading" @click="onValidateClick">Sauvegarder</DsfrButton>
    </template>
  </FormMissionEditWrapper>
</template>

<script>
import FormMissionEditWrapper from '@/components/form/FormMissionEditWrapper'
import RiCheckboxCircleFill from 'vue-remix-icons/icons/ri-checkbox-circle-fill.vue'

export default defineNuxtComponent({
  async setup() {
    definePageMeta({
      layout: 'form-mission',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  components: {
    FormMissionEditWrapper,
    RiCheckboxCircleFill,
  },
  data() {
    return {
      loading: false,
      medias: [],
      selectedMediaId: null,
    }
  },
  mounted() {
    this.fetchMediasByDomaine()
    if (this.mission.illustrations.length > 0) {
      this.selectedMediaId = this.mission.illustrations[0].id
    }
  },
  computed: {
    mission() {
      return this.$stores.formMission.mission
    },
  },
  methods: {
    onMediaClick(media) {
      console.log('media clicked', media.id)
      this.selectedMediaId = media.id
    },
    async fetchMediasByDomaine() {
      const medias = await apiFetch('/medias', {
        params: {
          'filter[collection_name]': 'domaine__illustrations_mission',
          'filter[model_id]': this.mission.domaine_id,
          pagination: -1,
        },
      })

      this.medias = medias.data
    },
    async onValidateClick() {
      this.loading = true

      await apiFetch(`/missions/${this.mission.id}/visuel`, {
        method: 'PUT',
        body: { media_id: this.selectedMediaId },
      })
        .then(async (mission) => {
          console.log('response', mission)
          this.$stores.formMission.updateFields(mission, ['illustrations', 'picture'])
          this.$toast.success('Mission modifiée avec succès')

          this.$router.push(`/admin/missions/${mission.id}/informations`)
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
