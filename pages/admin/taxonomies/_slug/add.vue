<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Taxonomies' },
        { label: 'Tous les termes', link: `/admin/taxonomies/${$route.params.slug}` },
        { label: 'Nouvelle entrée' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Nouvelle entrée">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" @click.native="handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormTerm
        ref="form"
        class="mt-8"
        :vocabulary="$route.params.slug"
      />
    </div>
  </div>
</template>

<script>
import FormTerm from '@/components/form/FormTerm'

export default {
  components: { FormTerm },
  layout: 'admin',
  middleware: 'admin',
  methods: {
    handleSubmit () {
      this.$refs.form.handleSubmit()
    }

  }
}
</script>
