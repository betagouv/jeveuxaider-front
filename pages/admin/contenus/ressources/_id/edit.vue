<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Ressources', link: `/admin/contenus/ressources` },
        { label: ressource.title }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="ressource.title">
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
        :ressource="ressource"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormRessource from '~/components/form/FormRessource.vue'

export default {
  components: { FormRessource },
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: ressource } = await $axios.get(`/documents/${params.id}`)
    if (!ressource) {
      return error({ statusCode: 404 })
    }

    return {
      ressource
    }
  },
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
