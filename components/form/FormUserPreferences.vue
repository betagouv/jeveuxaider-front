<template>
  <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
    <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-12 lg:gap-16">
      <div>
        <BaseHeading as="h2" :level="2">
          Ma disponibilité pour réaliser des actions bénévoles
        </BaseHeading>
        <div class="text-lg text-[#3A3A3A] mt-4">
          Ces informations sont utilisées pour vous suggérer des missions en fonction de votre
          agenda.
        </div>
        <div class="mt-12 space-y-8">
          <div class="flex lg:space-x-10 items-center">
            <div class="hidden lg:block w-[90px]">
              <img src="/images/icons/calendar.svg" alt="" data-not-lazy />
            </div>
            <div>
              <BaseFormLabel html-for="frequence" required size="xl">
                Combien de temps pourriez-vous allouer à des actions de bénévolat&nbsp;?
              </BaseFormLabel>
              <div class="mt-4 flex flex-col sm:flex-row gap-4 lg:gap-6">
                <div class="lg:w-1/2">
                  <BaseSelectAdvanced
                    v-model="form.commitment__duration"
                    name="commitment__duration"
                    placeholder="Durée"
                    :options="$labels.duration"
                    @blur="validate('commitment__duration')"
                  />
                  <BaseFormError v-if="errors.commitment__duration">
                    {{ errors.commitment__time_period }}
                  </BaseFormError>
                </div>
                <div class="flex-none text-lg font-semibold sm:mt-2">par</div>
                <div class="lg:w-1/2">
                  <BaseSelectAdvanced
                    v-model="form.commitment__time_period"
                    name="commitment__time_period"
                    placeholder="Fréquence"
                    :options="$labels.time_period"
                    @blur="validate('commitment__time_period')"
                  />
                  <BaseFormError v-if="errors.commitment__time_period">
                    {{ errors.commitment__time_period }}
                  </BaseFormError>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="lg:pl-[130px]">
              <BaseFormControl
                label="Cochez les créneaux pendant lesquels vous seriez disponible"
                label-size="xl"
                html-for="disponibilities"
                required
                :error="errors.disponibilities"
              >
                <DsfrTagsGroup
                  v-model="form.disponibilities"
                  name="disponibilities"
                  variant="button"
                  :options="$labels.disponibilities"
                  class="mt-6"
                  @updated="validate('disponibilities')"
                />
              </BaseFormControl>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-8 lg:pt-14">
        <div class="flex lg:space-x-10 items-center">
          <div class="hidden lg:block w-[90px]">
            <img src="/images/icons/send-mail.svg" alt="" data-not-lazy />
          </div>
          <div>
            <div class="block font-bold mb-2 relative text-xl normal-case text-black">
              Recevoir des propositions de missions par les organisations
            </div>
            <div class="text-[#3A3A3A]">
              Recevez par e-mail des suggestions de missions de bénévolat
            </div>
          </div>
          <div>
            <BaseToggle v-model="form.is_visible" size="xl" />
          </div>
        </div>
      </div>

      <div class="pt-8 lg:pt-14">
        <div class="text-3xl font-bold text-black">
          Quelles activités de bénévolat peuvent vous intéresser ?
        </div>
        <DsfrTagsGroup
          v-model="form.activities"
          name="activites"
          variant="button"
          :options="activitiesOptions"
          is-model
          class="mt-12"
        />
      </div>
      <div class="pt-8 lg:pt-14">
        <div class="text-3xl font-bold text-black">Les compétences que vous pourriez apporter</div>
        <BaseFormControl
          label="Renseignez certaines de vos compétences"
          html-for="algolia-search"
          class="mt-12"
        >
          <AlgoliaInputAutocomplete
            index="termsIndex"
            attribute-right-label="group"
            :search-parameters="{
              facetFilters: [['vocabulary_name:Skills']],
              hitsPerPage: 6,
            }"
            @selected="handleSelectSkillItems"
          />
        </BaseFormControl>

        <div v-if="form.skills.length" class="mt-6">
          <div class="flex flex-wrap gap-4">
            <BaseTagFormItem
              v-for="item in form.skills"
              :key="item.id"
              :tag="item"
              @removed="onRemovedSkillItem"
            >
              {{ item.name }}
            </BaseTagFormItem>
          </div>
        </div>
      </div>
      <div class="hidden sm:block pt-8 lg:pt-14">
        <div class="text-center">
          <DsfrButton
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit()"
          >
            Mettre à jour
          </DsfrButton>
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
            Mettre à jour
          </DsfrButton>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { object, array, string } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import Emailable from '@/mixins/emailable.client'
import activitiesOptions from '@/assets/activities.json'

export default defineNuxtComponent({
  emits: ['change', 'submit'],
  mixins: [FormErrors, FormUploads, Emailable],
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: _cloneDeep(this.profile),
      activitiesOptions: activitiesOptions.sort((a, b) => a.name.localeCompare(b.name)),
      formSchema: object({
        commitment__duration: string().nullable().required('Merci de choisir une durée'),
        commitment__time_period: string().nullable().required('Merci de choisir une fréquence'),
        disponibilities: array()
          .transform((v) => (!v ? [] : v))
          .test(
            'test-disponibilities-required',
            'Merci de sélectionner au moins 1 disponibilité',
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
    }
  },
  watch: {
    profile: {
      deep: true,
      handler(profile) {
        this.form = _cloneDeep(profile)
      },
    },
    form: {
      deep: true,
      handler(newForm) {
        this.formIsDirty = !_isEqual(newForm, this.profile)
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
            id: this.$stores.auth.profile.id,
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
      this.form.skills = [...this.form.skills, item]
    },
    onRemovedSkillItem(item) {
      this.form.skills = this.form.skills.filter((skill) => skill.id !== item.id)
    },
  },
})
</script>
