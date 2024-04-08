<template>
  <div>
    <BaseAlertDialog
      v-if="form.profile"
      icon="RiErrorWarningLine"
      title="Êtes-vous sûrs ?"
      :is-open="showAlert"
      button-label="Oui, je confirme"
      @confirm="handleConfirmSubmit()"
      @cancel="showAlert = false"
    >
      Vous êtes sur le point de réinitialiser le rôle de « {{ form.profile.full_name }} #{{
        form.profile.id
      }} ».
    </BaseAlertDialog>

    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Support', to: '/support' },
            { text: 'Actions' },
            { text: 'Réinitialisation du rôle d\'un utilisateur' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <div class="flex flex-col gap-8">
      <BaseSectionHeading
        title="Réinitialisation du rôle d'un utilisateur"
        secondary-title-bottom="Permet de relier des utilisateurs à leur bon rôle"
      >
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Exécuter le script
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>
      <BaseBox>
        <div class="space-y-10">
          <BaseFormControl
            html-for="profile"
            label="Sélectionnez l'utilisateur"
            required
            :error="errors.profile"
          >
            <BaseInputAutocomplete
              :value="$route.query['filter[search]']"
              icon="RiSearchLine"
              name="autocomplete"
              placeholder="Recherche par mots clés..."
              :options="autocompleteOptionsProfiles"
              show-key-in-options
              attribute-label="full_name"
              class="max-w-xl"
              @fetch-suggestions="onFetchSuggestionsProfiles"
              @selected="handleSelectedprofile($event)"
              @cleared="handleRemoveProfile"
            />
          </BaseFormControl>

          <div v-if="form.profile" class="p-6 bg-gray-50 mt-10">
            <div class="text-gray-700 font-semibold">
              {{ form.profile.full_name }}
              <span class="text-sm text-gray-400">#{{ form.profile.id }}</span>
            </div>
            <div class="text-gray-500">
              {{ form.profile.email }}
            </div>
            <div class="text-gray-500 italic">
              {{ form.profile.user.context_role }}
              {{ form.profile.user.contextable_type }}
              {{ form.profile.user.contextable_id }}
            </div>
          </div>
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<script>
import { object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
  },
  mixins: [FormErrors],
  setup() {
    definePageMeta({
      layout: 'support',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      loading: false,
      showAlert: false,
      form: {},
      formSchema: object({
        profile: object().nullable().required(),
      }),
      autocompleteOptionsProfiles: [],
    }
  },
  methods: {
    handleRemoveProfile() {
      this.form.profile = null
    },
    handleSelectedprofile(event) {
      if (event) {
        this.form.profile = event
        this.validate('profile')
      }
    },
    async onFetchSuggestionsProfiles(value) {
      const res = await apiFetch('/profiles', {
        params: {
          include: 'user',
          'filter[search]': value,
          pagination: 7,
        },
      })
      this.autocompleteOptionsProfiles = res.data
    },
    async handleSubmit() {
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.showAlert = true
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {})
    },
    async handleConfirmSubmit() {
      this.showAlert = false
      this.loading = true
      await apiFetch('/scripts/user-reset-context-role', {
        method: 'POST',
        body: this.form,
      })
        .then((res) => {
          this.$toast.success(
            `${this.form.profile.full_name} a désormais le rôle ${res.data.context_role} ${res.data.contextable_type} ${res.data.contextable_id}`
          )
          this.form.profile = null
        })
        .catch((err) => {
          console.log('err', err)
        })
      this.loading = false
    },
  },
})
</script>

<style></style>
