<template>
  <div>
    <div class="text-center mb-6">
      <div
        class="text-gray-900 font-extrabold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-3"
      >
        Rejoignez le mouvement&nbsp;!
      </div>
      <div class="text-gray-500 font-semibold text-lg lg:text-xl">
        Créez rapidement votre compte Bénévole
      </div>
    </div>
    <div class="mx-auto max-w-sm">
      <el-form
        ref="registerForm"
        :model="form"
        :rules="rules"
        label-position="top"
        class="mb-0 form-register-steps"
        :hide-required-asterisk="true"
        @submit.prevent.native="onSubmit"
      >
        <el-form-item label="Email" prop="email" class="!mb-5">
          <el-input
            v-model.trim="form.email"
            placeholder="prenom.nom@email.fr"
            disabled
            suffix-icon="el-icon-check"
          />
        </el-form-item>
        <el-form-item label="Mot de passe" prop="password" class="!mb-5">
          <el-input
            v-model="form.password"
            placeholder="Mot de passe"
            label="Mot de passe"
            show-password
            autocomplete="new-password"
          />
        </el-form-item>
        <div class="flex mb-5 space-x-4">
          <el-form-item label="Prénom" prop="first_name" class="!flex-1 !mb-0">
            <el-input v-model="form.first_name" placeholder="Prénom" />
          </el-form-item>
          <el-form-item label="Nom" prop="last_name" class="!flex-1 !mb-0">
            <el-input v-model="form.last_name" placeholder="Nom" />
          </el-form-item>
        </div>
        <div class="flex mb-5 space-x-4">
          <el-form-item
            label="Téléphone mobile"
            prop="mobile"
            class="!flex-1 !mb-0"
          >
            <el-input v-model="form.mobile" placeholder="Téléphone mobile" />
          </el-form-item>
          <el-form-item
            label="Téléphone fixe"
            prop="phone"
            class="!flex-1 !mb-0"
          >
            <el-input v-model="form.phone" placeholder="Téléphone fixe" />
          </el-form-item>
        </div>
        <div class="flex mb-5 space-x-4">
          <el-form-item label="Code postal" prop="zip" class="!flex-1 !mb-0">
            <el-input v-model="form.zip" placeholder="Code postal" />
          </el-form-item>
          <el-form-item
            label="Date de naissance"
            prop="birthday"
            class="!flex-1 !mb-0"
          >
            <el-input
              v-model="form.birthday"
              v-mask="'##/##/####'"
              autocomplete="new-password"
              label="Date de naissance"
              placeholder="JJ/MM/AAAA"
            />
          </el-form-item>
        </div>

        <el-form-item label="Profession" prop="type" class="!mb-5">
          <el-select
            v-model="form.type"
            placeholder="Sélectionnez votre profession"
          >
            <el-option
              v-for="item in $store.getters.taxonomies.profile_types.terms"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-button
          :loading="loading"
          class="!font-bold !max-w-sm !mx-auto !w-full !flex !items-center !justify-center !px-5 !py-3 !border !border-transparent !text-xl !leading-6 !rounded-full !text-white !bg-jva-green hover:!bg-[#0e9f6e] focus:!outline-none focus:!ring !transition !mt-8"
          @click.prevent="onSubmit"
        >
          S'inscrire
        </el-button>
      </el-form>

      <div class="mt-6 mb-3">
        <p class="text-xs leading-5 text-gray-500 text-center">
          <span>En m'inscrivant j'accepte la</span>
          <nuxt-link
            to="/politique-de-confidentialite"
            target="_blank"
            class="font-medium text-gray-900 hover:underline"
          >
            politique de confidentialité
          </nuxt-link>
          <br>
          <span>et la</span>
          <nuxt-link
            to="/charte-reserve-civique"
            target="_blank"
            class="font-medium text-gray-900 hover:underline"
          >
            charte de JeVeuxAider.gouv.fr
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FormMixin from '@/mixins/Form'

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export default {
  name: 'SoftGateRegister',
  mixins: [FormMixin],
  props: {
    datas: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.datas },
      rules: {
        email: [
          {
            type: 'email',
            message: "Format de l'email incorrect",
            trigger: 'blur'
          },
          {
            required: true,
            message: 'Email obligatoire',
            trigger: 'blur'
          }
        ],
        first_name: [
          {
            required: true,
            message: 'Prénom obligatoire',
            trigger: 'blur'
          }
        ],
        last_name: [
          {
            required: true,
            message: 'Nom obligatoire',
            trigger: 'blur'
          }
        ],
        birthday: [
          {
            required: true,
            message: 'Date obligatoire',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: 'Champs obligatoire',
            trigger: 'blur'
          }
        ],
        zip: [
          {
            required: true,
            message: 'Code postal obligatoire',
            trigger: 'blur'
          },
          {
            pattern: /^\d+$/,
            message: 'Format du code postal incorrect',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 6,
            message: 'Format erroné',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: 'Mobile obligatoire',
            trigger: 'blur'
          },
          {
            pattern: /^[+|\s|\d]*$/,
            message: 'Format mobile incorrect',
            trigger: 'blur'
          },
          {
            min: 10,
            message: 'Format incorrect',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Mot de passe obligatoire',
            trigger: 'change'
          },
          {
            min: 8,
            message: 'Au moins 8 caractères',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {},
  methods: {
    onSubmit () {
      this.$refs.registerForm.validate((valid, fields) => {
        if (valid) {
          this.loading = true
          const birthdayValidFormat = dayjs(
            this.form.birthday,
            'DD/MM/YYYY'
          ).format('YYYY-MM-DD')
          this.$store
            .dispatch('auth/registerVolontaire', {
              email: this.form.email,
              password: this.form.password,
              first_name: this.form.first_name,
              last_name: this.form.last_name,
              mobile: this.form.mobile,
              birthday: birthdayValidFormat,
              zip: this.form.zip,
              service_civique: this.form.service_civique,
              type: this.form.type,
              utm_source: this.$cookies.get('utm_source')
            })
            .then(() => {
              window.plausible &&
                window.plausible('Inscription depuis une page mission')
              this.loading = false

              if (
                this.$store.getters.user
                  .nbTodayParticipationsOnPendingValidation >= 3
              ) {
                this.$emit('too-many-participations')
              } else {
                this.$emit('next')
              }

              window.plausible &&
                window.plausible('Soft Gate - Étape 2 - Inscription')
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.showErrors(fields)
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
::placeholder {
  font-weight: 500;
}
</style>
