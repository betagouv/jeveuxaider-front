<template>
  <div>
    <!-- <div v-if="nextDates" class="flex items-center text-sm cursor-pointer text-gray-600" @click="$emit('back')">
      <RiArrowLeftSLine class="mr-1 h-4 w-4" /> Retour
    </div> -->
    <div class="text-center mb-6">
      <DsfrHeading as="div" size="lg" class="mb-2 lg:mb-3"> Proposez votre aide </DsfrHeading>
      <div
        v-if="$stores.softGate.selectedMission"
        class="text-cool-gray-500 text-lg lg:text-xl max-w-md mx-auto"
      >
        Vous allez être mis en relation avec
        <span class="font-bold">{{ $stores.softGate.selectedMission.responsable.first_name }}</span
        >, responsable de la mission chez
        <span class="font-bold">{{ $stores.softGate.selectedMission.structure.name }}</span
        >.
      </div>
    </div>
    <div class="mx-auto max-w-sm">
      <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
        <BaseFormControl
          label="Votre message"
          labelSuffix="(100 caractères min.)"
          html-for="content"
          required
          :error="errors.content"
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
          ? `Bonjour ${this.$stores.softGate.selectedMission?.responsable.first_name},\nJe souhaite participer à cette mission et apporter mon aide. Je me tiens disponible pour échanger et débuter la mission 🙂\n${this.$stores.auth.user.profile.first_name}`
          : null,
      },
      formSchema: object({
        content: string()
          .min(100, 'Votre message est trop court (100 caractères min.)')
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

          window.apieng && window.apieng('trackApplication')
          this.$plausible.trackEvent('Soft Gate - Étape 3 - Demande de participation', {
            props: {
              hasSlots: this.$stores.softGate.selectedMission?.dates?.length > 0,
              isMotivationRequired: this.$stores.softGate.selectedMission?.is_motivation_required,
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
