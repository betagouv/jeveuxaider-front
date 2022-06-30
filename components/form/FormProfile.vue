<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
      <div class="lg:col-span-3 space-y-12">
        <Box>
          <Heading :level="3" class="mb-8">
            Informations personnelles
          </Heading>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormControl class="md:col-span-2" label="Photo de profil" html-for="avatar">
              <ImageCrop
                :default-value="form.avatar"
                :preview-width="100"
                :min-width="200"
                @add="addFiles({ files: [$event], collection: 'profile__avatar' })"
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
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
              label="Code postal"
              html-for="zip"
              required
              :error="errors.zip"
            >
              <Input
                v-model="form.zip"
                name="zip"
                type="tel"
                maxlength="5"
                placeholder="56000"
                @blur="validate('zip')"
              />
            </FormControl>
            <FormControl
              label="Téléphone mobile"
              html-for="mobile"
              required
              :error="errors.mobile"
            >
              <Input
                v-model="form.mobile"
                name="mobile"
                type="tel"
                maxlength="14"
                placeholder="0612345678"
                @blur="validate('mobile')"
              />
            </FormControl>
            <FormControl label="Téléphone fixe" html-for="phone" :error="errors.phone">
              <Input
                v-model="form.phone"
                name="phone"
                type="tel"
                maxlength="14"
                placeholder="0123456789"
                @blur="validate('phone')"
              />
            </FormControl>
            <FormControl
              label="Date de naissance"
              html-for="birthday"
              required
              :error="errors.birthday"
            >
              <InputDate v-model="form.birthday" required name="birthday" />
            </FormControl>
            <FormControl label="Profession" html-for="type" required :error="errors.type">
              <SelectAdvanced
                v-model="form.type"
                name="type"
                placeholder="Sélectionnez votre profession"
                :options="$labels.profile_type"
                @blur="validate('type')"
              />
            </FormControl>
            <FormControl label="Décrivez vos motivations" html-for="description" class="md:col-span-2">
              <Textarea v-model="form.description" name="description" placeholder="Vos motivations en quelques mots..." />
            </FormControl>
          </div>
        </Box>
        <Box>
          <Heading :level="3" class="mb-8">
            Service Civique
          </Heading>
          <div class="flex space-x-8">
            <img
              src="@/assets/images/service-civique-logo.png"
              alt="Service Civique"
              title="Service Civique"
              class="hidden lg:block h-10"
              data-not-lazy
            >
            <Toggle
              v-model="form.service_civique"
              class="flex-1"
              label="Etes-vous volontaire en Service Civique ?"
              :description="form.service_civique ? 'Oui, je suis volontaire' : 'Non, je ne suis pas volontaire'"
            />
          </div>
        </Box>
      </div>
      <div class="md:col-span-2 space-y-12">
        <Box>
          <Heading :level="3" class="mb-8">
            Disponibilités
          </Heading>

          <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="handleSubmit">
            <Toggle
              v-model="form.is_visible"
              :label="form.is_visible ? 'Visible des organisations' : 'Invisible des organisations'"
              description="Souhaitez-vous que les organisations de la plateforme vous proposent des missions ?"
            />
            <FormControl
              label="Sélectionnez vos disponibilités"
              html-for="disponibilities"
              required
              :error="errors.disponibilities"
            >
              <CheckboxGroup
                v-model="form.disponibilities"
                name="disponibilities"
                variant="button"
                :options="$labels.disponibilities"
              />
            </FormControl>
            <div>
              <FormLabel html-for="frequence" required>
                À quelle fréquence souhaitez-vous vous engager&nbsp;?
              </FormLabel>
              <div class="flex flex-col sm:flex-row gap-2 lg:gap-4 sm:items-center">
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
                <div class="flex-none text-sm">
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
          </form>
        </Box>
        <Box>
          <Heading :level="3" class="mb-8">
            Activités
          </Heading>
          <div v-if="form.activities.length" class="mt-6">
            <div class="flex flex-wrap gap-2">
              <TagFormItem
                v-for="item in activitiesOptions2.filter(activityOption => { return form.activities.find(e => e.id == activityOption.id)} )"
                :key="item.id"
                :tag="item"
                @removed="onRemovedActivityItem"
              >
                {{ item.name }}
              </TagFormItem>
            </div>
          </div>
          <Drawer :is-open="showDrawerActivity" form-id="form-activities" submit-label="Enregistrer" @close="showDrawerActivity = false">
            <template #title>
              <Heading :level="3">
                Ajouter une activité
              </Heading>
            </template>
            <form id="form-activities" class="mt-8" @submit.prevent="handleSubmit">
              <FormControl label="Renseignez les activités qui vous intéressent" html-for="activites">
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
            </form>
          </Drawer>
          <Button size="sm" :class="[{'mt-6': form.activities.length > 0}]" variant="white" @click.native="showDrawerActivity = true">
            <PlusIcon class="mr-2" />Ajouter une activité
          </Button>
        </Box>
        <Box>
          <Heading :level="3" class="mb-8">
            Compétences
          </Heading>

          <FormControl label="Renseignez vos compétences" html-for="algolia-search">
            <AlgoliaSkillsInput
              :items="form.skills"
              @add-item="handleSelectItems"
            />
          </FormControl>

          <div v-if="form.skills.length" class="mt-6">
            <div class="flex flex-wrap gap-2">
              <TagFormItem
                v-for="item in form.skills"
                :key="item.id"
                :tag="item"
                @removed="onRemovedTagItem"
              >
                {{ item.name }}
              </TagFormItem>
            </div>
          </div>
        </Box>
        <Box v-if="$store.getters.contextRole === 'admin'">
          <Heading :level="3" class="mb-8">
            Rôles
          </Heading>

          <div class="gap-8 grid grid-cols-1">
            <FormControl
              label="Tête de réseau"
              html-for="reseau_id"
            >
              <InputAutocomplete
                name="autocomplete"
                label="Autocomplete"
                placeholder="Choisissez un réseau"
                :options="autocompleteReseauxOptions"
                :value="form.reseau ? form.reseau.name : null"
                @selected="handleSelectedReseau"
                @fetch-suggestions="onFetchReseauxSuggestions"
              />
            </FormControl>

            <FormControl label="Référent départemental" html-for="referent_department">
              <Combobox
                v-model="form.referent_department"
                name="referent_department"
                placeholder="Sélectionnez un département"
                :options="$labels.departments.map((item) => { return {key: item.key, label: `${item.key} - ${item.label}`}})"
                clearable
              />
            </FormControl>

            <FormControl label="Référent régional" html-for="referent_region">
              <Combobox
                v-model="form.referent_region"
                name="referent_region"
                placeholder="Sélectionnez une région"
                :options="$labels.regions"
                clearable
              />
            </FormControl>

            <Toggle
              v-model="form.can_export_profiles"
              :description="form.can_export_profiles ? 'Oui' : 'Non'"
              label="Export des utilisateurs"
            />
          </div>
        </Box>
      </div>
    </div>
    <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
      <div class="flex flex-col gap-2 flex-shrink-0 items-center justify-center">
        <Button size="xl" variant="green" :loading="loading" @click.native="handleSubmit()">
          Enregistrer
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, array, date } from 'yup'
import { cloneDeep } from 'lodash'
import AlgoliaSkillsInput from '@/components/section/search/AlgoliaSkillsSearch'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import activitiesOptions from '@/assets/activities.json'

