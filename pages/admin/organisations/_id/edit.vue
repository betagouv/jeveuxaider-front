<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Organisations', link: '/admin/organisations' },
        { label: structure.name, link: `/admin/organisations/${structure.id}` },
        { label: 'Modification' }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="structure.name">
        <template #action>
          <div class="hidden lg:block">
            <Button size="xl" variant="green" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormOrganisation
        ref="form"
        :structure="structure"
        class="my-8"
      />
    </div>
  </div>
</template>

<script>
import FormOrganisation from '@/components/form/FormOrganisation.vue'

export default {
  components: {
    FormOrganisation
  },
  async asyncData ({ $axios, params, error, store }) {
    if (
      ![
        'admin',
        'referent',
        'referent_regional',
        'tete_de_reseau',
        'responsable'
      ].includes(store.getters.contextRole)
    ) {
      return error({ statusCode: 403 })
    }

    const { data: structure } = await $axios.get(`/structures/${params.id}`)
    if (!structure) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole == 'responsable') {
      if (store.getters.contextableId != structure.id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      structure
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
