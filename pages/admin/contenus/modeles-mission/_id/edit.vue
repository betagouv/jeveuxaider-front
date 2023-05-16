<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Modèles de mission', to: `/admin/contenus/modeles-mission` },
        { text: missionTemplate.title }
      ]"
    />
    <div class="pb-6">
      <SectionHeading :title="missionTemplate.title">
        <template #tags>
          <Badge :color="missionTemplate.state" class="mt-4">
            {{ missionTemplate.state| label('mission_template_workflow_states') }}
          </Badge>
        </template>
        <template #action>
          <ButtonsSubmitFormMissionTemplate
            class="hidden lg:flex"
            :mission-template="missionTemplate"
            :loading="loading"
            @submitted="handleSubmit($event)"
          />
        </template>
      </Sectionheading>

      <FormMissionTemplate
        ref="form"
        :mission-template="missionTemplate"
        class="my-8"
      />
    </div>
  </div>
</template>

<script>
import FormMissionTemplate from '~/components/form/FormMissionTemplate.vue'
import ButtonsSubmitFormMissionTemplate from '@/components/custom/ButtonsSubmitFormMissionTemplate.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormMissionTemplate, ButtonsSubmitFormMissionTemplate, Breadcrumb },
  middleware: 'authenticated',
  async asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'tete_de_reseau'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }

    const { data: missionTemplate } = await $axios.get(`/mission-templates/${params.id}`)

    if (!missionTemplate) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole === 'tete_de_reseau') {
      if (missionTemplate.reseau_id != store.getters.contextableId) {
        return error({ statusCode: 403 })
      }
    }

    return {
      missionTemplate
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async handleSubmit (payload) {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit(payload)
      this.loading = false
    }
  }
}
</script>
