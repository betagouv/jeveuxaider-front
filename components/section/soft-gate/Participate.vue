<template>
  <div>
    <!-- <div v-if="nextDates" class="flex items-center text-sm cursor-pointer text-gray-600" @click="$emit('back')">
      <ChevronLeftIcon class="mr-1 h-4 w-4" /> Retour
    </div> -->
    <div class="text-center mb-6">
      <Heading as="div" size="lg" class="mb-2 lg:mb-3">
        Proposez votre aide
      </Heading>
      <div
        v-if="$store.state.softGate.selectedMission"
        class="text-cool-gray-500 text-lg lg:text-xl max-w-md mx-auto"
      >
        Vous allez être mis en relation avec
        <span class="font-bold">{{ $store.state.softGate.selectedMission.responsable.first_name }}</span>,
        responsable de la mission chez
        <span class="font-bold">{{ $store.state.softGate.selectedMission.structure.name }}</span>.
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
          :loading="loading"
          size="lg"
          class="w-full"
          @click.native.prevent="onSubmit"
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
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  name: 'SoftGateParticipate',
  components: {
    Heading,
    Button
  },
  mixins: [FormErrors],
  data () {
    return {
      loading: false,
      selectedMission: this.$store.state.softGate.selectedMission,
      form: {
        content: `Bonjour ${this.$store.state.softGate.selectedMission?.responsable.first_name},\nJe souhaite participer à cette mission et apporter mon aide. Je me tiens disponible pour échanger et débuter la mission 🙂\n${this.$store.state.auth.user.profile.first_name}`
      },
      formSchema: object({
        content: string().min(10, 'Votre message est trop court').required('Un message est requis')
      })
    }
  },
  computed: {
    nextDates () {
      return this.selectedMission.dates?.filter(date =>
        this.$dayjs(date.id).isAfter(this.$dayjs()) || this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
      )
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
            slots: this.$store.state.softGate.selectedMission.selectedSlots
          })

          window.apieng && window.apieng('trackApplication')
          this.$plausible.trackEvent(
            'Soft Gate - Étape 3 - Demande de participation'
          )
          await this.$gtm.push({ event: 'benevole-participation-soft-gate' })
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
