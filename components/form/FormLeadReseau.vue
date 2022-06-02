<template>
  <div>
    <div class="max-w-xl mx-auto bg-gray-100 p-6 sm:p-12 rounded-2xl">
      <div
        class="mb-8 py-4 px-6 border border-gray-400 text-gray-500 rounded-2xl md:flex md:space-x-4"
      >
        <InformationCircleSolidIcon class="h-5 w-5 inline text-gray-400 translate-y-[-2px] md:translate-y-0 flex-none" />
        <span class="text-sm md:text-base">
          Une tête de réseau fédère, regroupe et administre plusieurs associations d’un même réseau, à l’instar des Restos du Coeur ou de la Croix-Rouge. A contrario, une association indépendante qui n’a pas d’adhérents dans le cadre d’une fédération, ou une antenne d’un réseau associatif n’est pas une tête de réseau.
        </span>
      </div>

      <form
        v-if="sent === false"
        id="inscription"
        class="gap-8 grid grid-cols-1 lg:grid-cols-2"
        @submit.prevent="onSubmit"
      >
        <FormControl
          label="Nom de votre réseau d'organisations"
          html-for="name"
          required
          :error="errors.name"
          class="lg:col-span-2"
        >
          <Input
            v-model="form.name"
            name="name"
            placeholder="Croix-Rouge, Banques Alimentaires, etc..."
            @blur="validate('name')"
          />
        </FormControl>
        <FormControl
          label="Prénom"
          html-for="first_name"
          required
          :error="errors.first_name"
        >
          <Input
            v-model="form.first_name"
            name="first_name"
            placeholder="Jean"
            @blur="validate('first_name')"
          />
        </FormControl>
        <FormControl
          label="Nom"
          html-for="last_name"
          required
          :error="errors.last_name"
        >
          <Input
            v-model="form.last_name"
            name="last_name"
            placeholder="Dupont"
            @blur="validate('last_name')"
          />
        </FormControl>
        <FormControl
          label="Email"
          html-for="email"
          required
          :error="errors.email"
        >
          <Input
            v-model="form.email"
            name="email"
            placeholder="jean.dupont@gmail.com"
            @blur="validate('email')"
          />
        </FormControl>
        <FormControl
          label="Téléphone"
          html-for="phone"
          required
          :error="errors.phone"
        >
          <Input
            v-model="form.phone"
            name="phone"
            placeholder="0612345678"
            @blur="validate('phone')"
          />
        </FormControl>
        <div class="lg:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FormControl
            label="Nombre antennes"
            html-for="nb_antennes"
            required
            :error="errors.nb_antennes"
          >
            <Input
              v-model="form.nb_antennes"
              name="nb_antennes"
              type="number"
              placeholder="5"
              @blur="validate('nb_antennes')"
            />
          </FormControl>
          <FormControl
            label="Nombre salariés"
            html-for="nb_employees"
            required
            :error="errors.nb_employees"
          >
            <Input
              v-model="form.nb_employees"
              type="number"
              name="nb_employees"
              placeholder="5"
              @blur="validate('nb_employees')"
            />
          </FormControl>
          <FormControl
            label="Nombre bénévoles"
            html-for="nb_volunteers"
            required
            :error="errors.nb_volunteers"
          >
            <Input
              v-model="form.nb_volunteers"
              name="nb_volunteers"
              type="number"
              placeholder="5"
              @blur="validate('nb_volunteers')"
            />
          </FormControl>
        </div>
        <FormControl
          label="À propos de votre demande"
          html-for="description"
          required
          :error="errors.description"
          class="lg:col-span-2"
        >
          <Textarea
            v-model="form.description"
            name="description"
            placeholder="Précisez votre besoin en matière de bénévoles ou de missions"
            @blur="validate('description')"
          />
        </FormControl>
        <div class="lg:col-span-2">
          <Button
            type="submit"
            variant="green"
            :loading="loading"
            full
            size="xl"
            @click="onSubmit"
          >
            Demander la gestion d'un réseau
          </Button>
        </div>
      </form>

      <div v-else class="flex flex-col space-y-4 text-center text-lg text-gray-500 font-semibold">
        <p class="text-5xl">
          👍
        </p>
        <p>
          Votre demande de gestion d’un réseau associatif a bien été envoyée à
          l’administration de JeVeuxAider.gouv.fr
        </p>
        <p>
          Vous serez prochainement contacté par notre équipe pour la suite de
          l’aventure.
        </p>
      </div>
    </div>

    <div v-if="sent === false" class="container mt-4 text-center">
      <nuxt-link to="/inscription/responsable" class="text-sm text-white hover:underline">
        Retour
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { string, object, number } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  data () {
    return {
      loading: false,
      sent: false,
      form: {},
      formSchema: object({
        name: string().min(3).required(),
        first_name: string().min(3).required(),
        last_name: string().min(2).required(),
        phone: string().min(10).matches(/^[+|\s|\d]*$/, 'Ce format est incorrect').required(),
        email: string().required().email(),
        nb_antennes: number().required(),
        nb_employees: number().required(),
        nb_volunteers: number().required()
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
          this.loading = true
          await this.$axios.post('/reseaux/lead', this.form)
          this.sent = true
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
