<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Publier votre mission" />
    </template>

    <div class="space-y-24">
      <div id="domaines" class="">
        <h2 class="text-[28px] font-bold leading-9 mb-10">
          Quel est le domaine d’action de votre mission ?
        </h2>
        <CustomTips class="mb-10">
          <template #title>Plusieurs domaines correspondent à votre mission ?</template>
          Choisissez celui qui vous semble le plus important. Vous pourrez choisir un domaine
          secondaire dans les étapes suivantes.
        </CustomTips>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            v-for="domaine in domaines"
            :key="domaine.key"
            :class="[
              'relative group shadow-lg p-6 text-center border-2 flex flex-col items-center justify-center cursor-pointer hover:border-[#8585F6]',
              'focus:ring-2 ring-offset-2 ring-[#0A76F6]',
              selectedDomaine && selectedDomaine.key === domaine.key
                ? 'border-[#8585F6] bg-[#F5F5FE]'
                : 'border-transparent bg-white',
            ]"
            @click="onDomaineClick(domaine)"
            @keydown="
              (e) => {
                if (e.which === 13 || e.which === 32) {
                  onDomaineClick(domaine)
                }
              }
            "
            tabindex="0"
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
            <DsfrLink class="ml-4 text-jva-blue-500" @click="onChangeDomaineClick"
              >Changer</DsfrLink
            >
          </div>
        </div>
        <CustomTips class="mb-10">
          En utilisant un modèle déjà existant, votre mission sera publiée sans besoin d’être
          validée par un référent.
        </CustomTips>

        <div v-if="selectedDomaine" class="grid grid-cols-1 gap-4">
          <CardTemplate :is-selected="noTemplateSelected" @click="onTemplateClick(null)">
            <template #tags
              ><DsfrTag>{{ selectedDomaine.label }}</DsfrTag></template
            >
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
          <!-- <template #footer>
            <div class="flex justify-end space-x-4 border-t p-8">
              <DsfrButton type="tertiary" @click="onChangeTemplateClick"
                >Choisir un autre modèle</DsfrButton
              >
              <DsfrButton @click="onValidateClick">Sauvegarder</DsfrButton>
            </div>
          </template> -->
        </CardTemplatePreview>
      </div>

      <!-- <div v-if="noTemplateSelected" id="preview-no-template">
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
        </CardTemplatePreview>
      </div> -->
    </div>
    <template #footer>
      <div class="flex justify-end space-x-4">
        <DsfrButton v-if="selectedTemplate" type="tertiary" @click="onChangeTemplateClick">
          Choisir un autre modèle</DsfrButton
        >
        <DsfrButton
          :loading="loading"
          :disabled="!(selectedDomaine && (selectedTemplate || noTemplateSelected))"
          @click="onValidateClick"
          >Continuer</DsfrButton
        >
      </div>
    </template>
  </FormMissionWrapper>
</template>

<script>
import domaines from '@/assets/domaines.json'
import RiCheckboxCircleFill from 'vue-remix-icons/icons/ri-checkbox-circle-fill.vue'
import CardTemplate from '@/components/card/CardTemplate.vue'
import CardTemplatePreview from '@/components/card/CardTemplatePreview.vue'
import FormMissionWrapper from '@/components/form/FormMissionWrapper'

export default {
  components: {
    CardTemplate,
    RiCheckboxCircleFill,
    FormMissionWrapper,
  },
  async setup() {
    definePageMeta({
      layout: 'form-mission',
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
      loading: false,
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
    async onDomaineClick(domaine) {
      this.selectedDomaine = domaine
      this.selectedTemplate = null
      this.noTemplateSelected = false
      this.fetchTemplates()
      await this.$nextTick()
      this.$scrollTo('#templates', 300, {
        container: '#content',
        offset: -50,
      })
    },
    async onChangeDomaineClick() {
      await this.$scrollTo('#domaines', 300, {
        container: '#content',
        offset: -50,
      })
      this.selectedDomaine = null
      this.selectedTemplate = null
      this.noTemplateSelected = false
      this.templates = []
    },
    async onChangeTemplateClick() {
      this.selectedTemplate = null
      this.noTemplateSelected = false
      await this.$nextTick()
      this.$scrollTo('#templates', 300, {
        container: '#content',
        offset: -50,
      })
    },
    async onTemplateClick(template) {
      if (!template) {
        this.noTemplateSelected = true
        this.selectedTemplate = null
      } else {
        this.noTemplateSelected = false
        this.selectedTemplate = template
        await this.$nextTick()
        this.$scrollTo('#preview', 300, {
          container: '#content',
          offset: -50,
        })
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
    async onValidateClick() {
      this.loading = true
      await apiFetch(`/structures/${this.structure.id}/v2/missions`, {
        method: 'POST',
        body: {
          domaine_id: this.selectedDomaine.key,
          template_id: this.selectedTemplate?.id,
        },
      })
        .then(async (mission) => {
          if (this.$stores.auth.contextRole === 'responsable') {
            await this.$stores.auth.fetchUser()
          }
          if (this.selectedTemplate?.id) {
            this.$router.push(`/admin/missions/${mission.id}/informations`)
          } else {
            this.$router.push(`/admin/missions/${mission.id}/title`)
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
