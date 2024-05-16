<template>
  <FormMissionEditWrapper>
    <div v-if="mission">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Choisissez un visuel</h2>
      {{ mission.domaine_id }}
      <img
        v-for="media in medias"
        :key="media.id"
        :srcset="media.urls['formPreview']"
        :alt="media.name"
        :class="['cursor-pointer transition ring-offset-4 hover:opacity-50']"
        @click.stop="onMediaClick(media)"
      />
    </div>
    <template #footer>
      <DsfrButton :loading="loading" @click="onValidateClick">Valider</DsfrButton>
    </template>
  </FormMissionEditWrapper>
</template>

<script>
import FormMissionEditWrapper from '@/components/form/FormMissionEditWrapper'
import FormErrors from '@/mixins/form/errors'
import { string, object } from 'yup'

export default defineNuxtComponent({
  async setup() {
    definePageMeta({
      layout: 'form-mission-edit',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors],
  components: {
    FormMissionEditWrapper,
  },
  data() {
    return {
      loading: false,
      medias: [],
      formSchema: object({
        name: string().required('Le titre est requis'),
      }),
    }
  },
  mounted() {
    this.fetchMediasByDomaine()
  },
  computed: {
    form() {
      return { ...this.$stores.formMission.mission }
    },
    mission() {
      return this.$stores.formMission.mission
    },
  },
  methods: {
    onMediaClick() {
      console.log('media clicked')
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
      // await this.formSchema
      //   .validate(this.form, { abortEarly: false })
      //   .then(async () => {
      //     await apiFetch(`/missions/${this.mission.id}/title`, {
      //       method: 'PUT',
      //       body: this.form,
      //     })
      //       .then(async (mission) => {
      //         console.log(mission)
      //         this.$stores.formMission.setMission(mission)
      //         this.$router.push(`/admin/missions/${mission.id}/visuel`)
      //       })
      //       .catch(() => {})
      //   })
      //   .catch((errors) => {
      //     this.setErrors(errors)
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })
    },
  },
})
</script>
