<template>
  <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
    <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-12 lg:gap-16">
      <div class="">
        <Heading as="h2" :level="2">
          Ma disponibilité pour réaliser des actions bénévoles
        </Heading>
        <div class="text-lg text-[#3A3A3A] mt-4">
          Ces informations sont utilisées pour vous suggérer des missions en fonction de votre agenda.
        </div>
        <div class="mt-12 space-y-8">
          <div class="flex lg:space-x-10 items-center">
            <div class="w-[90px]">
              <img
                src="/images/icons/calendar.svg"
                alt=""
                class="hidden lg:block flex-none"
                data-not-lazy
              >
            </div>
            <div>
              <FormLabel html-for="frequence" required size="xl">
                Combien de temps pourriez-vous allouer à des actions de bénévolat&nbsp;?
              </FormLabel>
              <div class="mt-4 flex flex-col sm:flex-row gap-4 lg:gap-6 sm:items-center">
                <div class="lg:w-1/2">
                  <SelectAdvanced
                    v-model="form.commitment__duration"
                    name="commitment__duration"
                    placeholder="Durée"
                    :options="$labels.duration"
                  />
                  <FormError v-if="errors.commitment__duration">
                    {{ errors.commitment__time_period }}
                  </FormError>
                </div>
                <div class="flex-none text-lg font-semibold">
                  par
                </div>
                <div class="lg:w-1/2">
                  <SelectAdvanced
                    v-model="form.commitment__time_period"
                    name="commitment__time_period"
                    placeholder="Fréquence"
                    :options="$labels.time_period"
                  />
                  <FormError v-if="errors.commitment__time_period">
                    {{ errors.commitment__time_period }}
                  </FormError>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="lg:pl-[130px]">
              <FormControl
                label="Cochez les créneaux pendant lesquels vous seriez disponible"
                label-size="xl"
                html-for="disponibilities"
                required
                :error="errors.disponibilities"
              >
                <TagsGroup
                  v-model="form.disponibilities"
                  name="disponibilities"
                  variant="button"
                  :options="$labels.disponibilities"
                  class="mt-6"
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-8 lg:pt-14">
        <div class="flex lg:space-x-10 items-center">
          <div class="w-[90px]">
            <img
              src="/images/icons/send-mail.svg"
              alt=""
              class="hidden lg:block flex-none"
              data-not-lazy
            >
          </div>
          <div>
            <Toggle
              v-model="form.is_visible"
              class="flex-1"
              position="right"
              size="xl"
              label="Recevoir directement des solicitations par des organisations"
              description="Recevez par e-mail des propositions de missions de bénévolat"
            />
          </div>
        </div>
      </div>

      <div class="pt-8 lg:pt-14">
        @TODO activités selection
      </div>
      <div class="pt-8 lg:pt-14">
        @TODO compétences
      </div>
      <div class="pt-8 lg:pt-14">
        <div class="text-center">
          <Button size="lg" variant="primary" :loading="loading" @click.native="handleSubmit()">
            Mettre à jour
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { object, array } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import Emailable from '@/mixins/emailable.client'
import Button from '@/components/dsfr/Button.vue'
import TagsGroup from '@/components/dsfr/TagsGroup.vue'

export default {
  components: {
    Button,
    TagsGroup
  },
  mixins: [FormErrors, FormUploads, Emailable],
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: cloneDeep(this.profile),
      formSchema: object({
        disponibilities: array().transform(v => (!v ? [] : v)).test(
          'test-disponibilities-required',
          'Merci de sélectionner au moins 1 disponibilité',
          (disponibilities) => {
            return ['admin'].includes(this.$store.getters.contextRole) || disponibilities.length >= 1
          }
        )
      })

    }
  },
  computed: {

  },
  methods: {
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$store.dispatch('auth/updateProfile', {
            id: this.$store.getters.profile.id,
            ...this.form
          })
          this.$toast.success('Modifications enregistrées')
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

<style>

</style>
