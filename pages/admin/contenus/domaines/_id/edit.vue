<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Domaines', link: `/admin/contenus/domaines` },
        { label: domaine.name }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="domaine.name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" :loading="loading" @click.native="handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormDomaine
        ref="form"
        :domaine="domaine"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormDomaine from '~/components/form/FormDomaine.vue'

export default {
  components: { FormDomaine },
  layout: 'admin',
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: domaine } = await $axios.get(`/domaines/${params.id}`)
    if (!domaine) {
      return error({ statusCode: 404 })
    }

    return {
      domaine
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
