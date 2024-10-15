<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Publier votre mission" />
    </template>

    <div class="space-y-24">
      <div id="domaines" class="">
        <h2 class="text-[22px] lg:text-[28px] font-bold leading-9 mb-6 lg:mb-10">
          Quel est le domaine d’action de votre mission ?
        </h2>
        <CustomTips class="mb-6 lg:mb-10">
          <template #title><p>Plusieurs domaines correspondent à votre mission ?</p></template>
          <p>
            Choisissez celui qui représente au mieux votre mission. Vous pourrez choisir un domaine
            secondaire dans les étapes suivantes.
          </p>
        </CustomTips>

        <FormMissionDomains
          ref="formMissionDomains"
          :selectedDomain="selectedDomain"
          @change="onDomaineChange($event)"
        />
      </div>

      <div v-if="selectedDomain" id="templates" ref="refTemplates" tabindex="-1">
        <div class="mb-10">
          <h2 class="text-[28px] font-bold leading-9 mb-2">Choisissez un modèle de mission</h2>
          <div>
            <span aria-hidden="true">{{ selectedDomain.emoji }}</span>
            <span class="ml-2 text-[#666666]" aria-description="Domaine actuellement sélectionné">{{
              selectedDomain.label
            }}</span>
            <DsfrLink
              class="ml-4 text-jva-blue-500"
              ref="changeDomainButton"
              aria-description="Changer de domaine d'action"
              @click.prevent="onChangeDomaineClick"
              >Changer</DsfrLink
            >
          </div>
        </div>
        <CustomTips class="mb-6 lg:mb-10">
          <p>
            En utilisant un modèle déjà existant, votre mission sera publiée sans besoin d’être
            validée par un référent.
          </p>
        </CustomTips>

        <!-- @todo: accessibility -->
        <div v-if="selectedDomain" class="grid grid-cols-1 gap-4">
          <CardTemplate :is-selected="noTemplateSelected" @click="onTemplateClick(null)">
            <template #tags
              ><DsfrTag>{{ selectedDomain.label }}</DsfrTag></template
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
            <div class="font-medium">{{ selectedDomain.label }}</div>
          </div>
        </CardTemplatePreview>
      </div> -->
    </div>
    <template #footer>
      <div ref="refFormActions" tabindex="-1" class="flex justify-end gap-4 flex-row-reverse">
        <DsfrButton
          :loading="loading"
          :disabled="!(selectedDomain && (selectedTemplate || noTemplateSelected))"
          @click="onValidateClick"
          >Continuer</DsfrButton
        >
        <DsfrButton v-if="selectedTemplate" type="tertiary" @click="onChangeTemplateClick">
          Choisir un autre modèle</DsfrButton
        >
      </div>
    </template>
  </FormMissionWrapper>
</template>

<script>
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
      selectedDomain: null,
      selectedTemplate: null,
      noTemplateSelected: false,
      templates: [],
    }
  },
  created() {},
  computed: {},
  methods: {
    async onDomaineChange(domaine) {
      this.selectedDomain = domaine
      this.selectedTemplate = null
      this.noTemplateSelected = false
      this.fetchTemplates()
      await new Promise((resolve) => setTimeout(resolve, 400))
      this.$scrollTo('#templates', 300, {
        container: '#content',
        offset: -50,
        cancelable: false,
      })
      this.$utils.setFocusPosition(this.$refs.refTemplates)
    },
    async onChangeDomaineClick() {
      await this.$scrollTo('#domaines', 300, {
        container: '#content',
        offset: -50,
        cancelable: false,
      })
      // Wait for scroll animation
      await new Promise((resolve) => setTimeout(resolve, 300))
      this.selectedDomain = null
      this.selectedTemplate = null
      this.noTemplateSelected = false
      this.templates = []
      this.$utils.setFocusPosition(this.$refs.formMissionDomains.$el)
    },
    async onChangeTemplateClick() {
      this.selectedTemplate = null
      this.noTemplateSelected = false
      await this.$nextTick()
      this.$scrollTo('#templates', 300, {
        container: '#content',
        offset: -50,
        cancelable: false,
      })
      this.$utils.setFocusPosition(this.$refs.refTemplates)
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
          cancelable: false,
        })
        this.$utils.setFocusPosition(this.$refs.refFormActions)
      }
    },
    async fetchTemplates() {
      await apiFetch('/mission-templates', {
        params: {
          'filter[domaine.id]': this.selectedDomain.key,
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
          domaine_id: this.selectedDomain.key,
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
