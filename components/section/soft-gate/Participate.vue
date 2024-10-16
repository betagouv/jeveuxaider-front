<template>
  <div>
    <div class="text-center mb-8">
      <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4"> Proposez votre aide </DsfrHeading>
      <div
        v-if="$stores.softGate.selectedMission"
        class="text-cool-gray-500 lg:text-lg max-w-md mx-auto"
      >
        Envoyez vos motivations et questions à
        <span class="font-bold">
          {{
            $stores.softGate.selectedMission.responsables.map((r) => r.secret_name).join(', ')
          }}</span
        >,
        {{
          $filters.pluralize(
            $stores.softGate.selectedMission.responsables.length,
            'responsable',
            'responsables',
            false
          )
        }}
        de la mission chez
        <span class="font-bold">{{ $stores.softGate.selectedMission.structure.name }}</span
        >.
      </div>
    </div>
    <div class="mx-auto">
      <form id="form" class="space-y-8" @submit.prevent="onSubmit">
        <BaseFormControl
          label="Votre message"
          html-for="content"
          required
          :error="errors.content"
          info="Obligatoire - 100 caractères minimum"
        >
          <BaseTextarea
            v-model="form.content"
            name="content"
            placeholder="Vos motivations en quelques mots"
            :rows="7"
            @blur="validate('content')"
          />
        </BaseFormControl>

        <DsfrButton :loading="loading" size="lg" class="w-full" @click.native.prevent="onSubmit">
          Envoyer
        </DsfrButton>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  name: 'SoftGateParticipate',
  mixins: [FormErrors],
  emits: ['next'],
  data() {
    return {
      loading: false,
      selectedMission: this.$stores.softGate.selectedMission,
      form: {
        content: !this.$stores.softGate.selectedMission?.is_motivation_required
          ? `Bonjour,\nJe souhaite participer à cette mission et apporter mon aide. Je me tiens disponible pour échanger et débuter la mission 🙂\n${this.$stores.auth.user?.profile?.first_name}`
          : null,
      },
      formSchema: object({
        content: string()
          .min(100, 'Votre message est trop court - 100 caractères minimum')
          .required('Un message est requis'),
      }),
    }
  },
  computed: {
    nextDates() {
      return this.selectedMission.dates?.filter(
        (date) =>
          this.$dayjs(date.id).isAfter(this.$dayjs()) ||
          this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
      )
    },
    isMissionInUserFavorite() {
      return this.$stores.auth?.user?.favorite_missions?.some(
        (favoriteMission) => favoriteMission.id === this.selectedMission.id
      )
    },
  },
  methods: {
    onSubmit() {
      if (this.loading) {
        return
      }

      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch('/participations', {
            method: 'POST',
            body: {
              mission_id: this.$stores.softGate.selectedMission.id,
              profile_id: this.$stores.auth.user.profile.id,
              content: this.form.content,
              utm_source: useCookie('utm_source')?.value,
              utm_campaign: useCookie('utm_campaign')?.value,
              utm_medium: useCookie('utm_medium')?.value,
              slots: this.$stores.softGate.selectedMission.selectedSlots,
            },
          })

          // API Engagement - Commande pour compter une candidature
          try {
            window.apieng &&
              window.apieng('trackApplication', this.$stores.softGate.selectedMission?.id)
          } catch (error) {
            console.error('API ENGAGEMENT - trackApplication', error)
          }

          console.log('SoftGateParticipate - isMissionInUserFavorite', this.isMissionInUserFavorite)

          this.$plausible.trackEvent('Soft Gate - Étape 3 - Demande de participation', {
            props: {
              hasSlots: this.$stores.softGate.selectedMission?.dates?.length > 0,
              isMotivationRequired: this.$stores.softGate.selectedMission?.is_motivation_required,
              isInFavorite: this.isMissionInUserFavorite,
            },
          })

          await this.$gtm?.trackEvent({
            event: 'benevole-participation-soft-gate',
          })
          this.$toast.success(
            'Votre participation a été enregistrée et est en attente de validation !'
          )
          await this.$stores.auth.fetchUser()
          this.$emit('next')
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
