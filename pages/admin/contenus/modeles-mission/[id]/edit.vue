<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Modèles de mission', to: `/admin/contenus/modeles-mission` },
        { text: missionTemplate.title },
      ]"
    />
    <div class="pb-6">
      <BaseSectionHeading :title="missionTemplate.title">
        <template #tags>
          <BaseBadge :color="missionTemplate.state" class="mt-4">
            {{ $filters.label(missionTemplate.state, 'mission_template_workflow_states') }}
          </BaseBadge>
        </template>
        <template #action>
          <ButtonsSubmitFormMissionTemplate
            class="hidden lg:flex"
            :mission-template="missionTemplate"
            :loading="loading"
            @submitted="handleSubmit($event)"
          />
        </template>
      </BaseSectionHeading>

      <FormMissionTemplate ref="form" :mission-template="missionTemplate" class="my-8" />
    </div>
  </div>
</template>

<script>
import FormMissionTemplate from '~/components/form/FormMissionTemplate.vue'
import ButtonsSubmitFormMissionTemplate from '@/components/custom/ButtonsSubmitFormMissionTemplate.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    FormMissionTemplate,
    ButtonsSubmitFormMissionTemplate,
    Breadcrumb,
  },
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

    if (!['admin', 'tete_de_reseau'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }

    const missionTemplate = await apiFetch(`/mission-templates/${route.params.id}`)

    if (!missionTemplate) {
      return showError({ statusCode: 404 })
    }

    if ($stores.auth.contextRole === 'tete_de_reseau') {
      if (missionTemplate.reseau_id != $stores.auth.contextableId) {
        return showError({ statusCode: 403 })
      }
    }

    return {
      missionTemplate,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async handleSubmit(payload) {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit(payload)
      this.loading = false
    },
  },
})
</script>
