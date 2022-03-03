<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Réseaux', link: `/admin/contenus/reseaux` },
        { label: 'Nouveau réseau' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Création d'un nouveau réseau">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <Button size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormReseau
        ref="form"
        class="my-8"
      />
    </div>
  </div>
</template>

<script>
import FormReseau from '~/components/form/FormReseau'

export default {
  components: { FormReseau },
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
