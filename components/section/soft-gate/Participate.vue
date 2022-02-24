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
    return {
      loading: false,
      form: {
        content: `Bonjour ${this.$store.state.softGate.selectedMission?.responsable.first_name},\nJe souhaite participer à cette mission et apporter mon aide. \nJe me tiens disponible pour échanger et débuter la mission 🙂\n${this.$store.state.auth.user.profile.first_name}`
      },
      formSchema: object({
        content: string().min(10, 'Votre message est trop court').required('Un message est requis')
      })
    }
  },
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          await this.$axios.post('/participations', {
            mission_id: this.$store.state.softGateMissionSelected.id,
            profile_id: this.$store.state.auth.user.profile.id,
            content: this.form.content
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
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
