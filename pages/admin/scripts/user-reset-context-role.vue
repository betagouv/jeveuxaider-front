<template>
  <div class="">
    <AlertDialog
      v-if="form.profile"
      theme="danger"
      title="Êtes-vous sûrs ?"
      :text="`Vous êtes sur le point de réinitialiser le rôle de « ${form.profile.full_name} #${form.profile.id} ».`"
      :is-open="showAlert"
      button-label="Oui, je confirme"
      @confirm="handleConfirmSubmit()"
      @cancel="showAlert = false"
    />

    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Administration', to: '/admin' },
          { text: 'Scripts' },
          { text: 'Réinitialisation du rôle d\'un utilisateur' }
        ]"
      />
    </portal>

    <div class="flex flex-col gap-8">
      <SectionHeading title="Réinitialisation du rôle d'un utilisateur" secondary-title-bottom="Permet de relier des utilisateurs à leur bon rôle">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Exécuter le script
            </Button>
          </div>
        </template>
      </SectionHeading>
      <Box>
        <div class="space-y-10">
          <FormControl
            html-for="profile"
            label="Sélectionnez l'utilisateur à réinitialiser"
            required
            :error="errors.profile"
          >
            <InputAutocomplete
              v-if="!form.profile"
              :value="$route.query['filter[search]']"
              icon="SearchIcon"
              name="autocomplete"
              placeholder="Recherche par mots clés..."
              :options="autocompleteOptionsProfiles"
              clear-after-selected
              show-key-in-options
              attribute-label="full_name"
              class="max-w-xl"
              @fetch-suggestions="onFetchSuggestionsProfiles"
              @selected="handleSelectedprofile($event)"
            />
            <div v-else class="flex">
              <TagFormItem
                :tag="form.profile"
                @removed="handleRemoveProfile"
              >
                <div class="truncate">
                  #{{ form.profile.id }} {{ form.profile.full_name }}
                </div>
                <div class="text-gray-500 text-xs font-normal">
                  <div>
                    {{ form.profile.email }}
                  </div>
                  <div>
                    {{ form.profile.user.context_role }} {{ form.profile.user.contextable_type }} {{ form.profile.user.contextable_id }}
                  </div>
                </div>
              </TagFormItem>
            </div>
          </FormControl>
        </div>
      </Box>
    </div>
  </div>
</template>

<script>
import { object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },
  mixins: [FormErrors],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      showAlert: false,
      form: {
      },
      formSchema: object({
        profile: object().nullable().required()
      }),
      autocompleteOptionsProfiles: []
    }
  },
  methods: {
    handleRemoveProfile () {
      this.form.profile = null
    },
    handleSelectedprofile (event) {
      if (event) {
        this.$set(this.form, 'profile', event)
        this.validate('profile')
      }
    },
    async onFetchSuggestionsProfiles (value) {
      const res = await this.$axios.get('/profiles', {
        params: {
          include: 'user',
          'filter[search]': value,
          pagination: 7
        }
      })
      this.autocompleteOptionsProfiles = res.data.data
    },
    async handleSubmit () {
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.showAlert = true
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
        })
    },
    async handleConfirmSubmit () {
      this.showAlert = false
      this.loading = true
      await this.$axios.post('/scripts/user-reset-context-role', this.form).then((res) => {
        this.$toast.success(`${this.form.profile.full_name} a désormais le rôle ${res.data.context_role} ${res.data.contextable_type} ${res.data.contextable_id}`)
        this.form.profile = null
      }).catch((err) => {
        console.log('err', err)
      })
      this.loading = false
    }
  }
}
</script>

<style>

</style>
