<template>
  <div>
    <div class="text-center mb-8">
      <div class="text-[48px]">💌</div>
      <div class="text-[#161616] text-[28px] font-bold leading-9 mb-2 lg:mb-4">
        Votre prochaine mission de bénévolat dans votre boîte mail
      </div>
      <div class="text-[#666666] lg:text-lg max-w-md mx-auto">
        <strong>Recevez un email par semaine</strong> avec les nouvelles missions disponibles.
      </div>
      <!-- <div class="text-[#666666] text-sm">Vous pourrez la désactiver à tout moment.</div> -->
    </div>
    <div class="mx-auto">
      <form id="form" class="space-y-8" @submit.prevent="onSubmit">
        <DsfrFormControl
          html-for="type_missions"
          :error="errors.type_missions"
          class="mt-6 @container"
          label="Type de missions"
          required
        >
          <DsfrTagsGroup
            v-model="form.type_missions"
            name="type_missions"
            :options="[
              { key: 'presentiel', label: 'Sur place' },
              { key: 'distance', label: 'À distance' },
              { key: 'all', label: 'Les deux' },
            ]"
            context="radio"
          />
        </DsfrFormControl>
        <DsfrFormControl :error="errors.activities" label="Activités">
          <DsfrTagsGroup
            v-model="form.activities"
            name="activites"
            variant="button"
            :options="activities"
          />
        </DsfrFormControl>
        <DsfrFormControl :error="errors.commitment" label="Disponibilités">
          <DsfrSelect v-model="form.commitment" name="commitment" :options="$labels.commitment" />
        </DsfrFormControl>

        <DsfrButton :loading="loading" class="w-full" full @click.native.prevent="onSubmit">
          Créer mon alerte
        </DsfrButton>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import FormErrors from '@/mixins/form/errors'
import activities from '@/assets/activities.json'

export default defineNuxtComponent({
  name: 'UserAlertStepForm',
  mixins: [FormErrors],
  emits: ['next'],
  data() {
    return {
      activities: activities,
      loading: false,
      form: this.$stores.userAlert.selectedAlert ?? {
        type_missions: null,
        activities: [],
        address: null,
        commitment: null,
      },
      formSchema: object({
        type_missions: string().required('Un type de mission est requis'),
        activities: array().min(1, 'Une activité est requise').required('Une activité est requise'),
        commitment: string().required('Une disponibilité est requise'),
      }),
    }
  },
  methods: {
    onSubmit() {
      if (this.loading) {
        return
      }

      console.log('onSubmit')

      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch('/user/alerts', {
            method: 'POST',
            body: this.form,
          })

          this.$plausible.trackEvent('User Alert - Creation')

          this.$toast.success(
            'Votre alerte a bien été créée. Vous recevrez un email par semaine avec les nouvelles missions disponibles.'
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
