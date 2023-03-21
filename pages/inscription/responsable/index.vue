<template>
  <div class="relative bg-[#081992]">
    <portal to="body-end">
      <Modal
        v-scroll-lock="showModalConfirmOrga"
        :is-open="showModalConfirmOrga"
        :prevent-click-outside="true"
        :overflow-hidden="false"
        background-overlay="bg-jva-blue-500"
        width-class="sm:max-w-xl"
        hide-footer
        @close="showModalConfirmOrga = false"
      >
        <div v-if="modalConfirmOrgaStep == 1" class="flex flex-col justify-center items-center">
          <div class="text-5xl text-center">
            ☝
          </div>
          <p class="text-lg font-semibold text-center my-6 leading-7">
            Vous êtes sur le point d'inscrire une nouvelle organisation.<br>
            Merci de confirmer que votre organisation
          </p>
          <ul class="text-gray-600 space-y-3 text-left">
            <li class="flex items-start">
              <CheckCircleSolidIcon class="flex-none inline-block w-auto h-5 text-jva-green-500 mr-2 mt-[2px]" />dispose d'une personnalité morale
            </li>
            <li class="flex items-start">
              <CheckCircleSolidIcon class="flex-none inline-block w-auto h-5 text-jva-green-500 mr-2 mt-[2px]" />n'est pas à but lucratif
            </li>
            <li class="flex items-start">
              <CheckCircleSolidIcon class="flex-none inline-block w-auto h-5 text-jva-green-500 mr-2 mt-[2px]" />n'est pas politique, cultuelle ou syndicale.
            </li>
          </ul>
          <div class="mt-8 space-y-3">
            <DsfrButton class="w-full" @click.native="handleConfirmChoixOrga">
              Je confirme ces éléments
            </DsfrButton>
            <DsfrButton type="secondary" class="w-full" @click.native="modalConfirmOrgaStep = 2">
              Mon organisation ne remplit pas ces conditions
            </DsfrButton>
          </div>
        </div>
        <div v-else-if="modalConfirmOrgaStep == 2" class="flex flex-col justify-center items-center">
          <div class="text-5xl text-center">
            😕
          </div>
          <p class="text-lg font-semibold text-center my-6 leading-7">
            Votre organisation ne répond malheureusement pas aux conditions énoncées dans la
            <span class="whitespace-nowrap">
              <Link
                to="/charte-reserve-civique"
                class="text-jva-blue-500"
              >Charte de la Réserve Civique</Link>.
            </span>
          </p>
          <p class="text-gray-600 text-center">
            Si votre organisation n'a pas encore de personnalité morale, vous pouvez facilement
            <Link to="https://www.service-public.fr/particuliers/vosdroits/R1757" class="text-jva-blue-500" :is-external="true">
              créer une association en ligne
            </Link>.
          </p>
          <p class="text-gray-600 text-center mt-4">
            Si votre organisation a une <span class="font-bold">dimension lucrative</span> ou bien est une <span class="font-bold">organisation politique, culturelle</span> ou bien <span class="font-bold">syndicale</span>, vous pouvez proposer à vos associations partenaires de mettre en ligne des missions sur notre plateforme.
          </p>
          <div class="mt-6 w-full">
            <DsfrButton class="w-full" @click.native="handleDeniedChoixOrga">
              Fermer
            </DsfrButton>
          </div>
        </div>
      </Modal>
    </portal>
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
      alt="JeVeuxAider.gouv.fr"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x, /images/bg-jva.jpg"
      data-not-lazy
    >
    <div class="relative z-10 py-12 lg:py-24 px-6">
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-5xl text-white !leading-tight tracking-tight font-bold"
          v-html="currentStep.title"
        />
        <div
          class="text-xl md:text-3xl text-white mt-2 tracking-tight"
          v-html="currentStep.subtitle"
        />
      </div>

      <div
        v-if="currentStep.key == 'choix_orga_type'"
        class="max-w-5xl flex flex-col gap-8 flex-wrap items-center justify-center my-12 md:flex-row mx-auto"
      >
        <BoxItem
          tabindex="0"
          icon="💪"
          title="Une<br><strong>association</strong>"
          subtitle="Trouver des bénévoles<br>pour vos missions"
          class="md:h-[235px]"
          @click.native="handleChooseOrgaType('Association')"
          @keypress.native.enter="handleChooseOrgaType('Association')"
        />
        <BoxItem
          tabindex="0"
          icon="🏫️"
          title="Une <strong>collectivité territoriale</strong>"
          subtitle="Mairies, CCAS, EPCI et tout établissement public local"
          class="md:h-[235px]"
          @click.native="handleChooseOrgaType('Collectivité')"
          @keypress.native.enter="handleChooseOrgaType('Collectivité')"
        />
        <BoxItem
          tabindex="0"
          icon="🚀"
          title="Une<br><strong>tête de réseau</strong>"
          subtitle="Gérer vos différentes antennes, <br>délégations, associations locales ..."
          class="md:h-[235px]"
          @click.native="handleChooseOrgaType('Tête de réseau')"
          @keypress.native.enter="handleChooseOrgaType('Tête de réseau')"
        />
        <BoxItem
          tabindex="0"
          icon="🏢"
          title="Autre organisation<br><strong>publique</strong>"
          subtitle="Ehpad public, <br>services de l’Etat ..."
          class="md:h-[235px]"
          @click.native="handleChooseOrgaType('Organisation publique')"
          @keypress.native.enter="handleChooseOrgaType('Organisation publique')"
        />
        <BoxItem
          tabindex="0"
          icon="🏩"
          title="<strong>Organisation privée</strong> à but non lucratif"
          subtitle="Établissement de santé privé d'intérêt collectif, Ehpad privé,
            fondation, ESUS"
          class="md:h-[235px]"
          @click.native="handleChooseOrgaType('Organisation privée')"
          @keypress.native.enter="handleChooseOrgaType('Organisation privée')"
        />
        <BoxItem
          tabindex="0"
          icon="🤔"
          title=" Vous êtes<br><strong>perdu ?</strong>"
          subtitle="Notre équipe se fera une joie<br>de vous guider :)"
          class="md:h-[235px]"
          @click.native="handleChooseOrgaType('Crisp')"
          @keypress.native.enter="handleChooseOrgaType('Crisp')"
        />
      </div>

      <div v-else-if="currentStep.key == 'choix_orga_nom'" class="mt-4">
        <template v-if="!userHasRoleResponsable">
          <form
            id="organisation"
            class="max-w-2xl mx-auto bg-gray-100 p-6 sm:p-12"
            @submit.prevent="onSubmitChooseName"
          >
            <div
              v-if="['Association', 'Collectivité'].includes($route.query.orga_type)"
              class="mb-8 py-4 px-6 border border-gray-400 text-gray-500 md:flex md:space-x-4"
            >
              <InformationCircleSolidIcon class="h-5 w-5 inline text-gray-400 translate-y-[-2px] md:translate-y-0 flex-none" />
              <span class="text-sm md:text-base">
                <template v-if="$route.query.orga_type === 'Association'">Vous êtes une association indépendante ou une association antenne d’un réseau associatif. Vous êtes reconnue association loi 1901 ou bien association de droit local.</template>
                <template v-else-if="$route.query.orga_type === 'Collectivité'">Une collectivité territoriale est une autorité publique distincte de l'État. Il peut s’agir d’une commune, d’un CCAS, d’un département ou bien d’une région.</template>
              </span>
            </div>

            <FormControl html-for="name" :label="$route.query.orga_type === 'Collectivité' ? 'Nom de votre collectivité territoriale' : $route.query.orga_type === 'Association' ? 'Nom de votre association' : 'Nom de votre organisation' ">
              <ApiEngagementAssociationsSearch
                v-if="$route.query.orga_type === 'Association'"
                v-model="form.structure.name"
                placeholder="Indiquez le nom en minuscules - Ex : La Fourmilière"
                :show-add-button="!orgaExist"
                :loading-add-button="loading"
                @selected="onStructureApiSelected"
                @change="orgaExist = null"
                @added="onSubmitChooseName"
              />
              <Input
                v-else
                v-model="form.structure.name"
                name="name"
                :placeholder="
                  $route.query.orga_type === 'Collectivité'
                    ? 'Indiquer le nom en minuscules - Ex : Mairie de Lyon'
                    : 'Renseignez le nom de votre organisation'
                "
              />
            </FormControl>

            <template v-if="!orgaExist && $route.query.orga_type !== 'Association'">
              <DsfrButton
                class="mt-4 w-full"
                form="inscription"
                size="lg"
                @click.native.prevent="onSubmitChooseName"
              >
                Continuer
              </DsfrButton>
            </template>
            <div v-if="orgaExist" class="text-center mt-4">
              <p class="mb-0 font-bold">
                L'organisation
                <span class="text-jva-blue-500">{{ orgaExist.structure_name }}</span>
                est déjà inscrite sur la plateforme.
              </p>
              <p class="text-gray-500 text-sm">
                <template v-if="orgaExist.responsable_fullname">
                  Veuillez vous rapprocher de la personne suivante pour intégrer
                  l'équipe :<br>
                  <span class="text-black">{{
                    orgaExist.responsable_fullname
                  }}</span>
                </template>
                <template v-else>
                  Merci de contacter notre support pour plus de détails.
                </template>
              </p>
            </div>
          </form>

          <div class="container mt-4 text-center">
            <Link to="/inscription/responsable" class="text-sm text-white active:!bg-transparent">
              Retour
            </Link>
          </div>
        </template>

        <div v-else class="max-w-2xl mx-auto bg-gray-100 p-6 sm:p-12 rounded-2xl">
          <div class="mb-6">
            Vous êtes déjà responsable de l'organisation
            <span class="font-bold">{{ userHasRoleResponsable.label }}</span>
          </div>
          <DsfrButton
            size="lg"
            class="w-full"
            @click="$router.push('/inscription/responsable/step/profile')"
          >
            Continuer
          </DsfrButton>
        </div>
      </div>

      <div v-else-if="currentStep.key == 'form_utilisateur'" class="mt-4">
        <div class="form-register-steps max-w-xl mx-auto bg-gray-100 p-6 sm:p-12">
          <form id="inscription" class="gap-8 mb-8 grid grid-cols-1 lg:grid-cols-2" @submit.prevent="onSubmitRegisterResponsableForm">
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
                type="email"
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
            <FormControl
              label="Date de naissance"
              html-for="birthday"
              required
              :error="errors.birthday"
            >
              <InputDate v-model="form.birthday" required name="birthday" />
            </FormControl>
            <FormControl
              label="Mot de passe"
              html-for="password"
              required
              :error="errors.password"
            >
              <Input
                v-model="form.password"
                name="password"
                placeholder="Votre mot de passe"
                type="password"
                @blur="validate('password')"
              />
            </FormControl>
            <FormControl
              label="Confirmation"
              html-for="password_confirmation"
              required
              :error="errors.password_confirmation"
            >
              <Input
                v-model="form.password_confirmation"
                name="password_confirmation"
                placeholder="Votre mot de passe"
                type="password"
                @blur="validate('password_confirmation')"
              />
            </FormControl>
          </form>

          <DsfrButton
            size="lg"
            form="inscription"
            class="w-full"
            :loading="loading"
            @click.native.prevent="onSubmitRegisterResponsableForm"
          >
            <template v-if="$route.query.orga_type === 'Collectivité'">
              J'inscris ma collectivité territoriale
            </template>
            <template v-else-if="$route.query.orga_type === 'Association'">
              J'inscris mon association
            </template>
            <template v-else>
              J'inscris mon organisation
            </template>
          </DsfrButton>

          <div class="mt-4 text-center text-gray-800 text-sm">
            En m'inscrivant j'accepte
            <!-- eslint-disable -->
            <Link to="/politique-de-confidentialite"
            >la politique de confidentialité</Link>
            <!-- eslint-enable -->
          </div>
        </div>
      </div>

      <div
        v-else-if="currentStep.key == 'form_reseau'"
        class="mt-4"
      >
        <FormLeadReseau />
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, ref, date } from 'yup'
import BoxItem from '@/components/section/inscription/BoxItem'
import ApiEngagementAssociationsSearch from '@/components/section/search/ApiEngagementAssociationsSearch'
import FormErrors from '@/mixins/form/errors'
import Emailable from '@/mixins/emailable.client'
import FormLeadReseau from '@/components/form/FormLeadReseau'
import DsfrButton from '@/components/dsfr/Button.vue'
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    BoxItem,
    ApiEngagementAssociationsSearch,
    FormLeadReseau,
    DsfrButton,
    Link
  },
  mixins: [FormErrors, Emailable],
  data () {
    return {
      loading: false,
      currentStepKey: 'choix_orga_type',
      form: {
        structure: {}
      },
      orgaExist: null,
      showModalConfirmOrga: false,
      modalConfirmOrgaStep: 1, // 1 or 2
      autocompleteOptions: [],
      orgaTypeChosen: '',
      formSchema: object({
        first_name: string().required('Un prénom est requis'),
        last_name: string().required('Un nom est requis'),
        mobile: string().min(10).matches(/^[+|\s|\d]*$/, 'Ce format est incorrect').required('Un téléphone mobile est requis'),
        zip: string().min(5).required('Un code postal est requis'),
        birthday: date().required('Le format de la date est incorrect').nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
        email: string().required('Un email est requis').email(),
        password: string().min(8).required('Un mot de passe est requis'),
        password_confirmation: string().required('La confirmation est requise').oneOf([ref('password'), null], 'Le mot de passe n\'est pas identique')
      })
    }
  },
  head () {
    return {
      title:
        'Devenez bénévole avec JeVeuxAider.gouv.fr, la plateforme publique du bénévolat par la Réserve Civique',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Créez votre page dédiée et centralisez les missions de vos associations et organisations publiques afin de promouvoir le bénévolat de proximité.'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg'
        }
      ]
    }
  },
  computed: {
    steps () {
      return [
        {
          key: 'choix_orga_type',
          title: 'Excellent choix !',
          subtitle: 'Vous êtes...'
        },
        {
          key: 'choix_orga_nom',
          title:
            this.$route.query.orga_type === 'Collectivité'
              ? 'Voilà un grand pas<br /> pour votre collectivité territoriale !'
              : this.$route.query.orga_type === 'Association'
                ? 'Votre association est <br /> la bienvenue chez nous !'
                : 'Voilà un grand pas<br /> pour votre organisation !',
          subtitle: 'Quel est son petit nom ?'
        },
        {
          key: 'form_utilisateur',
          title:
            this.$route.query.orga_type === 'Association'
              ? `On n'attendait plus que vous,<br /> ${this.form.structure.name} !`
              : `Bienvenue parmi nous <br /> ${this.form.structure.name}`,
          subtitle:
            this.$route.query.orga_type === 'Association'
              ? 'Et vous dans tout ça ?'
              : 'Qui êtes-vous ?'
        },
        {
          key: 'form_reseau',
          title: 'Voilà un grand pas<br /> pour votre réseau !',
          subtitle: 'Quel est le nom de votre tête de réseau ?'
        }
      ]
    },
    currentStep () {
      return this.steps.find(step => step.key === this.currentStepKey)
    },
    userHasRoleResponsable () {
      if (!this.$store.getters.isLogged) {
        return false
      }
      const organisations = this.$store.getters.roles.filter(role => role.key === 'responsable')
      return organisations.length ? organisations[0] : false
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.orgaExist = null
        this.initCurrentStep()
        if (!process.server) {
          window.scrollTo(0, 0)
        }
      }
    }
  },
  methods: {
    initCurrentStep () {
      this.currentStepKey = this.$route.query.orga_type === 'Association' ||
        this.$route.query.orga_type === 'Collectivité' ||
        this.$route.query.orga_type === 'Organisation publique' ||
        this.$route.query.orga_type === 'Organisation privée'
        ? 'choix_orga_nom'
        : this.$route.query.orga_type === 'Tête de réseau'
          ? 'form_reseau'
          : 'choix_orga_type'
    },
    handleChooseOrgaType (orgaType) {
      this.orgaTypeChosen = orgaType
      if (orgaType === 'Crisp') {
        window.open('https://go.crisp.chat/chat/embed/?website_id=4b843a95-8a0b-4274-bfd5-e81cbdc188ac', '_blank')
      } else if (['Association', 'Collectivité', 'Organisation publique', 'Organisation privée'].includes(orgaType)) {
        this.showModalConfirmOrga = true
      } else {
        this.$router.push(`/inscription/responsable?orga_type=${orgaType}`)
      }
    },
    handleConfirmChoixOrga () {
      this.showModalConfirmOrga = false
      this.$router.push(`/inscription/responsable?orga_type=${this.orgaTypeChosen}`)
    },
    handleDeniedChoixOrga () {
      this.$router.push('/')
    },
    async onStructureApiSelected (structure) {
      const res = await this.$axios.get(`/structures/${structure._id}/exist`)
      if (res.data) {
        this.orgaExist = res.data
      } else {
        this.form.structure = structure
        if (this.$store.getters.isLogged) {
          this.registerStructure()
        } else {
          this.currentStepKey = 'form_utilisateur'
        }
      }
    },
    async onSubmitChooseName () {
      if (!this.form.structure.name || this.form.structure.name.trim() === '') {
        this.$toast.error("Merci de saisir un nom d'organisation")
        return
      }
      if (this.$route.query.orga_type === 'Collectivité') {
        const res = await this.$axios.get(`/structures/${this.form.structure.name}/exist`)
        if (res.data) {
          this.orgaExist = res.data
          return false
        }
      }
      if (this.$store.getters.isLogged) {
        this.registerStructure()
      } else {
        this.currentStepKey = 'form_utilisateur'
      }
    },
    onSubmitRegisterResponsableForm () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          const isEmailValid = await this.emailableValidation()
          if (!isEmailValid) {
            this.errors.email = 'Votre adresse mail comporte une erreur'
            this.$toast.error('Votre adresse mail comporte une erreur')
            return
          }
          await this.$store.dispatch('auth/registerResponsable', {
            ...this.form,
            structure_name: this.form.structure.name,
            structure_statut_juridique: this.$route.query.orga_type,
            structure_api: this.form.structure.rna
              ? this.form.structure
              : null
          })
          window.plausible && window.plausible('Inscription responsable - Étape 1 - Création de compte')
          await this.$gtm.push({ event: 'inscription-responsable' })
          this.$router.push({
            path: '/inscription/responsable/step/profile',
            query: {
              orga_type: this.$route.query.orga_type
            }
          })
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async registerStructure () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.form.structure.statut_juridique = this.$route.query.orga_type
      const res = await this.$axios.post('/structure', this.form.structure)
      if (res.data) {
        await this.$store.dispatch('auth/updateUser', {
          context_role: 'responsable',
          contextable_type: 'structure',
          contextable_id: res.data.id
        })
        this.$router.push('/inscription/responsable/step/organisation')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
