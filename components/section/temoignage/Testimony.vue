<template>
  <div>
    <div class="text-center">
      <div
        class="text-2xl sm:text-[38px] sm:leading-tight font-bold text-jva-blue-500 tracking-[-1px]"
      >
        <template v-if="form.grade > 3">
          <h1>
            <span class="font-extrabold">{{ benevole.first_name }}</span
            >, comment s'est déroulée votre mission&nbsp;?
          </h1>

          <div class="font-medium text-md sm:text-xl text-[#808080]">
            {{ mission.name }}
          </div>
        </template>

        <div v-else class="max-w-[678px]">
          Nous sommes navrés d’apprendre que la mission s’est mal déroulée.
        </div>
      </div>

      <form
        ref="testimonyForm"
        class="py-8 max-w-[638px] mx-auto grid gap-6 lg:gap-8"
        style="filter: drop-shadow(0px 20px 50px rgba(0, 0, 0, 0.15))"
      >
        <BaseFormControl html-for="testimony">
          <BaseTextarea
            v-model="form.testimony"
            name="testimony"
            :placeholder="placeholder"
            @blur="validate('testimony')"
          />
        </BaseFormControl>

        <BaseButton type="submit" full size="xl" @click.prevent="onSubmit">
          {{ labelCta }}
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  emits: ['submit', 'destroy'],
  mixins: [FormErrors],
  props: {
    notificationTemoignage: {
      type: Object,
      required: true,
    },
    mission: {
      type: Object,
      required: true,
    },
    benevole: {
      type: Object,
      required: true,
    },
    initialForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: { ...this.initialForm },
      formSchema: object({
        testimony: string().min(50).required('Votre témoignage est requis'),
      }),
    }
  },
  computed: {
    placeholder() {
      return this.form?.grade < 3
        ? 'Dites-nous comment améliorer la qualité de cette mission'
        : 'Partagez votre expérience avec la communauté de bénévoles'
    },
    labelCta() {
      return this.form?.grade < 3 ? 'Partager mon retour' : 'Publier mon témoignage'
    },
  },
  beforeUnmount() {
    this.$emit('destroy', this.form)
  },
  methods: {
    onSubmit() {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch('/temoignages', {
            method: 'POST',
            body: {
              ...this.form,
              participation_id: this.notificationTemoignage.participation_id,
            },
          })
            .then(() => {
              this.$emit('submit', this.form)
              this.$stores.temoignage.nextStep()
            })
            .catch((errors) => {
              this.setErrors(errors)
            })
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
