<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Contenus' },
        { text: 'Ressources', to: `/admin/contenus/ressources` },
        { text: ressource.title }
      ]"
    />
    <div class="pb-6">
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
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormRessource, Breadcrumb },
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
