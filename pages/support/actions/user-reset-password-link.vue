<template>
  <div>
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Support', to: '/support' },
            { text: 'Actions' },
            { text: 'Réinitialisation mot de passe' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <div class="flex flex-col gap-8">
      <BaseSectionHeading
        title="Réinitialisation mot de passe"
        secondary-title-bottom="Permet de générer un lien"
      >
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Générer le lien
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>
      <BaseBox>
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
            @cleared="resetPasswordLink = null"
          />
        </BaseFormControl>

        <div v-if="resetPasswordLink" class="p-6 bg-gray-50 mt-10">
          <div class="text-gray-700 font-semibold">
            {{ form.profile.full_name }}
            <span class="text-sm text-gray-400">#{{ form.profile.id }}</span>
          </div>
          <div class="text-gray-500">
            {{ form.profile.email }}
          </div>
          <div class="mt-4 bg-white px-4 py-3 flex items-center justify-between gap-10">
            <div class="truncate text-gray-500 italic">
              {{ resetPasswordLink }}
            </div>
            <RiFileCopyLine
              class="flex-none h-5 cursor-pointer hover:text-jva-blue-500 fill-current"
              @click.native="handleCopy"
            />
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
      resetPasswordLink: null,
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
          this.generateLink()
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {})
    },
    async generateLink() {
      this.loading = true
      await apiFetch('/support/actions/generate-password-reset-link', {
        method: 'POST',
        body: this.form.profile,
      })
        .then((res) => {
          this.resetPasswordLink = res
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleCopy() {
      navigator.clipboard.writeText(this.resetPasswordLink).then((r) => {
        this.$toast.success('Lien copié dans le presse papier')
      })
    },
  },
})
</script>

<style></style>
