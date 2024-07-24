<template>
  <div class="relative">
    <ClientOnly>
      <Teleport to="#teleport-sidebar">
        <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <BaseSteps :steps="steps" />
      </Teleport>
    </ClientOnly>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        Racontez-nous
        <span class="font-bold">{{ form.name }}</span> !
      </h1>
    </div>
    <div class="max-w-2xl mx-auto">
      <div class="px-8 py-6 bg-white text-black text-3xl font-extrabold leading-9 text-center">
        Votre organisation en quelques mots
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <BaseFormControl
            v-if="!['Collectivité', 'Organisation publique'].includes(form.statut_juridique)"
            label="À propos de votre organisation"
            label-suffix="(200 caractères min)"
            html-for="description"
            required
            :error="errors.description"
          >
            <BaseFormHelperText>
              Cette description doit expliquer votre raison d'être et susciter le désir d'engagement
              des milliers de bénévoles découvrant votre organisation sur la plateforme
              JeVeuxAider.gouv.fr. Cette description apparaîtra sur votre future page vitrine et sur
              l'ensemble de vos missions de bénévolat publiées sur la plateforme.
            </BaseFormHelperText>
            <BaseTextarea
              v-model="form.description"
              name="name"
              placeholder="Dites-nous tout à propos de votre organisation..."
              @blur="validate('description')"
            />
          </BaseFormControl>
          <BaseFormControl label="Email public" html-for="email" :error="errors.email">
            <BaseInput
              v-model="form.email"
              name="email"
              type="email"
              placeholder="contact@mon-organisation.fr"
              @blur="validate('email')"
            />
          </BaseFormControl>
          <BaseFormControl label="Téléphone public" html-for="phone" :error="errors.phone">
            <BaseInput
              v-model="form.phone"
              name="phone"
              type="tel"
              maxlength="14"
              placeholder="0123456789"
              @blur="validate('phone')"
            />
          </BaseFormControl>
          <BaseFormControl label="Site internet" html-for="website" :error="errors.website">
            <BaseInput
              v-model="form.website"
              name="website"
              placeholder="https://www.votresite.fr"
              @blur="validate('website')"
            />
          </BaseFormControl>
          <BaseFormControl label="Page Facebook" html-for="facebook" :error="errors.facebook">
            <BaseInput
              v-model="form.facebook"
              name="facebook"
              placeholder="https://facebook.com/votrepage"
              @blur="validate('facebook')"
            />
          </BaseFormControl>
          <BaseFormControl label="Page Twitter" html-for="twitter" :error="errors.twitter">
            <BaseInput
              v-model="form.twitter"
              name="twitter"
              placeholder="https://twitter.com/votrepage"
              @blur="validate('twitter')"
            />
          </BaseFormControl>
          <BaseFormControl label="Page Instagram" html-for="instagram" :error="errors.instagram">
            <BaseInput
              v-model="form.instagram"
              name="instagram"
              placeholder="https://instagram.com/votrepage"
              @blur="validate('instagram')"
            />
          </BaseFormControl>
          <BaseFormControl
            v-if="
              !form.territoire &&
              !['Organisation publique', 'Organisation privée'].includes(form.statut_juridique)
            "
            label="URL vers la plateforme de dons"
            html-for="donation"
            :error="errors.donation"
          >
            <BaseInput
              v-model="form.donation"
              name="donation"
              placeholder="URL de votre page Helloasso, Microdon, Ulule, etc..."
              @blur="validate('donation')"
            />
          </BaseFormControl>
          <DsfrButton size="lg" class="w-full" :loading="loading" @click.native.prevent="onSubmit">
            Continuer
          </DsfrButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  async setup() {
    definePageMeta({
      layout: 'register-steps',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()

    if (!$stores.auth.currentRole || $stores.auth.currentRole.contextable_type !== 'structure') {
      return showError({ statusCode: 403 })
    }

    const organisation = await apiFetch(`/structures/${$stores.auth.currentRole.contextable_id}`)

    return {
      form: toRef(organisation),
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    steps() {
      return [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/responsable/step/profile',
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/responsable/step/profile',
        },
        {
          name: "Informations sur l'organisation",
          status: 'complete',
          href: '/inscription/responsable/step/organisation',
        },
        {
          name: "Quelques mots sur l'organisation",
          status: 'current',
        },
        this.form.statut_juridique === 'Collectivité'
          ? {
              name: 'Informations sur la collectivité territoriale',
              status: 'upcoming',
            }
          : {
              name: 'Votre organisation en images',
              status: 'upcoming',
            },
      ]
    },
    formSchema() {
      let schema = object({
        email: string().nullable().email("Le format de l'email public est incorrect"),
        website: string().nullable().url(),
        facebook: string().nullable().url(),
        twitter: string().nullable().url(),
        instagram: string().nullable().url(),
        donation: string().nullable().url(),
        phone: string()
          .nullable()
          .min(10, 'Le téléphone doit contenir au moins 10 caractères')
          .matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect')
          .transform((v) => (v === '' ? null : v)),
      })

      if (!['Collectivité', 'Organisation publique'].includes(this.form.statut_juridique)) {
        schema = schema.concat(
          object({
            description: string()
              .nullable()
              .min(200, 'La description doit contenir au moins 200 caractères')
              .required('Une description est requise'),
          })
        )
      }

      return schema
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
          await apiFetch(`/structures/${this.form.id}`, {
            method: 'PUT',
            body: this.form,
          })
          this.$plausible.trackEvent(
            'Inscription responsable - Étape 4 - Quelques mots sur l’organisation'
          )
          if (this.form.statut_juridique === 'Collectivité') {
            this.$router.push('/inscription/responsable/step/collectivite')
          } else {
            this.$router.push('/inscription/responsable/step/organisation-images')
          }
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
