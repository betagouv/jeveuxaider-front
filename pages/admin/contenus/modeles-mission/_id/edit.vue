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
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" @click.native="handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormMissionTemplate
        ref="form"
        :mission-template="missionTemplate"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormMissionTemplate from '~/components/form/FormMissionTemplate.vue'

export default {
  components: { FormMissionTemplate },
  layout: 'admin',
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: missionTemplate } = await $axios.get(`/mission-templates/${params.id}`)
    if (!missionTemplate) {
      return error({ statusCode: 404 })
    }
    return {
      missionTemplate
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.handleSubmit()
    }

  }
}
</script>
