<template>
  <div class="bg-white px-6 py-8 lg:p-10">
    <div class="grid grid-cols-1 gap-8 lg:gap-12">
      <div class="flex gap-12">
        <div class="hidden lg:block w-[80px]">
          <img src="/images/icons/calendar.svg" alt="" data-not-lazy class="w-full" />
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
                <BaseFormLabel html-for="frequence" required size="xl">
                  Combien de temps pourriez-vous allouer à des actions
                  <br class="hidden lg:inline" />de bénévolat&nbsp;?
                </BaseFormLabel>
                <div class="mt-4 flex flex-col sm:flex-row gap-4 lg:gap-6">
                  <div class="lg:w-1/2">
                    <DsfrSelect
                      id="commitment__duration"
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
                    <DsfrSelect
                      v-model="form.commitment__time_period"
                      id="commitment__time_period"
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
              <BaseFormLabel html-for="disponibilities" required size="xl">
                Cochez les créneaux pendant lesquels vous seriez <br class="hidden lg:inline" />
                disponible&nbsp;?
              </BaseFormLabel>
              <DsfrFormControl
                html-for="disponibilities"
                :error="errors.disponibilities"
                class="mt-4"
              >
                <DsfrTagsGroup
                  v-model="form.disponibilities"
                  name="disponibilities"
                  variant="button"
                  :options="$labels.disponibilities"
                  @updated="validate('disponibilities')"
                />
              </DsfrFormControl>
            </div>
            <div>
              <BaseFormLabel html-for="type_missions" size="xl">
                Vous êtes plutôt mission sur place ou à distance&nbsp;?
              </BaseFormLabel>
              <DsfrFormControl html-for="type_missions" :error="errors.type_missions" class="mt-6">
                <DsfrRadioRichGroup
                  v-model="form.type_missions"
                  name="type_missions"
                  :options="$labels.profile_type_missions"
                />
              </DsfrFormControl>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div class="flex gap-12">
        <div class="hidden lg:block w-[80px]">
          <img src="/images/icons/culture.svg" alt="" data-not-lazy class="w-full" />
        </div>
        <div class="flex-1 max-w-full">
          <DsfrHeading size="lg">
            Quelles activités de bénévolat<br class="hidden sm:block" />
            vous intéressent ?
          </DsfrHeading>
          <DsfrTagsGroup
            v-model="form.activities"
            name="activites"
            variant="button"
            :options="activitiesOptions"
            is-model
            class="mt-12"
          />
        </div>
      </div>
      <!-- <div class="hidden sm:block ">
        <div class="text-center">
          <DsfrButton
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit()"
          >
            Enregistrer
          </DsfrButton>
        </div>
      </div> -->
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
      handler(newProfile) {
        this.form = _cloneDeep(newProfile)
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
  },
})
</script>
