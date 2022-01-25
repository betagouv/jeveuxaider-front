<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Thématiques', link: `/admin/contenus/thematiques` },
        { label: 'Nouvelle thématique' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Création d'une nouvelle thématique">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" @click.native="handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormThematique
        ref="form"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormThematique from '~/components/form/FormThematique.vue'

export default {
  components: { FormThematique },
  layout: 'admin',
  middleware: 'admin',
  methods: {
    handleSubmit () {
      this.$refs.form.handleSubmit()
    }

  }
}
</script>
