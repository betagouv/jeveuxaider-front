<template>
  <div class="bg-white px-6 py-8 lg:p-10">
    <div class="grid grid-cols-1 gap-8 lg:gap-12">
      <div class="flex gap-10">
        <div class="hidden lg:block w-[80px]">
          <img src="/images/icons/calendar.svg" alt="" data-not-lazy class="w-full sticky top-20" />
        </div>
        <div class="flex-1">
          <DsfrHeading size="lg"> Ma disponibilité </DsfrHeading>
          <div class="text-[#666666] mt-4">
            Ces informations sont utilisées pour vous suggérer des missions en fonction de votre
            agenda.
          </div>
          <div class="mt-10 space-y-10">
            <div class="flex lg:space-x-10 items-center">
              <div>
                <BaseFormLabel html-for="commitment" required size="xl">
                  Combien de temps pourriez-vous allouer à des actions de bénévolat&nbsp;?
                </BaseFormLabel>
                <DsfrFormControl :error="errors.commitment" class="mt-4">
                  <DsfrTagsGroup
                    v-model="form.commitment"
                    name="commitment"
                    context="radio"
                    :options="$labels.commitment"
                    @updated="validate('commitment')"
                  />
                </DsfrFormControl>
              </div>
            </div>
            <div>
              <BaseFormLabel html-for="disponibilities" required size="xl">
                Cochez les créneaux pendant lesquels vous seriez <br class="hidden lg:inline" />
                disponible&nbsp;?
              </BaseFormLabel>
              <DsfrFormControl :error="errors.disponibilities" class="mt-4">
                <DsfrTagsGroup
                  v-model="form.disponibilities"
                  name="disponibilities"
                  :options="$labels.disponibilities"
                  @updated="validate('disponibilities')"
                />
              </DsfrFormControl>
            </div>
            <div>
              <BaseFormLabel html-for="type_missions" size="xl">
                Vous êtes plutôt mission sur place ou à distance&nbsp;?
              </BaseFormLabel>
              <DsfrFormControl
                html-for="type_missions"
                :error="errors.type_missions"
                class="mt-6 @container"
              >
                <DsfrRadioRichGroup
                  v-model="form.type_missions"
                  name="type_missions"
                  :options="$labels.profile_type_missions"
                  option-class="w-full @md:w-auto"
                />
              </DsfrFormControl>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div class="flex gap-10">
        <div class="hidden lg:block w-[80px]">
          <img src="/images/icons/culture.svg" alt="" data-not-lazy class="w-full" />
        </div>
        <div class="flex-1 max-w-full">
          <DsfrHeading size="lg">
            Quelles activités de bénévolat<br class="hidden sm:block" />
            vous intéressent ?
          </DsfrHeading>
          <template v-if="!form.activities || form.activities.length === 0">
            <div class="flex gap-2 lg:gap-3 mt-6">
              <button
                v-for="i in 3"
                :key="i"
                class="h-[42px] w-16 flex-none border border-dashed border-[#6A6AF4] rounded-[40px] flex items-center justify-center leading-none hover:scale-110 transition ease-out"
                @click="isModalActivitiesOpen = true"
              >
                <span class="-translate-y-px text-jva-blue-500">+</span>
              </button>
            </div>
          </template>
          <div v-else class="@container mt-6 flex flex-wrap gap-2 lg:gap-3">
            <CustomSelectedValue
              v-for="activity in [...form.activities].sort((a, b) => a.name.localeCompare(b.name))"
              :key="activity.id"
              @delete="onActivityDelete(activity)"
              class="w-full @md:w-auto"
            >
              {{ activity.name }}
            </CustomSelectedValue>
          </div>

          <DsfrLink class="text-jva-blue-500 mt-4" @click="isModalActivitiesOpen = true"
            >Ajouter des activités</DsfrLink
          >

          <ModalActivities
            :initial-activities="form.activities"
            :is-open="isModalActivitiesOpen"
            @cancel="isModalActivitiesOpen = false"
            @confirm="onModalActivitiesConfirm"
          />
        </div>
      </div>

      <transition name="fade">
        <div
          v-if="formIsDirty"
          :class="['sm:hidden fixed bottom-0 p-3 bg-white z-50 w-full left-0 right-0']"
          style="box-shadow: 0 25px 20px 30px rgb(0 0 0 / 25%)"
        >
          <DsfrButton
            size="lg"
            class="w-full"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit()"
          >
            Enregistrer
          </DsfrButton>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { object, string, array } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import Emailable from '@/mixins/emailable.client'
import ModalActivities from '@/components/modal/ModalActivities'

export default defineNuxtComponent({
  emits: ['change', 'submit'],
  mixins: [FormErrors, FormUploads, Emailable],
  components: {
    ModalActivities,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const {
      initialForm,
      schemaDisponibilities,
      schemaCommitmentDuration,
      schemaCommitmentTimePeriod,
      schemaActivities,
    } = useProfileValidation()

    return {
      initialForm,
      schemaDisponibilities,
      schemaCommitmentDuration,
      schemaCommitmentTimePeriod,
      schemaActivities,
    }
  },
  data() {
    return {
      loading: false,
      form: _cloneDeep(this.initialForm),
      formSchema: object({
        disponibilities: this.schemaDisponibilities,
        activities: this.schemaActivities,
        // @todo: useProfileValidation
        commitment: string()
          .nullable()
          .test(
            'is-commitment-required',
            'Merci de choisir une fréquence parmi celles proposées',
            (commitment) => {
              return ['admin'].includes(this.$stores.auth.contextRole) || !!commitment
            }
          ),
        disponibilities: array()
          .transform((v) => (!v ? [] : v))
          .test(
            'test-disponibilities-required',
            'Merci de sélectionner au moins 1 créneau',
            (disponibilities) => {
              return (
                ['admin'].includes(this.$stores.auth.contextRole) || disponibilities.length >= 1
              )
            }
          ),
      }),
      domainsOptions: [
        'Art et culture pour tous',
        'Bénévolat de compétences',
        'Éducation pour tous',
        'Mémoire et citoyenneté',
        'Prévention et protection',
        'Protection de la nature',
        'Solidarité et insertion',
        'Sport pour tous',
      ],
      formIsDirty: false,
      isModalActivitiesOpen: false,
    }
  },
  watch: {
    initialForm: {
      deep: true,
      handler(newVal) {
        this.form = _cloneDeep(newVal)
      },
    },
    form: {
      deep: true,
      handler(newForm) {
        this.formIsDirty = !_isEqual(newForm, this.initialForm)
      },
    },
    formIsDirty() {
      this.$emit('change', this.formIsDirty)
    },
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$stores.auth.updateProfile({
            id: this.$stores.auth.profile?.id,
            ...this.form,
          })
          this.formIsDirty = false
          this.$emit('submit')
          this.$toast.success('Modifications enregistrées')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSelectSkillItems(item) {
      if (!this.form.skills.some((skill) => skill.id === item.id)) {
        this.form.skills = [...this.form.skills, item]
      }
    },
    onRemovedSkillItem(item) {
      this.form.skills = this.form.skills.filter((skill) => skill.id !== item.id)
    },
    onModalActivitiesConfirm(payload) {
      this.form.activities = payload
      this.isModalActivitiesOpen = false
    },
    onActivityDelete(payload) {
      this.form.activities.splice(
        this.form.activities.findIndex((act) => act.id === payload.id),
        1
      )
    },
  },
})
</script>