export default {
  components: {
    AlgoliaSkillsInput
  },
  mixins: [FormErrors, FormUploads],
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
        first_name: string().min(3).required('Un prénom est requis'),
        last_name: string().required('Un nom est requis'),
        birthday: date().required("Une date d'anniversaire est requise").nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        type: string().nullable().required('Une profession est requise'),
        mobile: string().nullable().min(10, 'Le mobile doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect').required('Un mobile est requis'),
        phone: string().nullable().min(10, 'Le téléphone doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect').transform(v => v === '' ? null : v),
        zip: string().nullable().min(5, 'Le format du code postal est incorrect').required('Un code postal est requis'),
        disponibilities: array().transform(v => (!v ? [] : v)).min(1, 'Merci de sélectionner au moins 1 disponibilité').required('df')
      }),
      autocompleteReseauxOptions: [],
      activitiesOptions,
      activitiesOptions2: activitiesOptions.map((activity) => { return { id: activity.key, name: activity.label } }),
      showDrawerActivity: false,
      domainsOptions: ['Bénévolat de compétences', 'Solidarité et insertion', 'Éducation pour tous', 'Protection de la nature', 'Art et culture pour tous', 'Sport pour tous', 'Prévention et protection', 'Mémoire et citoyenneté']
    }
  },
  methods: {
    handleSelectItems (item) {
      this.$set(this.form, 'skills', [...this.form.skills, item])
    },
    onRemovedTagItem (item) {
      this.form.skills = this.form.skills.filter(skill => skill.id !== item.id)
    },
    onRemovedActivityItem (item) {
      this.form.activities = this.form.activities.filter(activity => activity.id !== item.id)
    },
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.uploadFiles('profile', this.form.id)
          if (this.form.id === this.$store.state.auth.user.profile.id) {
            await this.$store.dispatch('auth/updateProfile', {
              id: this.$store.getters.profile.id,
              ...this.form
            })
            // this.loading = false
            this.$router.push('/profile')
          } else {
            await this.$axios.put(`/profiles/${this.form.id}`, this.form)
            this.$router.push(`/admin/utilisateurs/${this.form.id}`)
          }
          this.$toast.success('Modifications enregistrées')
          // this.$emit('submited', this.form)
        })
        .catch((errors) => {
          this.setErrors(errors)
          // throw new Error('error')
        })
        .finally(() => {
          this.loading = false
        })
    },
    async onFetchReseauxSuggestions (value) {
      const res = await this.$axios.get('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 6
        }
      })
      this.autocompleteReseauxOptions = res.data.data
    },
    handleSelectedReseau (reseau) {
      this.form.tete_de_reseau_id = reseau ? reseau.id : null
    }
  }
}
</script>
