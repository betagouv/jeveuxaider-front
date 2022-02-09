<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
    <div class="lg:col-span-3 space-y-12">
      <Box>
        <Heading :level="3" class="mb-8">
          Informations personnels
        </Heading>
        <div class="gap-8 mb-8 grid grid-cols-1 lg:grid-cols-2">
          <FormControl label="Photo de profil" html-for="avatar" class="col-span-2">
            <ImageCrop
              :default-value="form.avatar"
              :preview-width="100"
              :min-width="200"
              @add="addFiles({ files: [$event], attribute: 'avatar' })"
              @delete="deleteFile($event, 0)"
              @crop="onManipulationsChange($event, 0)"
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
              placeholder="0612345678"
              @blur="validate('mobile')"
            />
          </FormControl>
          <FormControl label="Téléphone fixe" html-for="phone" :error="errors.phone">
            <Input
              v-model="form.phone"
              name="phone"
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
            <Input
              v-model="form.birthday"
              name="birthday"
              placeholder="jj/mm/aaaa"
              type="date"
              hide-picker
              @blur="validate('birthday')"
            />
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

          <FormControl label="Choisissez vos domaines de prédilection" html-for="domaines" required :error="errors.domaines" class="col-span-2">
            <CheckboxGroup
              v-model="form.domaines"
              name="domaines"
              variant="button"
              :options="$labels.domaines"
            />
          </FormControl>
          <FormControl label="Décrivez vos motivations" html-for="description" class="col-span-2">
            <Textarea v-model="form.description" name="description" placeholder="Vos motivations en quelques mots..." />
          </FormControl>
        </div>
      </Box>
    </div>
    <div class="lg:col-span-2 space-y-12">
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
            <div class="flex flex-col lg:flex-row gap-2 lg:gap-8 lg:items-center lg:justify-center">
              <div class="lg:w-1/2">
                <SelectAdvanced
                  v-model="form.commitment__duration"
                  name="commitment__duration"
                  placeholder="Sélectionnez une durée"
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
                  class="lg:w-1/2"
                  name="commitment__time_period"
                  placeholder="Sélectionnez une durée"
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
              {{ item.name.fr }}
            </TagFormItem>
          </div>
        </div>
      </Box>
    </div>
  </div>
</template>

<script>
import { string, object, array, date } from 'yup'
import _ from 'lodash'
import AlgoliaSkillsInput from '@/components/section/search/AlgoliaSkillsSearch'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'

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
      form: _.cloneDeep(this.profile),
      formSchema: object({
        first_name: string().min(3).required('Un prénom est requis'),
        last_name: string().min(2).required('Un nom est requis'),
        birthday: date().required("Une date d'anniversaire est requise").nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        type: string().nullable().required('Une profession est requise'),
        mobile: string().min(10, 'Le mobile doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect').required('Un mobile est requis'),
        phone: string().nullable().min(10, 'Le téléphone doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect').transform(v => v === '' ? null : v),
        zip: string().min(5, 'Le format du code postal est incorrect').required('Un code postal est requis'),
        domaines: array().min(1, 'Merci de sélectionner au moins 1 domaine d\'action'),
        disponibilities: array().min(1, 'Merci de sélectionner au moins 1 disponibilité')
      })
    }
  },
  methods: {
    handleSelectItems (item) {
      this.$set(this.form, 'skills', [...this.form.skills, item])
    },
    onRemovedTagItem (item) {
      this.form.skills = this.form.skills.filter(skill => skill.id !== item.id)
    },
    handleSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          if (this.loading) {
            return
          }
          this.loading = true

          this.uploadFiles('profile', this.form.id, 'profiles')
          this.$emit('submited', this.form)
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
