<template>
  <div>
    <div class="text-center mb-6">
      <div
        class="text-gray-900 font-extrabold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-3"
      >
        Proposez votre aide
      </div>
      <div
        v-if="$store.state.softGate.selectedMission"
        class="text-gray-500 font-semibold text-lg lg:text-xl max-w-md mx-auto"
      >
        Vous allez être mis en relation avec
        <span class="font-extrabold">{{
          $store.state.softGate.selectedMission.responsable.first_name
        }}</span>, responsable de la mission chez
        <span class="font-extrabold">{{
          $store.state.softGate.selectedMission.structure.name
        }}</span>.
      </div>
    </div>
    <div class="mx-auto max-w-sm">
      <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
        <FormControl label="Votre message" html-for="content" required :error="errors.content">
          <Textarea
            v-model="form.content"
            name="content"
            :rows="7"
            @blur="validate('content')"
          />
        </FormControl>

        <Button
          type="submit"
          size="xl"
          variant="green"
          rounded
          full
          :loading="loading"
          @click="onSubmit"
        >
          Envoyer
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  name: 'SoftGateParticipate',
  mixins: [FormErrors],
  data () {
    let message = `Bonjour ${this.$store.state.softGate.selectedMission?.responsable.first_name},\nJe souhaite participer à cette mission et apporter mon aide. \nJe me tiens disponible pour échanger et débuter la mission 🙂\n${this.$store.state.auth.user.profile.first_name}`
    if (this.$store.state.softGate.selectedMission.dateSelected) {
      message = `Bonjour ${this.$store.state.softGate.selectedMission?.responsable.first_name},\nJe souhaite participer à cette mission et apporter mon aide le ${this.$store.state.softGate.selectedMission?.dateSelected.ariaLabel} (${this.$store.state.softGate.selectedMission?.slotSelected.map(slot => this.$options.filters.label(slot, 'slots')).join(', ').toLowerCase()}). \nJe me tiens disponible pour échanger et débuter la mission 🙂\n${this.$store.state.auth.user.profile.first_name}`
    }
    return {
      loading: false,
      form: {
        content: message
      },
      formSchema: object({
        content: string().min(10, 'Votre message est trop court').required('Un message est requis')
      })
    }
  },
  methods: {
    onSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$axios.post('/participations', {
            mission_id: this.$store.state.softGate.selectedMission.id,
            profile_id: this.$store.state.auth.user.profile.id,
            content: this.form.content,
            utm_source: this.$cookies.get('utm_source'),
            utm_campaign: this.$cookies.get('utm_campaign'),
            utm_medium: this.$cookies.get('utm_medium'),
            date: this.$store.state.softGate.selectedMission.dateSelected?.id,
            slots: this.$store.state.softGate.selectedMission.slotSelected
          })

          window.apieng && window.apieng('trackApplication')
          window.plausible &&
            window.plausible(
              'Soft Gate - Étape 3 - Demande de participation'
            )

          this.$toast.success('Votre participation a été enregistrée et est en attente de validation !')
          await this.$store.dispatch('auth/fetchUser')
          this.$emit('next')
        })
        .catch((errors) => {
          console.log(errors)
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
