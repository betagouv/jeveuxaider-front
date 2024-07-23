<template>
  <div class="bg-white px-6 py-8 lg:p-10">
    <div class="grid grid-cols-1 gap-8 lg:gap-12">
      <template v-if="['responsable'].includes($stores.auth.contextRole)">
        <div class="flex gap-12">
          <div class="hidden lg:block w-[80px]">
            <img src="/images/icons/culture.svg" alt="" data-not-lazy class="w-full" />
          </div>
          <div class="flex-1">
            <div class="text-3xl font-bold text-black">Fréquence des notifications</div>
            <div class="text-[#666666] mt-4 mb-8">
              Gérez la fréquence de notifications liées aux nouvelles candidatures ou de vos
              messages reçus
            </div>
            <DsfrRadioRichGroup
              v-model="form.notification__responsable_frequency"
              name="notification__responsable_frequency"
              :options="[
                {
                  key: 'realtime',
                  label: 'Temps réel',
                  description:
                    'Recevez une notification mail dès qu’une nouvelle action est réalisée sur la plateforme',
                },
                {
                  key: 'summary',
                  label: 'Résumé quotidien',
                  description:
                    'Recevez une notification mail unique par jour, qui regroupe l’intégralité des actualités quotidiennes',
                },
              ]"
              option-class="w-full"
            />
          </div>
        </div>

        <hr />
        <div class="flex gap-12">
          <div class="hidden lg:block w-[80px]">
            <img src="/images/icons/culture.svg" alt="" data-not-lazy class="w-full" />
          </div>
          <div class="flex-1">
            <div class="text-3xl font-bold text-black">Résumé mensuel de votre activité</div>
            <div class="text-[#666666] mt-4 mb-8">
              Retrouvez chaque mois un résumé de l'activité liée à votre organisation ainsi que vos
              actions en attente
            </div>
            <DsfrRadioRichGroup
              v-model="form.notification__responsable_bilan"
              name="notification__responsable_bilan"
              :options="[
                {
                  key: true,
                  label: 'Activé',
                  description:
                    'Oui, je souhaite recevoir un résumé mensuel de mon activité sur la plateforme',
                },
                {
                  key: false,
                  label: 'Désactivé',
                  description: 'Non merci, ce n’est pas nécessaire pour moi',
                },
              ]"
              option-class="w-full"
            />
          </div>
        </div>
        <hr />
      </template>

      <template v-if="['referent'].includes($stores.auth.contextRole)">
        <div class="flex gap-12">
          <div class="hidden lg:block w-[80px]">
            <img src="/images/icons/culture.svg" alt="" data-not-lazy class="w-full" />
          </div>
          <div class="flex-1">
            <div class="text-3xl font-bold text-black">Fréquence des notifications</div>
            <div class="text-[#666666] mt-4 mb-8">
              Gérez la fréquence de notifications pour votre confort de travail
            </div>
            <DsfrRadioRichGroup
              v-model="form.notification__referent_frequency"
              name="notification__referent_frequency"
              :options="[
                {
                  key: 'realtime',
                  label: 'Temps réel',
                  description:
                    'Recevez un mail dès qu’une nouvelle action est réalisée sur la plateforme (une nouvelle candidature à une mission, par exemple)',
                },
                {
                  key: 'summary',
                  label: 'Résumé quotidien',
                  description:
                    'Recevez un mail unique par jour, qui regroupe l’intégralité des actualités quotidiennes',
                },
              ]"
              option-class="w-full"
            />
          </div>
        </div>

        <hr />
        <div class="flex gap-12">
          <div class="hidden lg:block w-[80px]">
            <img src="/images/icons/culture.svg" alt="" data-not-lazy class="w-full" />
          </div>
          <div class="flex-1">
            <div class="text-3xl font-bold text-black">Résumé mensuel de votre activité</div>
            <div class="text-[#666666] mt-4 mb-8">
              Retrouvez chaque mois un résumé de l'activité liée à votre organisation ainsi que vos
              actions en attente
            </div>
            <DsfrRadioRichGroup
              v-model="form.notification__referent_bilan"
              name="notification__referent_bilan"
              :options="[
                {
                  key: true,
                  label: 'Activé',
                  description:
                    'Oui, je souhaite recevoir un résumé mensuel de mon activité sur la plateforme',
                },
                {
                  key: false,
                  label: 'Désactivé',
                  description: 'Non merci, ce n’est pas nécessaire pour moi',
                },
              ]"
              option-class="w-full"
            />
          </div>
        </div>
        <hr />
      </template>

      <div class="flex gap-12">
        <div class="hidden lg:block w-[80px]">
          <img src="/images/icons/mail-send.svg" alt="" data-not-lazy class="w-full" />
        </div>
        <div class="flex-1">
          <DsfrHeading size="lg">
            J’accepte d’être contacté par les organisations de la plateforme
          </DsfrHeading>
          <div class="text-[#666666] mt-4 mb-8">
            Si vous êtes disponible et si votre profil les intéressent, elles pourront vous envoyer
            des propositions de missions (5 par mois maximum)
          </div>
          <DsfrRadioRichGroup
            v-model="form.is_visible"
            name="is_visible"
            :options="[
              {
                key: true,
                label: 'Oui',
                description: 'J’accepte de recevoir des propositions de missions',
              },
              {
                key: false,
                label: 'Non merci',
                description: 'Je préfère faire mes recherches moi-même',
              },
            ]"
            option-class="w-full"
          />
        </div>
      </div>
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
