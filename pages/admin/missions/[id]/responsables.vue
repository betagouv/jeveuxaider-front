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
      <div class="grid grid-cols-1 gap-8">
        <div
          v-for="responsable in responsables"
          :key="responsable.id"
          class="relative"
          :class="[
            'relative group shadow-lg p-6  border-2 cursor-pointer hover:border-[#8585F6]',
            responsable.profile.id === form.responsable_id
              ? 'border-[#8585F6] bg-[#F5F5FE]'
              : 'border-transparent bg-white',
          ]"
          @click="onResponsableClick(responsable)"
        >
          <div
            v-if="responsable.profile.id === form.responsable_id"
            class="absolute top-3 right-3 bg-white rounded-full"
          >
            <RiCheckboxCircleFill
              class="h-6 text-jva-blue-500 fill-current group-hover:text-jva-blue-500"
            />
          </div>

          <div class="flex items-center">
            <BaseAvatar
              :img-srcset="
                responsable.profile.avatar ? responsable.profile.avatar.urls.thumbMedium : null
              "
              :img-src="
                responsable.profile.avatar ? responsable.profile.avatar.urls.original : null
              "
              :initials="responsable.profile.short_name"
              size="sm"
              class="mr-4"
            />
            <div>
              <div class="truncate font-bold">{{ responsable.profile.full_name }}</div>
              <div class="truncate text-sm">{{ responsable.profile.email }}</div>
            </div>
          </div>
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
import FormErrors from '@/mixins/form/errors'
import { string, object } from 'yup'
import RiCheckboxCircleFill from 'vue-remix-icons/icons/ri-checkbox-circle-fill.vue'

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
    RiCheckboxCircleFill,
  },
  mounted() {
    this.form = _cloneDeep(this.$stores.formMission.mission)
    this.responsables = this.$stores.formMission.mission.structure.members
    // console.log('mounted', this.form.responsable.id)
    // this.responsables.push(this.form.responsable)
  },
  data() {
    return {
      loading: false,
      form: null,
      responsables: [],
      formSchema: object({
        name: string().required('Le titre est requis'),
      }),
    }
  },
  computed: {},
  methods: {
    onResponsableClick(responsable) {
      this.form.responsable_id = responsable.profile.id
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
              this.$stores.formMission.updateFields(mission, ['responsable', 'responsable_id'])
              this.$toast.success('Mission modifiée avec succès')
              //this.$router.push(`/admin/missions/${mission.id}`)
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
