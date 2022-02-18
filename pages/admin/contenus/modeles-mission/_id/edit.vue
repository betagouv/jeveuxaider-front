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
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <Button size="xl" variant="green" @click.native="$refs.form.handleSubmit()">
              Enregistrer
            </Button>
          </div>
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

export default {
  components: { FormMissionTemplate },
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
