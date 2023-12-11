<template>
  <div class="container" style="scroll-behavior: smooth">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Missions', to: '/admin/missions' },
        { text: 'Publier une mission' },
      ]"
    />
    <div class="pb-6 mb-12">
      <BaseSectionHeading
        title="Publication d'une nouvelle mission"
        secondary-title-bottom="Choisissez le domaine d'action de cette mission"
      >
        <template #action>
          <div v-if="step == 1" class="text-gray-500 text-sm lg:text-right">
            Votre mission doit respecter<br />
            <a class="underline text-gray-700" href="/charte-reserve-civique" target="_blank"
              >la charte</a
            >
            de Jeveuxaider.gouv.fr
          </div>
          <div v-if="step == 2 && !loadingFetch">
            <ButtonsSubmitFormMission
              class="hidden lg:flex"
              :structure="structure"
              :template-id="mission.template?.id"
              :loading="loadingSubmit"
              @submitted="handleSubmit($event)"
            />
          </div>
        </template>
      </BaseSectionHeading>

      <TransitionGroup name="fade-in">
        <div
          key="choose-domain"
          v-if="step == 1"
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8"
        >
          <div
            v-for="domaine in $labels.domaines"
            :key="domaine.key"
            class="shadow-lg py-6 px-14 text-center flex flex-col items-center justify-center cursor-pointer"
            :class="[
              domaine.key == $route.query.domaine
                ? 'text-white bg-jva-blue-500'
                : 'hover:bg-jva-blue-500 hover:text-white bg-white',
            ]"
            @click="onclickDomaine(domaine.key)"
          >
            <div class="text-4xl mb-2">
              {{ domaine.emoji }}
            </div>
            <div class="leading-tight font-bold">
              {{ domaine.label }}
            </div>
          </div>
        </div>

        <div
          key="choose-template"
          v-if="step == 1 && domaine_id"
          id="templates"
          class="border-t mt-10"
        >
          <BaseHeading :level="3" class="mt-6"> Sélectionnez un modèle de mission </BaseHeading>
          <div class="text-gray-500 mt-2 mb-6">
            En utilisant un modèle déjà existant, votre mission sera publiée sans besoin de
            validation.
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card
              title="Personnalisez votre mission"
              description="L'intégralité des champs sont éditables. Votre mission sera publiée dans un délai de 5 à 7 jours, après modération par un référent départemental."
              image-srcset="/images/missions/card-add.png"
              state-text="Validation par un référent"
              state-style="warning"
              class="bg-white"
              @click.native="onSelectTemplate()"
            >
              <template #footer>
                <div
                  class="border-t text-jva-blue-500 font-semibold text-center py-4 group-hover:bg-jva-blue-500 group-hover:text-white"
                >
                  Choisir
                </div>
              </template>
            </Card>
            <TransitionGroup name="fade-in">
              <Card
                v-for="missionTemplate in templates"
                :key="missionTemplate.id"
                :title="missionTemplate.title"
                state-style="success"
                state-text="Validation automatique"
                :description="missionTemplate.subtitle"
                :image-srcset="missionTemplate.photo ? missionTemplate.photo.urls.card : undefined"
                :image-src="missionTemplate.photo ? missionTemplate.photo.urls.original : undefined"
                class="bg-white"
                @click.native="onSelectTemplate(missionTemplate)"
              >
                <template #badges>
                  <div v-if="missionTemplate.reseau" class="mb-2">
                    <BaseBadge color="gray-light">
                      {{ missionTemplate.reseau.name }}
                    </BaseBadge>
                  </div>
                </template>
                <template #footer>
                  <div
                    class="border-t text-jva-blue-500 font-semibold text-center py-4 group-hover:bg-jva-blue-500 group-hover:text-white"
                  >
                    Choisir
                  </div>
                </template>
              </Card>
            </TransitionGroup>
          </div>
        </div>

        <FormMission
          v-if="step == 2 && !loadingFetch"
          ref="form"
          :mission="mission"
          :structure="structure"
          class="mt-8"
          key="form-mission"
        />
        <ListLoader key="list-loader" v-if="step == 2 && loadingFetch" class="py-12" />

        <div
          v-if="step == 2 && !loadingFetch"
          key="submit-button"
          class="border-t my-8 pt-8 lg:pt-12 lg:my-12"
        >
          <ButtonsSubmitFormMission
            class="flex"
            :structure="structure"
            :template-id="mission.template?.id"
            :loading="loadingSubmit"
            @submitted="handleSubmit($event)"
          />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import Card from '@/components/card/Card.vue'
