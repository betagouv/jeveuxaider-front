<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
      <BaseDrawer
        :is-open="showDrawerFormRole"
        form-id="form-roles"
        submit-label="Ajouter le rôle"
        @close="showDrawerFormRole = false"
      >
        <template #title>
          <BaseHeading :level="3"> Ajouter un rôle </BaseHeading>
        </template>
        <FormProfileRole :profile="profile" @submited="handleSubmitRole" />
      </BaseDrawer>
      <BaseAlertDialog
        theme="danger"
        title="Supprimer le rôle"
        :text="`<strong>${profile.full_name}</strong> n'aura plus le rôle <strong>${$filters.label(
          roleSelected?.name,
          'roles'
        )} (${roleSelected?.pivot_model.name})</strong>`"
        :is-open="showAlertRoleDeleted"
        @confirm="handleConfirmDeleteRole"
        @cancel="showAlertRoleDeleted = false"
      />
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations personnelles </BaseHeading>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BaseFormControl class="md:col-span-2" label="Photo de profil" html-for="avatar">
              <BaseImageCrop
                :default-value="form.avatar"
                :preview-width="100"
                :min-width="200"
                @add="addFiles({ files: [$event], collection: 'profile__avatar' })"
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </BaseFormControl>
            <BaseFormControl
              label="Prénom"
              html-for="first_name"
              required
              :error="errors.first_name"
            >
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
            <BaseFormControl label="Code postal" html-for="zip" required :error="errors.zip">
              <BaseInput
                v-model="form.zip"
                name="zip"
                type="tel"
                maxlength="5"
                placeholder="56000"
                @blur="validate('zip')"
              />
            </BaseFormControl>
            <BaseFormControl
              label="Téléphone mobile"
              html-for="mobile"
              required
              :error="errors.mobile"
            >
              <BaseInput
                v-model="form.mobile"
                name="mobile"
                type="tel"
                maxlength="14"
                placeholder="0612345678"
                @blur="validate('mobile')"
              />
            </BaseFormControl>
            <BaseFormControl label="Téléphone fixe" html-for="phone" :error="errors.phone">
              <BaseInput
                v-model="form.phone"
                name="phone"
                type="tel"
                maxlength="14"
                placeholder="0123456789"
                @blur="validate('phone')"
              />
            </BaseFormControl>
            <BaseFormControl
              label="Date de naissance"
              html-for="birthday"
              required
              :error="errors.birthday"
            >
              <BaseInputDate v-model="form.birthday" required name="birthday" />
            </BaseFormControl>
            <BaseFormControl label="Profession" html-for="type" required :error="errors.type">
              <BaseSelectAdvanced
                v-model="form.type"
                name="type"
                placeholder="Sélectionnez votre profession"
                :options="$labels.profile_type"
                @blur="validate('type')"
              />
            </BaseFormControl>
            <BaseFormControl
              label="Décrivez vos motivations"
              html-for="description"
              class="md:col-span-2"
            >
              <BaseTextarea
                v-model="form.description"
                name="description"
                placeholder="Vos motivations en quelques mots..."
              />
            </BaseFormControl>
          </div>
        </BaseBox>
        <transition name="fade">
          <BaseBox v-if="canViewScAndCej" class="space-y-8">
            <BaseHeading :level="3" class="mb-8">
              Service Civique & Contrat d'Engagement Jeune
            </BaseHeading>
            <div class="flex lg:space-x-8">
              <img
                src="/images/service_civique.png"
                srcset="/images/service_civique.png, /images/service_civique@2x.png 2x"
                alt="Service Civique"
                title="Service Civique"
                class="hidden lg:block h-10 flex-none w-[75px] object-contain object-left"
                data-not-lazy
              />
              <BaseToggle
                v-model="form.service_civique"
                class="flex-1"
                label="Êtes-vous volontaire en Service Civique ?"
                :description="
                  form.service_civique
                    ? 'Oui, je suis volontaire'
                    : 'Non, je ne suis pas volontaire'
                "
              />
            </div>
            <BaseFormControl
              v-if="form.service_civique"
              label="Date de début de votre Service Civique"
              html-for="service_civique_completion_date"
              :error="errors.service_civique_completion_date"
            >
              <BaseInputDate
                v-model="form.service_civique_completion_date"
                active-picker="MONTH"
                required
                name="service_civique_completion_date"
              />
            </BaseFormControl>
            <div class="flex lg:space-x-8">
              <img
                src="/images/cej.png"
                srcset="/images/cej.png, /images/cej@2x.png 2x"
                alt="Contrat d'Engagement Jeune"
                title="Contrat d'Engagement Jeune"
                class="hidden lg:block h-10 flex-none w-[75px] object-contain object-left"
                data-not-lazy
              />
              <BaseToggle
                v-model="form.cej"
                class="flex-1"
                label="Êtes-vous engagé Contrat d'Engagement Jeune ?"
                :description="
                  form.cej
                    ? 'Oui, je suis en Contrat d\'Engagement Jeune'
                    : 'Non, je ne suis pas en Contrat d\'Engagement Jeune'
                "
              />
            </div>
            <BaseFormControl
              v-if="form.cej"
              label="Email de votre conseiller CEJ"
              html-for="cej_email_adviser"
              :error="errors.cej_email_adviser"
              required
            >
              <template #afterLabel>
                <span
                  v-tooltip="{
                    content:
                      'En renseignant l’adresse de votre conseiller, celui-ci sera automatiquement tenu au courant des missions sur lesquelles vous proposez votre aide.',
                  }"
                  class="p-1 cursor-help group"
                >
                  <RiErrorWarningLine
                    class="inline h-4 w-4 text-gray-400 group-hover:text-gray-900 mb-[2px]"
                  />
                </span>
              </template>
              <BaseInput
                v-model="form.cej_email_adviser"
                name="cej_email_adviser"
                placeholder="jean.dupont@gmail.com"
                @blur="validate('cej_email_adviser')"
              />
            </BaseFormControl>
          </BaseBox>
        </transition>
        <BaseBox v-if="$stores.auth.contextRole === 'admin'">
          <BaseHeading :level="3" class="mb-8"> Tags </BaseHeading>
          <BaseCheckboxGroup
            v-model="form.tags"
            name="tags"
            variant="button"
            is-model
            :options="tags"
          />
        </BaseBox>
      </div>
      <div class="md:col-span-2 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Disponibilités </BaseHeading>

          <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="handleSubmit">
            <BaseToggle
              v-model="form.is_visible"
              :label="form.is_visible ? 'Visible des organisations' : 'Invisible des organisations'"
              description="Souhaitez-vous que les organisations de la plateforme vous proposent des missions ?"
            />
            <BaseFormControl
              label="Sélectionnez vos disponibilités"
              html-for="disponibilities"
              required
              :error="errors.disponibilities"
            >
              <BaseCheckboxGroup
                v-model="form.disponibilities"
                name="disponibilities"
                variant="button"
                :options="$labels.disponibilities"
              />
            </BaseFormControl>
            <div>
              <BaseFormLabel html-for="frequence" required>
                À quelle fréquence souhaitez-vous vous engager&nbsp;?
              </BaseFormLabel>
              <div class="flex flex-col sm:flex-row gap-2 lg:gap-4 sm:items-center">
                <div class="lg:w-1/2">
                  <BaseSelectAdvanced
                    v-model="form.commitment__duration"
                    name="commitment__duration"
                    placeholder="Durée"
                    :options="$labels.duration"
                  />
                  <BaseFormError v-if="errors.commitment__duration">
                    {{ errors.commitment__time_period }}
                  </BaseFormError>
                </div>
                <div class="flex-none text-sm">par</div>
                <div class="lg:w-1/2">
                  <BaseSelectAdvanced
                    v-model="form.commitment__time_period"
                    name="commitment__time_period"
                    placeholder="Fréquence"
                    :options="$labels.time_period"
                  />
                  <BaseFormError v-if="errors.commitment__time_period">
                    {{ errors.commitment__time_period }}
                  </BaseFormError>
                </div>
              </div>
            </div>
          </form>
        </BaseBox>
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Activités </BaseHeading>
          <div v-if="form.activities.length" class="mt-6">
            <div class="flex flex-wrap gap-2">
              <BaseTagFormItem
                v-for="item in activitiesOptions2.filter((activityOption) => {
                  return form.activities.find((e) => e.id == activityOption.id)
                })"
                :key="item.id"
                :tag="item"
                @removed="onRemovedActivityItem"
              >
                {{ item.name }}
              </BaseTagFormItem>
            </div>
          </div>
          <BaseDrawer
            :is-open="showDrawerActivity"
            form-id="form-activities"
            submit-label="Enregistrer"
            @close="showDrawerActivity = false"
          >
            <template #title>
              <BaseHeading :level="3"> Ajouter une activité </BaseHeading>
            </template>
            <form id="form-activities" class="mt-8" @submit.prevent="handleSubmit">
              <BaseFormControl
                label="Renseignez les activités qui vous intéressent"
                html-for="activites"
              >
                <div class="bg-white border">
                  <BaseDisclosure :default-open="true" class="py-4 border-b px-4">
                    <template #button="{ isOpen }">
                      <div class="flex font-semibold text-sm items-center justify-between group">
                        <div class="flex-shrink-0 group-hover:text-gray-600">
                          Activités les plus populaires
                        </div>
                        <RiSubstractLine
                          v-if="isOpen"
                          class="text-gray-800 group-hover:text-gray-600 h-7 w-7 flex-shrink-0 mt-0.5"
                        />
                        <RiAddLine
                          v-else
                          class="text-gray-800 group-hover:text-gray-600 h-7 w-7 flex-shrink-0 mt-0.5"
                        />
                      </div>
                    </template>
                    <div class="mt-3 space-y-3">
                      <BaseCheckboxGroup
                        :key="'popular-' + form.activities.join(',')"
                        v-model="form.activities"
                        name="activites"
                        variant="button"
                        :options="activitiesOptions.filter((activity) => activity.popular)"
                        is-model
                      />
                    </div>
                  </BaseDisclosure>
                  <BaseDisclosure
                    v-for="(domain, i) in domainsOptions"
                    :key="domain"
                    class="py-4 px-4"
                    :class="[{ 'border-b': i < domainsOptions.length - 1 }]"
                  >
                    <template #button="{ isOpen }">
                      <div class="flex font-semibold text-sm items-center justify-between group">
                        <div class="flex-shrink-0 group-hover:text-gray-600">
                          {{ domain }}
                        </div>
                        <RiSubstractLine
                          v-if="isOpen"
                          class="text-gray-800 group-hover:text-gray-600 h-7 w-7 flex-shrink-0 mt-0.5"
                        />
                        <RiAddLine
                          v-else
                          class="text-gray-800 group-hover:text-gray-600 h-7 w-7 flex-shrink-0 mt-0.5"
                        />
                      </div>
                    </template>
                    <div class="mt-3 space-y-3">
                      <BaseCheckboxGroup
                        :key="domain + form.activities.join(',')"
                        v-model="form.activities"
                        name="activites"
                        variant="button"
                        :options="
                          activitiesOptions.filter((activity) => activity.domain.includes(domain))
                        "
                        is-model
                      />
                    </div>
                  </BaseDisclosure>
                </div>
              </BaseFormControl>
            </form>
          </BaseDrawer>
          <BaseButton
            size="sm"
            :class="[{ 'mt-6': form.activities.length > 0 }]"
            variant="white"
            icon="RiAddLine"
            @click.native="showDrawerActivity = true"
          >
            Ajouter une activité
          </BaseButton>
        </BaseBox>
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Compétences </BaseHeading>

          <BaseFormControl label="Renseignez vos compétences" html-for="algolia-search">
            <AlgoliaInputAutocomplete
              index="termsIndex"
              attribute-right-label="group"
              :search-parameters="{
                facetFilters: [['vocabulary_name:Skills']],
                hitsPerPage: 6,
              }"
              @selected="handleSelectItems"
            />
          </BaseFormControl>

          <div v-if="form.skills.length" class="mt-6">
            <div class="flex flex-wrap gap-2">
              <BaseTagFormItem
                v-for="item in form.skills"
                :key="item.id"
                :tag="item"
                @removed="onRemovedTagItem"
              >
                {{ item.name }}
              </BaseTagFormItem>
            </div>
          </div>
        </BaseBox>
        <BaseBox v-if="$stores.auth.contextRole === 'admin'">
          <BaseHeading :level="3" class="mb-8"> Rôles </BaseHeading>

          <div v-if="profile.user?.roles" class="grid grid-cols-1 divide-y -my-4">
            <div
              v-for="role in profile.user.roles"
              :key="role.id"
              class="flex items-center justify-between h-16"
              :class="[role.name != 'admin' && 'group hover:cursor-pointer']"
              @click="handleClickRole(role)"
            >
              <div class="text-gray-700 font-medium mr-4 truncate group-hover:underline">
                <template v-if="role.pivot_model">
                  <span v-if="role.pivot_model.number">{{ role.pivot_model.number }} -</span>
                  {{ role.pivot_model.name }}
                </template>
                <template v-else-if="role.name == 'admin'"> Modérateur </template>
              </div>
              <div class="group-hover:hidden">
                <BaseBadge color="gray-light" size="xxs">
                  {{ $filters.label(role.name, 'roles') }}
                </BaseBadge>
              </div>
              <div
                class="text-jva-red-500 text-sm font-medium group-hover:block hidden w-[140px] text-right"
              >
                Supprimer ?
              </div>
            </div>
          </div>
          <BaseButton
            size="sm"
            class="mb-8 mt-6"
            variant="white"
            icon="RiAddLine"
            @click.native="showDrawerFormRole = true"
          >
            Ajouter un rôle
          </BaseButton>
          <div class="gap-8 grid grid-cols-1">
            <BaseToggle
              v-model="form.can_export_profiles"
              :description="form.can_export_profiles ? 'Oui' : 'Non'"
              label="Export des utilisateurs"
            />
          </div>
        </BaseBox>
      </div>
    </div>
    <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
      <div class="flex flex-col gap-2 flex-shrink-0 items-center justify-center">
        <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit()">
          Enregistrer
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, array, date } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import Emailable from '@/mixins/emailable.client'
import activitiesOptions from '@/assets/activities.json'
import FormProfileRole from '@/components/form/FormProfileRole.vue'

export default defineNuxtComponent({
  components: {
    FormProfileRole,
  },
  mixins: [FormErrors, FormUploads, Emailable],
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: _cloneDeep(this.profile),
      formSchema: object({
        first_name: string().required('Un prénom est requis'),
        last_name: string().required('Un nom est requis'),
        birthday: date()
          .test('test-birthday-required', "Une date d'anniversaire est requise", (birthday) => {
            return ['admin'].includes(this.$stores.auth.contextRole) || birthday
          })
          .nullable()
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        type: string()
          .nullable()
          .test('test-profession-required', 'Une profession est requise', (type) => {
            return ['admin'].includes(this.$stores.auth.contextRole) || type
          }),
        mobile: string()
          .nullable()
          .min(10, 'Le mobile doit contenir au moins 10 caractères')
          .matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect')
          .test('test-mobile-required', 'Un mobile est requis', (mobile) => {
            return ['admin'].includes(this.$stores.auth.contextRole) || mobile
          })
          .transform((v) => (v === '' ? null : v)),
        phone: string()
          .nullable()
          .min(10, 'Le téléphone doit contenir au moins 10 caractères')
          .matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect')
          .transform((v) => (v === '' ? null : v)),
        zip: string()
          .nullable()
          .min(5, 'Le format du code postal est incorrect')
          .test('test-zip-required', 'Un code postal est requis', (zip) => {
            return ['admin'].includes(this.$stores.auth.contextRole) || zip
          }),
        disponibilities: array()
          .transform((v) => (!v ? [] : v))
          .test(
            'test-disponibilities-required',
            'Merci de sélectionner au moins 1 disponibilité',
            (disponibilities) => {
              return (
                ['admin'].includes(this.$stores.auth.contextRole) || disponibilities.length >= 1
              )
            }
          ),
        cej_email_adviser: string()
          .nullable()
          .email("Le format de l'email est incorrect")
          .when('cej', {
            is: true,
            then: (schema) => schema.required("L'email de votre conseiller CEJ est obligatoire"),
          }),
        service_civique_completion_date: date()
          .nullable()
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
      }),
      autocompleteReseauxOptions: [],
      activitiesOptions,
      activitiesOptions2: activitiesOptions.map((activity) => {
        return { id: activity.key, name: activity.label }
      }),
      showDrawerActivity: false,
      showDrawerFormRole: false,
      showAlertRoleDeleted: false,
      roleSelected: null,
      domainsOptions: [
        'Art et culture pour tous',
        'Bénévolat de compétences',
        'Éducation pour tous',
        'Mémoire et citoyenneté',
        'Prévention et protection',
        'Protection de la nature',
        'Solidarité et insertion',
        'Sport pour tous',
      ],
      tags: [],
    }
  },
  computed: {
    canViewScAndCej() {
      if (this.form.birthday) {
        const userAge = this.$dayjs().diff(this.$dayjs(this.form.birthday), 'year')
        return userAge >= 16 && userAge <= 30
      }
      return false
    },
  },
  watch: {
    'form.cej'(val) {
      if (!val) {
        this.form.cej_email_adviser = null
      }
    },
  },
  async mounted() {
    const terms = await apiFetch('/vocabularies/profiles/terms', {
      params: { pagination: 50 },
    })
    this.tags = terms.data.map((tag) => {
      return { key: tag.id, label: tag.name }
    })
  },
  methods: {
    handleSelectItems(item) {
      this.form.skills = [...this.form.skills, item]
    },
    onRemovedTagItem(item) {
      this.form.skills = this.form.skills.filter((skill) => skill.id !== item.id)
    },
    onRemovedActivityItem(item) {
      this.form.activities = this.form.activities.filter((activity) => activity.id !== item.id)
    },
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.email !== this.profile.email) {
            const isEmailValid = await this.emailableValidation()
            if (!isEmailValid) {
              this.errors.email = 'Votre adresse mail comporte une erreur'
              this.$toast.error('Votre adresse mail comporte une erreur')
              return
            }
          }

          await this.uploadFiles('profile', this.form.id)

          if (this.form.id === this.$stores.auth.user.profile.id) {
            await this.$stores.auth.updateProfile({
              id: this.$stores.auth.profile.id,
              ...this.form,
            })
            this.$router.push('/profile')
          } else {
            await apiFetch(`/profiles/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
            this.$router.push(`/admin/utilisateurs/${this.form.id}`)
          }
          this.$toast.success('Modifications enregistrées')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async onFetchReseauxSuggestions(value) {
      const reseaux = await apiFetch('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 6,
        },
      })
      this.autocompleteReseauxOptions = reseaux.data
    },
    handleClickRole(role) {
      switch (role.name) {
        case 'responsable':
          window.open(
            `${window.location.origin}/admin/organisations/${role.pivot.rolable_id}#membres`
          )
          break
        case 'responsable_territoire':
          window.open(
            `${window.location.origin}/admin/contenus/territoires/${role.pivot.rolable_id}#responsables`
          )
          break
        case 'tete_de_reseau':
          window.open(
            `${window.location.origin}/admin/contenus/reseaux/${role.pivot.rolable_id}#responsables`
          )
          break
        case 'referent':
        case 'referent_regional':
          this.roleSelected = role
          this.showAlertRoleDeleted = true
          break
      }
    },
    async handleConfirmDeleteRole() {
      await apiFetch(`/users/${this.profile.user_id}/roles/${this.roleSelected.id}`, {
        method: 'DELETE',
      })
      this.$emit('role-changed')
      this.showAlertRoleDeleted = false
    },
    handleSubmitRole() {
      this.$emit('role-changed')
      this.showDrawerFormRole = false
    },
  },
})
</script>
