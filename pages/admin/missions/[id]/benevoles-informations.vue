<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[22px] lg:text-[28px] font-bold leading-9 mb-6 lg:mb-10">
        Quels bénévoles recherchez-vous ?
      </h2>
      <CustomTips class="mb-6 lg:mb-10">
        En précisant le type de profils recherchés, vous augmentez vos chances de trouver des
        bénévoles correspondant à vos besoins.
      </CustomTips>
      <div class="space-y-10">
        <DsfrFormControl
          label="Pré-requis pour réaliser la mission (3 max.)"
          html-for="prerequisites"
          :error="errors.prerequisites"
          info="Les bénévoles devront cocher ces pré-requis pour proposer leur aide"
        >
          <div v-if="form.prerequisites" class="space-y-2">
            <DsfrInput
              v-for="n in 3"
              :key="n"
              v-model="form.prerequisites[n - 1]"
              name="prerequisites"
              maxlength="100"
              :placeholder="placeholders[n - 1] || '…'"
            />
          </div>
        </DsfrFormControl>
        <DsfrFormControl label="Compétences recherchées (3 max.)" html-for="algolia-search">
          <AlgoliaInputAutocomplete
            variant="dsfr"
            index="termsIndex"
            placeholder="Rechercher une compétence..."
            :search-parameters="{
              facetFilters: [['vocabulary_name:Skills']],
              hitsPerPage: 6,
            }"
            @selected="onSelectedSkill"
          />
          <div>
            <div v-if="form.skills.length" class="mt-6">
              <div class="flex flex-wrap gap-2">
                <DsfrTag
                  v-for="item in form.skills"
                  :key="item.id"
                  :tag="item"
                  context="deletable"
                  size="md"
                  @delete="onDeletedSkill(item)"
                >
                  {{ item.name }}
                </DsfrTag>
              </div>
            </div>
          </div>
        </DsfrFormControl>

        <div class="grid grid-cols-1 gap-8 pt-8">
          <DsfrFormControl html-for="publics_volontaires" :error="errors.publics_volontaires">
            <BaseToggle
              :model-value="isOpenMinor"
              label="La mission est ouverte aux mineurs (à partir de 16 ans)"
              @checked="onIsOpenMinorChecked"
              @unchecked="onIsOpenMinorUnchecked"
            />
          </DsfrFormControl>
          <hr />
          <DsfrFormControl
            html-for="is_snu_mig_compatible"
            info="Votre mission sera également visible sur la plateforme www.snu.gouv.fr"
          >
            <BaseToggle
              v-model="form.is_snu_mig_compatible"
              label="Proposer cette mission aux jeunes volontaires du <strong>Service National Universel</strong> (de 15 à 17 ans)"
              @checked="onSNUChecked"
            >
              <template #right>
                <img
                  src="@/assets/images/snu-logo-2.png"
                  alt="SNU"
                  title="SNU"
                  class="h-10"
                  data-not-lazy
                />
              </template>
            </BaseToggle>
            <DsfrFormControl
              v-if="form.is_snu_mig_compatible"
              class="mt-8"
              label="Nombre de volontaires du SNU acceptés"
              html-for="snu_mig_places"
              required
              :error="errors.snu_mig_places"
            >
              <DsfrInput
                v-model="form.snu_mig_places"
                name="snu_mig_places"
                type="number"
                min="1"
                suffix="volontaires"
              />
            </DsfrFormControl>
          </DsfrFormControl>
          <hr />
          <DsfrFormControl
            html-for="is_motivation_required"
            info="Nous vous recommandons de cocher cette option si vous cherchez des bénévoles avec des compétences particulières ou qui doivent s’engager sur le long terme"
          >
            <BaseToggle
              v-model="form.is_motivation_required"
              label="Rendre obligatoire la rédaction d‘un <strong>message personnel de motivation</strong> lors de la participation (100 caractères minimum)"
              description=""
            />
          </DsfrFormControl>
        </div>
      </div>
    </div>
    <template #footer>
      <DsfrButton :loading="loading" @click="onValidateClick">
        {{ $stores.formMission.isDraft ? 'Enregistrer et continuer' : 'Enregistrer' }}</DsfrButton
      >
    </template>

    <BaseAlertDialog
      :is-open="showSNUModal"
      title="Point de vigilance"
      button-label="Je confirme"
      cancel-label="Je ne propose pas ma mission pour le SNU"
      icon="RiErrorWarningLine"
      @cancel="handleSNUCancel"
      @confirm="handleSNUConfirm"
    >
      <p>
        Avant de proposer votre mission sur la plateforme du Service National Universel (SNU), merci
        de vous assurer que :
      </p>
      <ul>
        <li>- Votre mission est adaptée pour l’accueil de volontaires de 15 à 17 ans</li>
        <li>- Un tuteur sera présent durant la mission pour accompagner les volontaires du SNU</li>
      </ul>
    </BaseAlertDialog>
  </FormMissionWrapper>
</template>

<script>
import FormMissionWrapper from '@/components/form/FormMissionWrapper'
import FormErrors from '@/mixins/form/errors'
import { number, object } from 'yup'
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
  },
  data() {
    return {
      loading: false,
      formSchema: object({
        snu_mig_places: number()
          .nullable()
          .when(['is_snu_mig_compatible'], {
            is: (value) => value == true,
            then: (schema) =>
              schema.required('Précisez le nombre de places pour les volontaires du SNU'),
          }),
      }),
      placeholders: [
        'ex : Parler anglais couramment',
        'ex : Avoir le permis de conduire',
        'ex : Avoir plus de 18 ans',
      ],
      showSNUModal: false,
    }
  },
  computed: {
    isOpenMinor() {
      return this.form.publics_volontaires?.includes('Mineurs')
    },
  },
  methods: {
    onIsOpenMinorChecked() {
      if (!this.form.publics_volontaires) {
        this.form.publics_volontaires = ['Mineurs']
      } else if (!this.form.publics_volontaires.includes('Mineurs')) {
        this.form.publics_volontaires.push('Mineurs')
      }
    },
    onIsOpenMinorUnchecked() {
      if (this.form.publics_volontaires.includes('Mineurs')) {
        this.form.publics_volontaires.pop('Mineurs')
      }
    },
    onSNUChecked() {
      this.showSNUModal = true
    },
    handleSNUCancel() {
      this.form.is_snu_mig_compatible = false
      this.form.snu_mig_places = null
      this.showSNUModal = false
    },
    handleSNUConfirm() {
      this.showSNUModal = false
      if (!this.form.publics_volontaires) {
        this.form.publics_volontaires = ['Mineurs']
      } else if (!this.form.publics_volontaires.includes('Mineurs')) {
        this.form.publics_volontaires.push('Mineurs')
      }
    },
    onSelectedSkill(item) {
      this.form.skills = [...this.form.skills, item]
    },
    onDeletedSkill(item) {
      this.form.skills = this.form.skills.filter((skill) => skill.id !== item.id)
    },
    async onValidateClick() {
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.form.prerequisites = this.form.prerequisites.filter((item) => item)

          await apiFetch(`/missions/${this.form.id}/benevoles-informations`, {
            method: 'PUT',
            body: this.form,
          })
            .then(async (mission) => {
              console.log(mission)
              this.$stores.formMission.updateFields(mission, [
                'is_snu_mig_compatible',
                'publics_volontaires',
                'snu_mig_places',
                'is_motivation_required',
                'prerequisites',
                'skills',
              ])

              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/responsables`)
              } else {
                this.$toast.success('Mission modifiée avec succès')
              }
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
