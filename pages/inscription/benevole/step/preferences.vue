<template>
  <div class="relative">
    <client-only>
      <portal
        to="sidebar"
      >
        <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <Steps
          :steps="steps"
        />
      </portal>
    </client-only>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        Bienvenue
        <span class="font-bold">{{ $store.getters.profile.first_name }}</span> !
      </h1>
      <div class="text-lg font-medium">
        Nous sommes ravis de vous compter parmi nos bénévoles.
      </div>
    </div>
    <div class="max-w-xl mx-auto">
      <div
        class="px-8 py-8 bg-white text-black text-3xl font-extrabold leading-9 text-center rounded-t-lg"
      >
        Vos préférences
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <FormControl label="Quelles activités de bénévolat pourraient vous intéresser ?" html-for="activites">
            <div class="bg-white border rounded-md">
              <Disclosure :default-open="true" class="py-4 border-b px-4">
                <template #button="{ isOpen }">
                  <div class="flex font-semibold text-sm items-center justify-between group">
                    <div class="flex-shrink-0 group-hover:text-gray-600">
                      Activités les plus populaires
                    </div>
                    <MinusIcon v-if="isOpen" class="text-gray-800 group-hover:text-gray-600 h-7 w-7 flex-shrink-0 mt-0.5" />
                    <PlusIcon v-else class="text-gray-800 group-hover:text-gray-600 h-7 w-7 flex-shrink-0 mt-0.5" />
                  </div>
                </template>
                <div class="mt-3 space-y-3">
                  <CheckboxGroup
                    :key="'popular-' + form.activities.join(',')"
                    v-model="form.activities"
                    name="activites"
                    variant="button"
                    :options="activitiesOptions.filter(activity => activity.popular)"
                    is-model
                  />
                </div>
              </Disclosure>
              <Disclosure v-for="(domain, i) in domainsOptions" :key="domain" class="py-4 px-4" :class="[{'border-b': i < domainsOptions.length - 1}]">
                <template #button="{ isOpen }">
                  <div class="flex font-semibold text-sm items-center justify-between group">
                    <div class="flex-shrink-0 group-hover:text-gray-600">
                      {{ domain }}
                    </div>
                    <MinusIcon v-if="isOpen" class="text-gray-800 group-hover:text-gray-600 h-7 w-7 flex-shrink-0 mt-0.5" />
                    <PlusIcon v-else class="text-gray-800 group-hover:text-gray-600 h-7 w-7 flex-shrink-0 mt-0.5" />
                  </div>
                </template>
                <div class="mt-3 space-y-3">
                  <CheckboxGroup
                    :key="domain + form.activities.join(',')"
                    v-model="form.activities"
                    name="activites"
                    variant="button"
                    :options="activitiesOptions.filter(activity => activity.domain.includes(domain))"
                    is-model
                  />
                </div>
              </Disclosure>
            </div>
          </FormControl>
          <FormControl label="Décrivez vos motivations" html-for="description">
            <Textarea v-model="form.description" name="description" placeholder="Vos motivations en quelques mots..." />
          </FormControl>
          <Button
            type="submit"
            size="xl"
            variant="green"
            full
            :loading="loading"
            @click="onSubmit"
          >
            Continuer
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { object } from 'yup'
import { cloneDeep } from 'lodash'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import activitiesOptions from '@/assets/activities.json'

export default {
  mixins: [FormErrors, FormUploads],
  layout: 'register-steps',
  data () {
    return {
      loading: false,
      steps: [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/benevole/step/profile'
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/benevole/step/profile'
        },
        {
          name: 'Vos préférences',
          status: 'current'
        },
        {
          name: 'Vos disponibilités',
          status: 'upcoming'
        },
        {
          name: 'Vos compétences',
          status: 'upcoming'
        }
      ],
      form: cloneDeep(this.$store.state.auth.user.profile),
      formSchema: object({
      }),
      activitiesOptions,
      domainsOptions: ['Bénévolat de compétences', 'Solidarité et insertion', 'Éducation pour tous', 'Protection de la nature', 'Art et culture pour tous', 'Sport pour tous', 'Prévention et protection', 'Mémoire et citoyenneté']
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
          await this.$store.dispatch('auth/updateProfile', {
            id: this.$store.getters.profile.id,
            ...this.form
          })
          window.plausible &&
            window.plausible('Inscription bénévole - Étape 3 - Préférences')
          this.$router.push('/inscription/benevole/step/disponibilites')
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
