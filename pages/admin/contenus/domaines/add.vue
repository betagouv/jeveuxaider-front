<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Domaines', link: `/admin/contenus/domaines` },
        { label: 'Nouveau domaine' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Création d'un nouveau domaine d'action">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" @click.native="handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormDomaine
        ref="form"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormDomaine from '@/components/form/FormDomaine'

export default {
  components: { FormDomaine },
  layout: 'admin',
  middleware: 'admin',
  methods: {
    handleSubmit () {
      this.$refs.form.handleSubmit()
    }

  }
}
</script>
