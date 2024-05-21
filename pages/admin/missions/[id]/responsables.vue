<template>
  <FormMissionEditWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Qui gère cette mission ?</h2>
      <CustomTips class="mb-10">
        Le responsable de la mission est la personne qui sera en contact avec les bénévoles et qui
        sera chargé de les accompagner dans leur intégration dans la structure.
      </CustomTips>
      <div>
        <div v-for="responsable in responsables" :key="responsable.id">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <BaseAvatar
                :img-srcset="responsable.avatar ? responsable.avatar.urls.thumbMedium : null"
                :img-src="responsable.avatar ? responsable.avatar.urls.original : null"
                :initials="responsable.short_name"
                size="sm"
                class="mr-4"
              />
              <div>
                <div class="truncate font-bold">{{ responsable.full_name }}</div>
                <div class="truncate text-sm">{{ responsable.email }}</div>
              </div>
            </div>
            <div>
              <DsfrButton type="secondary" size="sm" @click="onEditResponsable(responsable)"
                >Changer</DsfrButton
              >
            </div>
          </div>
        </div>
      </div>
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
  setup() {
    definePageMeta({
      layout: 'form-mission-edit',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors],
  components: {
    FormMissionEditWrapper,
  },
  mounted() {
    this.form = { ...this.$stores.formMission.mission }

    console.log('mounted', this.form.responsable.id)
    this.responsables.push(this.form.responsable)
  },
  data() {
    return {
      loading: false,
      form: null,
      showModalChangeResponsable: false,
      responsables: [],
      formSchema: object({
        name: string().required('Le titre est requis'),
      }),
    }
  },
  computed: {},
  methods: {
    onEditResponsable(responsable) {
      this.showModalChangeResponsable = true
    },
    async onValidateClick() {
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/missions/${this.form.id}/responsables`, {
            method: 'PUT',
            body: this.form,
          })
            .then(async (mission) => {
              console.log(mission)
              // this.$stores.formMission.setMission(mission)
              this.$stores.formMission.updateFields(mission, ['name'])

              this.$router.push(`/admin/missions/${mission.id}`)
            })
            .catch(() => {})
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
