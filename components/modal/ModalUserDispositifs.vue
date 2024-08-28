<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Ajouter un dispositif"
        :prevent-click-outside="true"
        @close="onClose"
      >
        {{ selectedItem }}
        <div v-if="!selectedItem" class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            class="p-4 flex flex-col items-center border-2 border-[DDDDDD] hover:border-jva-blue-500 hover:bg-[#F5F5FE] cursor-pointer"
            @click="onItemClick('service_civique')"
          >
            <img
              src="/images/logo-service-civique.png"
              srcset="/images/logo-service-civique.png, /images/logo-service-civique@2x.png 2x"
              alt="Service Civique"
              title="Service Civique"
              class="hidden lg:block flex-none h-[50px] w-auto object-contain object-left"
              data-not-lazy
            />
            <div class="mt-2 font-medium">Service Civique</div>
          </div>
          <div
            class="p-4 flex flex-col items-center border-2 border-[DDDDDD] hover:border-jva-blue-500 hover:bg-[#F5F5FE] cursor-pointer"
            @click="onItemClick('cej')"
          >
            <img
              src="/images/logo-cej.png"
              srcset="/images/logo-cej.png, /images/logo-cej@2x.png 2x"
              alt="Contrat d'Engagement Jeune"
              title="Contrat d'Engagement Jeune"
              class="hidden lg:block flex-none h-[50px] w-auto object-contain object-left"
              data-not-lazy
            />
            <div class="mt-2 font-medium">CEJ</div>
          </div>
          <div
            class="p-4 flex flex-col items-center border-2 border-[DDDDDD] hover:border-jva-blue-500 hover:bg-[#F5F5FE] cursor-pointer"
            @click="onItemClick('ft')"
          >
            <img
              src="/images/logo-france-travail.svg"
              alt="France Travail"
              title="France Travail"
              class="hidden lg:block flex-none h-[50px] w-auto object-contain object-left"
              data-not-lazy
            />
            <div class="mt-2 font-medium">France travail</div>
          </div>
        </div>
        <div v-else class="">
          <template v-if="selectedItem === 'service_civique'">
            <DsfrFormControl
              label="Date de début de votre Service Civique"
              html-for="service_civique_completion_date"
              :error="errors.service_civique_completion_date"
              required
            >
              <DsfrInput
                v-model="form.service_civique_completion_date"
                required
                type="date"
                name="service_civique_completion_date"
                @blur="validate('service_civique_completion_date')"
              />
            </DsfrFormControl>
          </template>
          <template v-if="selectedItem === 'cej'">
            <DsfrFormControl
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
                    class="inline h-4 w-4 fill-current text-cool-gray-400 group-hover:text-gray-900 mb-[2px] transition"
                  />
                </span>
              </template>
              <DsfrInput
                v-model="form.cej_email_adviser"
                required
                type="email"
                name="cej_email_adviser"
                placeholder="…@…"
                @blur="validate('cej_email_adviser')"
              />
            </DsfrFormControl>
          </template>
          <template v-if="selectedItem === 'ft'">
            <DsfrFormControl
              v-if="form.ft"
              label="Email de votre conseiller France Travail"
              html-for="ft_email_adviser"
              :error="errors.ft_email_adviser"
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
                    class="inline h-4 w-4 fill-current text-cool-gray-400 group-hover:text-gray-900 mb-[2px] transition"
                  />
                </span>
              </template>
              <DsfrInput
                v-model="form.ft_email_adviser"
                required
                type="email"
                name="ft_email_adviser"
                placeholder="…@…"
                @blur="validate('ft_email_adviser')"
              />
            </DsfrFormControl>
          </template>
        </div>

        <template #footer>
          <template v-if="selectedItem">
            <!-- <DsfrButton type="secondary" @click="$emit('update:selectedItem', null)">
              Retour
            </DsfrButton> -->
            <DsfrButton v-if="selectedItem" @click="onSubmit"> Enregistrer </DsfrButton>
          </template>
          <template v-else>
            <!-- <DsfrButton type="secondary" @click="$emit('cancel')"> Annuler </DsfrButton> -->
          </template>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { string, object, date } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  components: {},
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: Object,
      default: () => {},
    },
    selectedItem: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      form: {
        ..._cloneDeep(this.profile),
      },
      formSchema: object({
        ft_email_adviser: string()
          .nullable()
          .email("Le format de l'email est incorrect")
          .when('ft', {
            is: true,
            then: (schema) =>
              schema
                .required("L'email de votre conseiller France Travail est obligatoire")
                .test(
                  'email-extension',
                  'Le mail doit être celui de votre conseiller. Il ne doit pas être une adresse personnelle.',
                  (value) => {
                    if (!value) {
                      return true
                    }
                    const forbiddenExtensions = [
                      'gmail.com',
                      'icloud.com',
                      'outlook.com',
                      'orange.fr',
                      'wanadoo.fr',
                      'hotmail.com',
                      'hotmail.fr',
                      'free.fr',
                      'sfr.fr',
                      'laposte.net',
                    ]
                    const emailParts = value.split('@')
                    const emailExtension = emailParts[1]
                    return !forbiddenExtensions.includes(emailExtension)
                  }
                )
                .test(
                  'no-current-user-email',
                  "Vous devez saisir l'email de votre conseiller France Travail et non le vôtre",
                  (value) => {
                    if (!value || !this.$stores.auth.isLogged) {
                      return true
                    }
                    return value !== this.$stores.auth.profile?.email
                  }
                ),
          }),
        cej_email_adviser: string()
          .nullable()
          .email("Le format de l'email est incorrect")
          .when('cej', {
            is: true,
            then: (schema) =>
              schema
                .required("L'email de votre conseiller CEJ est obligatoire")
                .test(
                  'email-extension',
                  'Le mail doit être celui de votre conseiller. Il ne doit pas être une adresse personnelle.',
                  (value) => {
                    if (!value) {
                      return true
                    }
                    const forbiddenExtensions = [
                      'gmail.com',
                      'icloud.com',
                      'outlook.com',
                      'orange.fr',
                      'wanadoo.fr',
                      'hotmail.com',
                      'hotmail.fr',
                      'free.fr',
                      'sfr.fr',
                      'laposte.net',
                    ]
                    const emailParts = value.split('@')
                    const emailExtension = emailParts[1]
                    return !forbiddenExtensions.includes(emailExtension)
                  }
                )
                .test(
                  'no-current-user-email',
                  "Vous devez saisir l'email de votre conseiller CEJ et non le vôtre",
                  (value) => {
                    if (!value || !this.$stores.auth.isLogged) {
                      return true
                    }
                    return value !== this.$stores.auth.profile?.email
                  }
                ),
          }),
        service_civique_completion_date: date()
          .typeError('La date indiquée est invalide')
          .nullable()
          .transform((curr, orig) => (orig === '' ? null : curr))
          .when('service_civique', {
            is: true,
            then: (schema) => schema.required('La date de début de service civique est incorrecte'),
          }),
      }),
    }
  },
  methods: {
    onItemClick(item) {
      this.$emit('update:selectedItem', item)
    },
    onSubmit() {
      this.$emit('save', this.form)
      this.onClose()
    },
    onClose() {
      this.$emit('update:selectedItem', null)
      this.$emit('cancel')
    },
  },
})
</script>
