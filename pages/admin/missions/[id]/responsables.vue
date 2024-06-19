<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Qui gère cette mission ?</h2>
      <CustomTips class="mb-10">
        <p>
          Le responsable de la mission est la personne qui sera en contact avec les bénévoles et qui
          sera chargé de les accompagner dans leur intégration dans la structure.
        </p>
        <p class="mt-4">
          Vous pouvez ajouter un nouveau membre à votre équipe pour vous répartir la gestion de la
          mission.
        </p>
      </CustomTips>
      <div class="grid grid-cols-1 gap-8">
        <div class="flex justify-between items-center border-b py-4">
          <div class="font-bold text-xl">Responsables</div>
          <DsfrButton
            :disabled="
              form.responsables.length === $stores.formMission.mission.structure.members.length
            "
            size="sm"
            type="secondary"
            @click="showModalAddResponsable = true"
            >Ajouter un responsable</DsfrButton
          >
        </div>
        <template v-if="form.responsables.length === 0">
          <div class="text-center text-gray-500">Aucun responsable</div>
        </template>
        <template v-else>
          <DsfrFormControl html-for="responsables" :error="errors.responsables">
            <div class="space-y-4">
              <div
                class="flex justify-between items-center"
                v-for="responsable in form.responsables"
                :key="responsable.id"
              >
                <div class="flex">
                  <BaseAvatar
                    :img-srcset="responsable.avatar ? responsable.avatar.urls.thumbMedium : null"
                    :img-src="responsable.avatar ? responsable.avatar.urls.original : null"
                    :initials="responsable.short_name"
                    size="sm"
                    class="mr-4"
                  />
                  <div>
                    <div class="first-letter:uppercase">
                      {{ responsable.full_name }}
                    </div>
                    <div class="text-sm text-gray-500 font-medium">
                      {{ responsable.email }}
                    </div>
                  </div>
                </div>
                <DsfrButton
                  icon-only
                  size="xs"
                  type="tertiary"
                  icon="RiDeleteBinLine"
                  icon-class="text-[#CE0500]"
                  @click="onRemovedResponsable(responsable)"
                />
              </div>
            </div>
          </DsfrFormControl>
        </template>
      </div>
      <ModalFormMissionAddResponsable
        v-if="showModalAddResponsable"
        :is-open="showModalAddResponsable"
        :responsables="form.responsables"
        @cancel="showModalAddResponsable = false"
        @submit="onAddResponsableSubmit"
      />
    </div>
    <template #footer>
      <DsfrButton :loading="loading" @click="onValidateClick">{{
        $stores.formMission.isDraft ? 'Continuer' : 'Sauvegarder'
      }}</DsfrButton>
    </template>
  </FormMissionWrapper>
</template>

<script>
import FormMissionWrapper from '@/components/form/FormMissionWrapper'
import FormErrors from '@/mixins/form/errors'
import { string, object, array } from 'yup'
import RiCheckboxCircleFill from 'vue-remix-icons/icons/ri-checkbox-circle-fill.vue'
import ModalFormMissionAddResponsable from '@/components/modal/ModalFormMissionAddResponsable'
import FormMission from '@/mixins/form/mission'

export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'form-mission',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors, FormMission],
  components: {
    FormMissionWrapper,
    RiCheckboxCircleFill,
    ModalFormMissionAddResponsable,
  },
  mounted() {
    if (this.form.responsables.length === 0) {
      this.addDefaultResponsable()
    }
  },
  data() {
    return {
      loading: false,
      showModalAddResponsable: false,
      formSchema: object({
        responsables: array()
          .min(1, 'Vous devez ajouter au moins un responsable')
          .max(3, 'Vous ne pouvez pas ajouter plus de 3 responsables')
          .required('Un responsable est requis'),
      }),
    }
  },
  computed: {},
  methods: {
    addDefaultResponsable() {
      const currentMemberUser = this.$stores.formMission.mission.structure.members.filter(
        (member) => member.profile.id === this.$stores.auth.profile.id
      )
      if (currentMemberUser.length === 0) {
        this.form.responsables = [this.$stores.formMission.mission.structure.members[0]?.profile]
      } else {
        this.form.responsables = [currentMemberUser[0].profile]
      }
    },
    onAddResponsableSubmit(responsable) {
      // this.form.responsables.push(responsable) // bug reactivity
      this.form.responsables = [...this.form.responsables, responsable]
    },
    onRemovedResponsable(responsable) {
      this.form.responsables = this.form.responsables.filter((r) => r.id !== responsable.id)
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
              this.$stores.formMission.updateFields(mission, ['responsables'])

              if (this.$stores.formMission.isDraft) {
                this.$stores.formMission.showPublishModal = true
              } else {
                this.$toast.success('Mission modifiée avec succès')
              }
              //this.$toast.success('Mission modifiée avec succès')

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
