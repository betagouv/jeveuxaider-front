<template>
  <div class="container" style="scroll-behavior: smooth;">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Missions', link: '/admin/missions' },
        { label: 'Publier une mission' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Création d'une nouvelle mission" secondary-title-bottom="Choisissez le domaine d'action de cette mission">
        <template #action>
          <div v-if="step == 1" class="text-gray-500 text-sm lg:text-right">
            Votre mission doit respecter<br>
            <a class="underline text-gray-700" href="/charte-reserve-civique" target="_blank">la charte</a> de Jeveuxaider.gouv.fr
          </div>
          <div v-if="step == 2" class="hidden lg:block space-x-2">
            <Button variant="white" @click.native="handleSubmitBrouillon()">
              Enregistrer en brouillon
            </Button>
            <Button variant="green" @click.native="handleSubmitPublish()">
              Enregistrer et publier
            </Button>
          </div>
        </template>
      </Sectionheading>

      <div v-if="step == 1" class="flex flex-wrap grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        <div
          v-for="domaine in $labels.domaines"
          :key="domaine.key"
          class="shadow-lg rounded-lg py-6 px-14 text-center flex flex-col items-center justify-center cursor-pointer"
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

      <div v-if="step == 1 && domaine_id" id="templates" class="border-t mt-10">
        <Heading :level="3" class="mt-6">
          Sélectionnez un modèle de mission
        </Heading>
        <div class="text-gray-500 mt-2 mb-6">
          En utilisant un modèle déjà existant, votre mission sera publiée sans
          besoin de validation.
        </div>
        <div class="grid grid-cols-4 gap-6">
          <CardMissionTemplate
            title="Personnalisez votre mission"
            description="Tous les champs sont éditables. Elle sera publiée après validation par le référent départemental."
            image-url="/images/missions/card-add.png"
            state-text="Validation par un référent"
            state-style="warning"
            @click.native="onSelectTemplate()"
          />

          <CardMissionTemplate
            v-for="missionTemplate in templates"
            :key="missionTemplate.id"
            :title="missionTemplate.title"
            :description="missionTemplate.subtitle"
            :image-url="missionTemplate.photo && missionTemplate.photo.urls.card"
            @click.native="onSelectTemplate(missionTemplate)"
          />
        </div>
      </div>

      <FormMission
        v-if="step == 2"
        ref="formMission"
        :mission="mission"
        :structure="structure"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import CardMissionTemplate from '@/components/card/CardMissionTemplate.vue'
import FormMission from '@/components/form/FormMission.vue'

export default {
  components: {
    CardMissionTemplate,
    FormMission
  },
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    if (
      !store.getters.currentRole || store.getters.currentRole.contextable_type !== 'structure'
    ) {
      return error({ statusCode: 403 })
    }
    const { data: structure } = await $axios.get(`/structures/${params.id}`)

    return {
      structure
    }
  },
  data () {
    return {
      template_id: parseInt(this.$route.query.template) || null,
      domaine_id: parseInt(this.$route.query.domaine) || null,
      templates: [],
      mission: {}
    }
  },
  async fetch () {
    this.domaine_id = parseInt(this.$route.query.domaine) || null
    this.template_id = parseInt(this.$route.query.template) || null

    if (this.domaine_id) {
      const templates = await this.$axios.get('/mission-templates', {
        params: {
          'filter[domaine.id]': this.domaine_id,
          'filter[published]': 1,
          'filter[with_reseaux]': this.structure.reseaux?.length
            ? this.structure.reseaux.map(reseau => reseau.id).join(',')
            : 'empty',
          pagination: 99,
          include: 'photo'
        }
      })
      this.templates = templates.data.data
    }
    if (this.template_id) {
      const { data: template } = await this.$axios.get(`/mission-templates/${this.template_id}`)
      this.$set(this.mission, 'template', template)
    }
  },
  computed: {
    step () {
      return this.$route.query.step || 1
    }
  },
  watch: {
    $route: '$fetch'
  },
  methods: {
    onclickDomaine (domaineId) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, domaine: domaineId },
        hash: '#templates'
      })
    },
    async onSelectTemplate (missionTemplate) {
      if (missionTemplate) {
        const { data: template } = await this.$axios.get(`/mission-templates/${missionTemplate.id}`)
        this.$set(this.mission, 'template', template)
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, template: missionTemplate.id, step: 2 }
        })
      } else {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, domaine: this.domaine_id, step: 2 }
        })
      }
    },
    handleSubmitBrouillon () {
      this.$refs.formMission.handleSubmitBrouillon()
    },
    handleSubmitPublish () {
      this.$refs.formMission.handleSubmitPublish()
    }
  }
}
</script>
