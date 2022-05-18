<template>
  <div class="relative bg-[#081992]">
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
          icon="💪"
          title="Une<br><strong>association</strong>"
          subtitle="Trouver des bénévoles<br>pour vos missions"
          @click.native="handleChooseOrgaType('Association')"
        />
        <BoxItem
          icon="🏫️"
          title="Une <strong>collectivité territoriale</strong>"
          subtitle="Mairies, CCAS, EPCI et tout établissement public local"
          @click.native="handleChooseOrgaType('Collectivité')"
        />
        <BoxItem
          icon="🚀"
          title="Une<br><strong>tête de réseau</strong>"
          subtitle="Gérer vos différentes antennes, <br>délégations, associations locales ..."
          @click.native="handleChooseOrgaType('Tête de réseau')"
        />
        <BoxItem
          icon="🏢"
          title="Autre organisation<br><strong>publique</strong>"
          subtitle="Ehpad public, <br>services de l’Etat ..."
          @click.native="handleChooseOrgaType('Organisation publique')"
        />
        <BoxItem
          icon="🏩"
          title="<strong>Organisation privée</strong> à but non lucratif"
          subtitle="Établissement de santé privé d'intérêt collectif, Ehpad privé,
            fondation, ESUS"
          @click.native="handleChooseOrgaType('Organisation privée')"
        />
        <BoxItem
          icon="🤔"
          title=" Vous êtes<br><strong>perdu ?</strong>"
          subtitle="Notre équipe se fera une joie<br>de vous guider :)"
          @click.native="handleChooseOrgaType('Crisp')"
        />
      </div>

      <div v-else-if="currentStep.key == 'choix_orga_nom'" class="mt-4">
        <template v-if="!userHasRoleResponsable">
          <form
            id="organisation"
            class="max-w-2xl mx-auto bg-gray-100 p-6 sm:p-12 rounded-2xl"
            @submit.prevent="onSubmitChooseName"
          >
            <div
              v-if="['Association', 'Collectivité'].includes($route.query.orga_type)"
              class="mb-8 py-4 px-6 border border-gray-400 text-gray-500 rounded-2xl md:flex md:space-x-4"
            >
              <InformationCircleIcon class="h-5 w-5 inline text-gray-400 translate-y-[-2px] md:translate-y-0 flex-none" />
              <span class="text-sm md:text-base">
                <template v-if="$route.query.orga_type === 'Association'">Vous êtes une association indépendante ou une association antenne d’un réseau associatif. Vous êtes reconnue association loi 1901 ou bien association de droit local.</template>
                <template v-else-if="$route.query.orga_type === 'Collectivité'">Une collectivité territoriale est une autorité publique distincte de l'État. Il peut s’agir d’une commune, d’un CCAS, d’un département ou bien d’une région.</template>
              </span>
            </div>

            <FormControl html-for="name" :label="$route.query.orga_type === 'Collectivité' ? 'Nom de votre collectivité territoriale' : $route.query.orga_type === 'Association' ? 'Nom de votre association' : 'Nom de votre organisation' ">
              <ApiEngagementAssociationsSearch
                v-if="$route.query.orga_type === 'Association'"
                v-model="form.structure.name"
                placeholder="Retrouvez votre association depuis notre base RNA"
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
                    ? 'Nom de votre collectivité territoriale'
                    : 'Nom de votre organisation'
                "
              />
            </FormControl>

            <template v-if="!orgaExist && $route.query.orga_type !== 'Association'">
              <Button
                class="mt-4"
                variant="green"
                form="inscription"
                full
                size="xl"
                @click.native="onSubmitChooseName"
              >
                Continuer
              </Button>
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
            <nuxt-link to="/inscription/responsable" class="text-sm text-white hover:underline">
              Retour
            </nuxt-link>
          </div>
        </template>

        <div v-else class="max-w-2xl mx-auto bg-gray-100 p-6 sm:p-12 rounded-2xl">
          <div class="mb-6">
            Vous êtes déjà responsable de l'organisation
            <span class="font-bold">{{ userHasRoleResponsable.label }}</span>
          </div>
          <nuxt-link to="/inscription/responsable/step/profile">
            <Button
              size="xl"
              full
              variant="green"
            >
              Continuer
            </Button>
          </nuxt-link>
        </div>
      </div>

      <div v-else-if="currentStep.key == 'form_utilisateur'" class="mt-4">
        <div class="form-register-steps max-w-xl mx-auto bg-gray-100 p-6 sm:p-12 rounded-2xl">
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
              <InputDate v-model="form.birthday" name="birthday" />
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

          <Button
            type="submit"
            size="xl"
            form="inscription"
            variant="green"
            full
            :loading="loading"
            @click="onSubmitRegisterResponsableForm"
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
          </Button>

          <div class="mt-4 text-center text-gray-800 text-sm">
            En m'inscrivant j'accepte
            <a
              href="/politique-de-confidentialite"
              target="_blank"
              class="underline"
            >
              la politique de confidentialité
            </a>
            et
            <a href="/charte-reserve-civique" target="_blank" class="underline">
              la charte de JeVeuxAider.gouv.fr
            </a>
          </div>
        </div>
      </div>

      <div v-else-if="currentStep.key == 'form_reseau'" class="mt-4">
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
import FormLeadReseau from '@/components/form/FormLeadReseau'

export default {
  components: {
    BoxItem,
    ApiEngagementAssociationsSearch,
    FormLeadReseau
  },
  mixins: [FormErrors],
  data () {
    return {
      loading: false,
      currentStepKey: 'choix_orga_type',
      form: {
        structure: {}
      },
      orgaExist: null,
      autocompleteOptions: [],
      formSchema: object({
        first_name: string().min(3).required('Un prénom est requis'),
        last_name: string().min(2).required('Un nom est requis'),
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
      if (orgaType === 'Crisp') {
        window.open('https://go.crisp.chat/chat/embed/?website_id=4b843a95-8a0b-4274-bfd5-e81cbdc188ac', '_blank')
      } else {
        this.$router.push(`/inscription/responsable?orga_type=${orgaType}`)
      }
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
      // console.log('onSubmitChooseName', this.form)
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
          await this.$store.dispatch('auth/registerResponsable', {
            ...this.form,
            structure_name: this.form.structure.name,
            structure_statut_juridique: this.$route.query.orga_type,
            structure_api: this.form.structure.rna
              ? this.form.structure
              : null
          })
          window.plausible && window.plausible('Inscription responsable - Étape 1 - Création de compte')
          console.log('push gta tag')
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
