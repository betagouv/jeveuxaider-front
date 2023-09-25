<template>
  <div>
    <div class="max-w-xl mx-auto bg-gray-100 p-6 sm:p-12">
      <div class="mb-8 py-4 px-6 border border-gray-400 text-gray-500 md:flex md:space-x-4">
        <RiInformationFill
          class="h-5 w-5 inline text-gray-400 translate-y-[-2px] md:translate-y-0 flex-none"
        />
        <span class="text-sm md:text-base">
          Une tête de réseau fédère, regroupe et administre plusieurs associations d’un même réseau,
          à l’instar des Restos du Coeur ou de la Croix-Rouge. A contrario, une association
          indépendante qui n’a pas d’adhérents dans le cadre d’une fédération, ou une antenne d’un
          réseau associatif n’est pas une tête de réseau.
        </span>
      </div>

      <form
        v-if="sent === false"
        id="inscription"
        class="gap-8 grid grid-cols-1 lg:grid-cols-2"
        @submit.prevent="onSubmit"
      >
        <BaseFormControl
          label="Nom de votre réseau d'organisations"
          html-for="name"
          required
          :error="errors.name"
          class="lg:col-span-2"
        >
          <BaseInput
            v-model="form.name"
            name="name"
            placeholder="Croix-Rouge, Banques Alimentaires, etc..."
            @blur="validate('name')"
          />
        </BaseFormControl>
        <BaseFormControl label="Prénom" html-for="first_name" required :error="errors.first_name">
          <BaseInput
            v-model="form.first_name"
            name="first_name"
            placeholder="Jean"
            @blur="validate('first_name')"
          />
        </BaseFormControl>
        <BaseFormControl label="Nom" html-for="last_name" required :error="errors.last_name">
          <BaseInput
            v-model="form.last_name"
            name="last_name"
            placeholder="Dupont"
            @blur="validate('last_name')"
          />
        </BaseFormControl>
        <BaseFormControl label="Email" html-for="email" required :error="errors.email">
          <BaseInput
            v-model="form.email"
            type="email"
            name="email"
            placeholder="jean.dupont@gmail.com"
            @blur="validate('email')"
          />
        </BaseFormControl>
        <BaseFormControl label="Téléphone" html-for="phone" required :error="errors.phone">
          <BaseInput
            v-model="form.phone"
            name="phone"
            placeholder="0612345678"
            @blur="validate('phone')"
          />
        </BaseFormControl>
        <div class="lg:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <BaseFormControl
            label="Nombre antennes"
            html-for="nb_antennes"
            required
            :error="errors.nb_antennes"
          >
            <BaseInput
              v-model="form.nb_antennes"
              name="nb_antennes"
              type="number"
              placeholder="5"
              @blur="validate('nb_antennes')"
            />
          </BaseFormControl>
          <BaseFormControl
            label="Nombre salariés"
            html-for="nb_employees"
            required
            :error="errors.nb_employees"
          >
            <BaseInput
              v-model="form.nb_employees"
              type="number"
              name="nb_employees"
              placeholder="5"
              @blur="validate('nb_employees')"
            />
          </BaseFormControl>
          <BaseFormControl
            label="Nombre bénévoles"
            html-for="nb_volunteers"
            required
            :error="errors.nb_volunteers"
          >
            <BaseInput
              v-model="form.nb_volunteers"
              name="nb_volunteers"
              type="number"
              placeholder="5"
              @blur="validate('nb_volunteers')"
            />
          </BaseFormControl>
        </div>
        <BaseFormControl
          label="À propos de votre demande"
          html-for="description"
          required
          :error="errors.description"
          class="lg:col-span-2"
        >
          <BaseTextarea
            v-model="form.description"
            name="description"
            placeholder="Précisez votre besoin en matière de bénévoles ou de missions"
            @blur="validate('description')"
          />
        </BaseFormControl>
        <div class="lg:col-span-2">
          <DsfrButton :loading="loading" class="w-full" size="lg" @click.native.prevent="onSubmit">
            Demander la gestion d'un réseau
          </DsfrButton>
        </div>
      </form>

      <div v-else class="flex flex-col space-y-4 text-center text-lg text-gray-500 font-semibold">
        <p class="text-5xl">👍</p>
        <p>
          Votre demande de gestion d’un réseau associatif a bien été envoyée à l’administration de
          JeVeuxAider.gouv.fr
        </p>
        <p>Vous serez prochainement contacté par notre équipe pour la suite de l’aventure.</p>
      </div>
    </div>

    <div v-if="sent === false" class="container mt-4 text-center">
      <nuxt-link
        no-prefetch
        to="/inscription/responsable"
        class="text-sm text-white hover:underline"
      >
        Retour
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { string, object, number } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Emailable from '@/mixins/emailable.client'

export default defineNuxtComponent({
  mixins: [FormErrors, Emailable],
  data() {
    return {
      loading: false,
      sent: false,
      form: {},
      formSchema: object({
        name: string().min(3).required(),
        first_name: string().required(),
        last_name: string().required(),
        phone: string()
          .min(10)
          .matches(/^[+|\s|\d]*$/, 'Ce format est incorrect')
          .required(),
        email: string().required().email(),
        nb_antennes: number().required(),
        nb_employees: number().required(),
        nb_volunteers: number().required(),
      }),
    }
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
          const isEmailValid = await this.emailableValidation()
          if (!isEmailValid) {
            this.errors.email = 'Votre adresse mail comporte une erreur'
            this.$toast.error('Votre adresse mail comporte une erreur')
            return
          }
          this.loading = true
          await apiFetch('/reseaux/lead', {
            method: 'POST',
            body: this.form,
          })
          this.sent = true
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