import FormMission from '@/components/form/FormMission.vue'
import ButtonsSubmitFormMission from '@/components/custom/ButtonsSubmitFormMission.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import { ListLoader } from 'vue-content-loader'

export default defineNuxtComponent({
  components: {
    Card,
    FormMission,
    ButtonsSubmitFormMission,
    Breadcrumb,
    ListLoader,
  },
  async setup() {
    definePageMeta({
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

    if (!$stores.auth.currentRole || $stores.auth.currentRole.contextable_type !== 'structure') {
      return showError({ statusCode: 403 })
    }

    const { data: structure, error } = await useApiFetch(`/structures/${route.params.id}`)
    if (error.value) {
      return showError({ statusCode: 403 })
    }

    if ($stores.auth.contextRole == 'responsable') {
      if (['Désinscrite', 'Signalée', 'Brouillon'].includes(structure.state)) {
        return showError({ statusCode: 403 })
      }
      if (!$stores.auth.user?.profile?.mobile) {
        return showError({ statusCode: 403 })
      }
      if ($stores.auth.user.statistics?.missions_inactive_count) {
        return showError({ statusCode: 403 })
      }
    }

    return {
      structure,
    }
  },
  data() {
    return {
      loadingFetch: true,
      loadingSubmit: false,
      template_id: parseInt(this.$route.query.template) || null,
      domaine_id: parseInt(this.$route.query.domaine) || null,
      templates: [],
      mission: {},
    }
  },

  computed: {
    step() {
      return this.$route.query.step || 1
    },
  },
  watch: {
    '$route.query': {
      immediate: true,
      async handler() {
        await this.fetch()
      },
    },
  },
  methods: {
    async fetch() {
      this.loadingFetch = true
      this.domaine_id = parseInt(this.$route.query.domaine) || null
      this.template_id = parseInt(this.$route.query.template) || null
      const promises = []

      if (this.domaine_id) {
        this.mission.domaine_id = this.domaine_id
        promises.push(this.fetchDomaineTemplates())
      }
      if (this.template_id) {
        promises.push(this.fetchTemplate())
      }

      await Promise.all(promises)
      this.loadingFetch = false
    },
    async fetchDomaineTemplates() {
      await apiFetch('/mission-templates', {
        params: {
          'filter[domaine.id]': this.domaine_id,
          'filter[published]': 1,
          'filter[state]': 'validated',
          'filter[with_reseaux]': this.structure.reseaux?.length
            ? this.structure.reseaux.map((reseau) => reseau.id).join(',')
            : 'empty',
          pagination: 99,
          include: 'photo,reseau',
          sort: 'reseau_id',
        },
      }).then((templates) => {
        this.templates = templates.data
      })
    },
    async fetchTemplate() {
      await apiFetch(`/mission-templates/${this.template_id}`).then((template) => {
        this.mission.template = template
      })
    },
    onclickDomaine(domaineId) {
      this.templates = []
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, domaine: domaineId },
        hash: '#templates',
      })
    },
    async onSelectTemplate(missionTemplate) {
      const query = {}
      if (missionTemplate) {
        query.template = missionTemplate.id
      } else {
        this.mission.template = null
        query.domaine = this.domaine_id
      }

      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, step: 2, ...query },
      })
    },
    async handleSubmit(payload) {
      if (this.loadingSubmit) {
        return
      }
      this.loadingSubmit = true
      await this.$refs.form.handleSubmit(payload)
      this.loadingSubmit = false
    },
  },
})
</script>
