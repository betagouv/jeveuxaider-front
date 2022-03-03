<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Ressources', link: `/admin/contenus/ressources` },
        { label: 'Nouvelle ressource' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Création d'un nouvelle ressource">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormRessource
        ref="form"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormRessource from '@/components/form/FormRessource'

export default {
  components: { FormRessource },
  middleware: 'admin',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit()
      this.loading = false
    }
  }
}
</script>
