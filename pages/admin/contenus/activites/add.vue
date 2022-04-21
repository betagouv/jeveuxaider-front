<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Activités', link: `/admin/contenus/activites` },
        { label: 'Nouvelle activité' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Création d'une nouvelle activité">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormActivity
        ref="form"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormActivity from '@/components/form/FormActivity'

export default {
  components: { FormActivity },
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
