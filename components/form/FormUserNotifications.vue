<template>
  <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
    <div class="grid grid-cols-1 gap-8 lg:gap-12">
      <div class="flex gap-12">
        <div class="hidden lg:block w-[80px]">
          <img src="/images/icons/mail-send.svg" alt="" data-not-lazy class="w-full" />
        </div>
        <div class="flex-1">
          <BaseHeading as="h2" :level="2"> Ma disponibilité </BaseHeading>
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
      <!-- <div class="flex gap-12">
        <div class="hidden lg:block w-[80px]">
          <img src="/images/icons/culture.svg" alt="" data-not-lazy class="w-full" />
        </div>
        <div class="flex-1">
          <div class="text-3xl font-bold text-black">
            Quelles activités de bénévolat<br />
            vous intéressent ?
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
      </div> -->
      <!-- <div class="pt-8 lg:pt-14">
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
    <template v-if="['responsable'].includes($stores.auth.contextRole)">
      <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-16">
        <div>
          <BaseHeading as="h2" :level="2">
            Notifications relatives aux participations et messages reçus
          </BaseHeading>
          <BaseAlert class="mt-8">
            <span class="font-bold">Temps réel :</span> Recevez un mail dès qu’une nouvelle action
            est réalisée sur la plateforme (une nouvelle candidature à une mission, par exemple)<br />
            <span class="font-bold">Résumé quotidien :</span> Recevez un mail unique par jour, qui
            regroupe l’intégralité des actualités quotidiennes
          </BaseAlert>
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12 mt-8">
            <div class="text-gray-600">
              <p class="mb-4">Les notifications concernées comprennent notamment :</p>
              <ul class="pl-8 list-disc">
                <li>Les messages d’information pour toute nouvelle participation</li>
                <li>Les nouveaux messages reçus dans la messagerie</li>
                <li>Les relances relatives aux participations en attente</li>
              </ul>
            </div>
            <div class="w-[400px]">
              <BaseRadioGroup
                v-model="form.notification__responsable_frequency"
                :options="[
                  { key: 'realtime', label: 'Temps réel' },
                  { key: 'summary', label: 'Résumé quotidien' },
                ]"
                variant="tabs"
              />
            </div>
          </div>
        </div>
        <div class="pt-8 lg:pt-14">
          <BaseHeading as="h2" :level="2"> Résumé mensuel de votre activité </BaseHeading>
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12 mt-8">
            <div class="text-gray-600 max-w-[500px]">
              Retrouvez chaque mois un résumé de l'activité liée à votre organisation ainsi que vos
              actions en attente
            </div>
            <div class="w-[400px]">
              <BaseRadioGroup
                v-model="form.notification__responsable_bilan"
                :options="[
                  { key: true, label: 'Activé' },
                  { key: false, label: 'Désactivé' },
                ]"
                variant="tabs"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="['referent'].includes($stores.auth.contextRole)">
      <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-16">
        <div>
          <BaseHeading as="h2" :level="3" class="mb-8">
            Notifications relatives aux missions/organisations en cours de modération et messages
            reçus
          </BaseHeading>
          <BaseAlert class="mb-8">
            <span class="font-bold">Temps réel :</span> Recevez un mail dès qu’une nouvelle action
            est réalisée sur la plateforme (une nouvelle mission proposée, par exemple)<br />
            <span class="font-bold">Résumé bi-hebdomadaire :</span> Recevez deux mails par semaine,
            regroupant l’intégralité des actualités de JeVeuxAider.gouv.fr sur votre département
          </BaseAlert>
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
            <div class="text-gray-600">
              <p class="mb-4">Les notifications concernées comprennent notamment :</p>
              <ul class="pl-8 list-disc">
                <li>Les messages d’information pour toute nouvelle mission proposée</li>
                <li>Les messages d’information pour toute nouvelle organisation inscrite</li>
                <li>Les notifications relatives aux messages reçus via la messagerie</li>
              </ul>
            </div>
            <div class="w-[400px]">
              <BaseRadioGroup
                v-model="form.notification__referent_frequency"
                :options="[
                  { key: 'realtime', label: 'Temps réel' },
                  { key: 'summary', label: 'Résumé bi-hebdomadaire' },
                ]"
                variant="tabs"
              />
            </div>
          </div>
        </div>
        <div class="pt-8 lg:pt-14">
          <BaseHeading as="h2" :level="3" class="mb-8">
            Résumé mensuel de votre activité
          </BaseHeading>
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
            <div class="text-gray-600 max-w-[500px]">
              Retrouvez chaque mois un résumé de l'activité liée à votre département ainsi que vos
              actions en attente
            </div>
            <div class="w-[400px]">
              <BaseRadioGroup
                v-model="form.notification__referent_bilan"
                :options="[
                  { key: true, label: 'Activé' },
                  { key: false, label: 'Désactivé' },
                ]"
                variant="tabs"
              />
            </div>
          </div>
        </div>
      </div>
    </template> -->
    </div>
  </div>
</template>

<script>
import { object, array, string } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  emits: ['change', 'submit'],
  mixins: [FormErrors],
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
      formSchema: object({}),
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
  },
})
</script>
