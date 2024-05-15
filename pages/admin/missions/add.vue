<template>
  <div class="space-y-10">
    <div id="domaines" class="">
      <h2 class="text-[28px] font-bold leading-9 mb-10">
        Quel est le domaine d’action de votre mission ?
      </h2>
      <CustomTips class="mb-10">
        Plusieurs domaines correspondent à votre mission ? Choisissez celui qui vous semble le plus
        important. Vous pourrez choisir un domaine secondaire dans les étapes suivantes.
      </CustomTips>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="domaine in domaines"
          :key="domaine.key"
          class="bg-white shadow-lg p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:shadow-xl"
          @click="onDomaineClick(domaine.key)"
        >
          <div class="text-4xl mb-2">
            {{ domaine.emoji }}
          </div>
          <div class="leading-tight font-bold text-[#161616]">
            {{ domaine.label }}
          </div>
        </div>
      </div>
    </div>
    <div id="templates" class="">
      <div class="mb-10">
        <h2 class="text-[28px] font-bold leading-9">Choisissez un modèle de mission</h2>
        <div>
          {{ selectedDomaine.emoji }} {{ selectedDomaine.label }}
          <DsfrLink @click="onChangeDomaineClick">Changer</DsfrLink>
        </div>
      </div>
      <CustomTips class="mb-10">
        Plusieurs domaines correspondent à votre mission ? Choisissez celui qui vous semble le plus
        important. Vous pourrez choisir un domaine secondaire dans les étapes suivantes.
      </CustomTips>

      <div v-if="selectedDomaine" class="grid grid-cols-1 gap-4">
        <div
          class="bg-white shadow-lg p-6 cursor-pointer hover:shadow-xl"
          @click="onTemplateClick(null)"
        >
          <div>IMG</div>
          <div>
            <div>{{ selectedDomaine.label }}</div>
            <div>Personnalisez votre mission</div>
            <div>L'intégralité des champs sont éditables</div>
          </div>
        </div>
        <div
          v-for="template in templates"
          :key="template.id"
          class="bg-white shadow-lg p-6 cursor-pointer hover:shadow-xl"
          @click="onTemplateClick(template)"
        >
          <div>IMG</div>
          <div>
            <div>{{ selectedDomaine.label }}</div>
            <div>{{ template.subtitle }}</div>
            <div>{{ template.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <div id="preview" class="">
      <div class="" mb-10>
        <h2 class="text-[28px] font-bold leading-9">Est-ce le modèle qu’il vous faut ?</h2>
        <div>Ces informations ne seront pas modifiables, mais vous pourrez en ajouter !</div>
      </div>

      <div v-if="selectedTemplate">
        {{ selectedTemplate }}
      </div>
    </div>
  </div>
</template>

<script>
import domaines from '@/assets/domaines.json'

export default {
  components: {},
  async setup() {
    definePageMeta({
      layout: 'form-missions',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
    const { $stores } = useNuxtApp()

    if (!$stores.auth.currentRole || $stores.auth.currentRole.contextable_type !== 'structure') {
      showError({ statusCode: 403 })
    }

    const { data: structure, error } = await useApiFetch(
      `/structures/${$stores.auth.currentRole.contextable_id}`
    )

    if (error.value) {
      showError({ statusCode: 403 })
    }

    if ($stores.auth.contextRole == 'responsable') {
      if (['Désinscrite', 'Signalée', 'Brouillon'].includes(structure.state)) {
        showError({ statusCode: 403 })
      }
      if (!$stores.auth.user?.profile?.mobile) {
        showError({ statusCode: 403 })
      }
      if ($stores.auth.user.statistics?.missions_offline_count) {
        showError({ statusCode: 403 })
      }
    }
    return {
      structure,
    }
  },
  data() {
    return {
      domaines: domaines.sort((a, b) => a.label.localeCompare(b.label)),
      selectedDomaine: null,
      selectedTemplate: null,
      templates: [],
    }
  },
  created() {},
  computed: {},
  methods: {
    onDomaineClick(domaine) {
      this.selectedDomaine = domaine
      this.fetchTemplates()
      this.$scrollTo('#templates', 300, {})
    },
    onChangeDomaineClick() {
      this.selectedDomaine = null
      this.$scrollTo('#domaines', 300, {})
    },
    onTemplateClick(template) {
      this.selectedTemplate = template
      this.$scrollTo('#preview', 300, {})
    },
    async fetchTemplates() {
      await apiFetch('/mission-templates', {
        params: {
          'filter[domaine.id]': this.selectedDomaine.key,
          'filter[published]': 1,
          'filter[state]': 'validated',
          'filter[with_reseaux]': this.structure.reseaux?.length
            ? this.structure.reseaux.map((reseau) => reseau.id).join(',')
            : 'empty',
          pagination: -1,
          include: 'photo,reseau',
          sort: 'reseau_id',
        },
      }).then((templates) => {
        this.templates = templates.data
      })
    },
  },
}
</script>
