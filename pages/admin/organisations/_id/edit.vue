<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Organisations', to: ['admin','referent','referent_regional','tete_de_reseau'].includes($store.getters.contextRole) ? '/admin/organisations' : null },
        { text: structure.name, to: `/admin/organisations/${structure.id}` },
        { text: 'Modification' }
      ]"
    />
    <div class="pb-6">
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
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FormOrganisation,
    Breadcrumb
  },
  middleware: 'authenticated',
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
