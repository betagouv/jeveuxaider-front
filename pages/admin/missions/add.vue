<template>
  <div class="space-y-24">
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
          :class="[
            'relative group  shadow-lg p-6 text-center border-2 flex flex-col items-center justify-center cursor-pointer hover:border-[#8585F6]',
            selectedDomaine && selectedDomaine.key === domaine.key
              ? 'border-[#8585F6] bg-[#F5F5FE]'
              : 'border-transparent bg-white',
          ]"
          @click="onDomaineClick(domaine)"
        >
          <RiCheckboxCircleFill
            v-if="selectedDomaine && selectedDomaine.key === domaine.key"
            class="h-6 text-jva-blue-500 fill-current absolute top-3 right-3 group-hover:text-jva-blue-500"
          />
          <div class="text-4xl mb-2">
            {{ domaine.emoji }}
          </div>
          <div
            :class="[
              'leading-tight font-bold group-hover:text-jva-blue-500',
              selectedDomaine && selectedDomaine.key === domaine.key
                ? 'text-jva-blue-500'
                : 'text-[#161616]',
            ]"
          >
            {{ domaine.label }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedDomaine" id="templates" class="">
      <div class="mb-10">
        <h2 class="text-[28px] font-bold leading-9 mb-2">Choisissez un modèle de mission</h2>
        <div>
          <span>{{ selectedDomaine.emoji }}</span>
          <span class="ml-2 text-[#666666]">{{ selectedDomaine.label }}</span>
          <DsfrLink class="ml-4 text-jva-blue-500" @click="onChangeDomaineClick">Changer</DsfrLink>
        </div>
      </div>
      <CustomTips class="mb-10">
        En utilisant un modèle déjà existant, votre mission sera publiée sans besoin d’être
        instruite.
        <span class="font-bold">L’instruction d’une mission prend en moyenne 7 à 10 jours.</span>
      </CustomTips>

      <div v-if="selectedDomaine" class="grid grid-cols-1 gap-4">
        <CardTemplate :is-selected="noTemplateSelected" @click="onTemplateClick(null)">
          <DsfrTag>{{ selectedDomaine.label }}</DsfrTag>
        </CardTemplate>
        <CardTemplate
          v-for="template in templates"
          :key="template.id"
          :template="template"
          :is-selected="template.id === selectedTemplate?.id"
          @click="onTemplateClick(template)"
        >
          <template #tags>
            <DsfrTag v-if="template.domaine_id">
              {{ $labels.domaines.find((domaine) => domaine.key === template.domaine_id)?.label }}
            </DsfrTag>
            <DsfrTag v-if="template.domaine_secondary_id" class="ml-2">
              {{
                $labels.domaines.find((domaine) => domaine.key === template.domaine_secondary_id)
                  ?.label
              }}
            </DsfrTag>
          </template>
        </CardTemplate>
      </div>
    </div>

    <div v-if="selectedTemplate" id="preview" class="">
      <div class="mb-10">
        <h2 class="text-[28px] font-bold leading-9 mb-2">Est-ce le modèle qu’il vous faut ?</h2>
        <div class="text-[#666666]">
          Ces informations ne seront pas modifiables, mais vous pourrez en ajouter !
        </div>
      </div>

      <CardTemplatePreview :template="selectedTemplate">
        <template #footer>
          <div class="flex justify-end space-x-4 border-t p-8">
            <DsfrButton type="tertiary" @click="onChangeTemplateClick"
              >Choisir un autre modèle</DsfrButton
            >
            <DsfrButton @click="onValidateClick">Valider</DsfrButton>
          </div>
        </template>
      </CardTemplatePreview>
    </div>

    <div v-if="noTemplateSelected" id="preview-no-template">
      <div class="mb-10">
        <h2 class="text-[28px] font-bold leading-9 mb-2">Personnalisez votre mission</h2>
        <div class="text-[#666666]">
          Vous pourrez personnaliser votre mission en complétant les informations demandées.
        </div>
      </div>

      <CardTemplatePreview>
        <div class="py-8 border-b">
          <div class="uppercase text-[#666666] font-bold text-sm mb-2">Organisation</div>
          <div class="font-medium">{{ structure.name }}</div>
        </div>
        <div class="pt-8">
          <div class="uppercase text-[#666666] font-bold text-sm mb-2">
            Domaine d’action principal
          </div>
          <div class="font-medium">{{ selectedDomaine.label }}</div>
        </div>
        <template #footer>
          <div class="flex justify-end space-x-4 border-t p-8">
            <DsfrButton type="tertiary" @click="onChangeTemplateClick"
              >Choisir un modèle</DsfrButton
            >
            <DsfrButton @click="onValidateClick">Valider</DsfrButton>
          </div>
        </template>
      </CardTemplatePreview>
    </div>
  </div>
</template>

<script>
import domaines from '@/assets/domaines.json'
import { RiCheckboxCircleFill } from 'vue-remix-icons'
import CardTemplate from '@/components/card/CardTemplate.vue'
import CardTemplatePreview from '@/components/card/CardTemplatePreview.vue'

export default {
  components: {
    CardTemplate,
    RiCheckboxCircleFill,
  },
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
      noTemplateSelected: false,
      templates: [],
    }
  },
  created() {},
  computed: {},
  methods: {
    onDomaineClick(domaine) {
      this.selectedDomaine = domaine
      this.selectedTemplate = null
      this.noTemplateSelected = false
      this.fetchTemplates()
      this.$router.push({
        path: this.$route.path,
        hash: '#templates',
      })
      // this.$scrollTo('#templates', 300, {})
    },
    onChangeDomaineClick() {
      this.selectedDomaine = null
      this.selectedTemplate = null
      this.noTemplateSelected = false
      this.templates = []
      this.$router.push({
        path: this.$route.path,
        hash: '#domaines',
      })
      // this.$scrollTo('#domaines', 300, {})
    },
    onChangeTemplateClick() {
      this.selectedTemplate = null
      this.noTemplateSelected = false
      this.$router.push({
        path: this.$route.path,
        hash: '#templates',
      })
      // this.$scrollTo('#templates', 300, {})
    },
    onTemplateClick(template) {
      if (!template) {
        this.noTemplateSelected = true
        this.selectedTemplate = null
        this.$router.push({
          path: this.$route.path,
          hash: '#preview-no-template',
        })
        // this.$scrollTo('#preview-no-template', 300, {})
      } else {
        this.noTemplateSelected = false
        this.selectedTemplate = template
        this.$router.push({
          path: this.$route.path,
          hash: '#preview',
        })
        // this.$scrollTo('#preview', 300, {})
      }
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
    onValidateClick() {
      console.log('onValidateClick')
    },
  },
}
</script>
