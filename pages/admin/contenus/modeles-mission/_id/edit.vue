<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Modèles de mission', link: `/admin/contenus/modeles-mission` },
        { label: missionTemplate.title }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="missionTemplate.title">
        <template #tags>
          <Badge :color="missionTemplate.state" class="mt-4">
            {{ missionTemplate.state| label('mission_template_workflow_states') }}
          </Badge>
        </template>
        <template #action>
          <ButtonsSubmitFormMissionTemplate class="hidden lg:flex" :mission-template="missionTemplate" @submitted="$refs.form.handleSubmit($event)" />
        </template>
      </Sectionheading>

      <FormMissionTemplate
        ref="form"
        :mission-template="missionTemplate"
        class="my-8"
      />

      <ButtonsSubmitFormMissionTemplate class="flex lg:hidden" :mission-template="missionTemplate" @submitted="$refs.form.handleSubmit($event)" />
    </div>
  </div>
</template>

<script>
import FormMissionTemplate from '~/components/form/FormMissionTemplate.vue'
import ButtonsSubmitFormMissionTemplate from '@/components/custom/ButtonsSubmitFormMissionTemplate.vue'

export default {
  components: { FormMissionTemplate, ButtonsSubmitFormMissionTemplate },
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'tete_de_reseau'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }

    const { data: missionTemplate } = await $axios.get(`/mission-templates/${params.id}`)

    if (!missionTemplate) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole === 'tete_de_reseau') {
      if (missionTemplate.reseau_id != store.getters.profile.tete_de_reseau_id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      missionTemplate
    }
  },
  methods: {

  }
}
</script>
