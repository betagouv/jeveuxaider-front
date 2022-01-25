<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Modèles de mission', link: `/admin/contenus/modeles-mission` },
        { label: 'Nouveau modèle' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Création d'un nouveau modèle de mission">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="white" @click.native="handleSubmitDraft()">
              Enregistrer en brouillon
            </Button>
            <Button variant="green" @click.native="handleSubmit()">
              Soumettre à validation
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormMissionTemplate
        ref="form"
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
  methods: {
    handleSubmitDraft () {
      this.$refs.form.handleSubmitDraft()
    },
    handleSubmit () {
      this.$refs.form.handleSubmit()
    }

  }
}
</script>
