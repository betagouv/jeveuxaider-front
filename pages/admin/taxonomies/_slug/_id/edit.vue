<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Taxonomies' },
        { label: 'Tous les termes', link: `/admin/taxonomies/${$route.params.slug}` },
        { label: term.name }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="term.name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormTerm
        ref="form"
        :term="term"
        class="mt-8"
        :vocabulary="$route.params.slug"
      />
    </div>
  </div>
</template>

<script>
import FormTerm from '~/components/form/FormTerm.vue'

export default {
  components: { FormTerm },
  layout: 'admin',
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: term } = await $axios.get(`/terms/${params.id}`)
    if (!term) {
      return error({ statusCode: 404 })
    }

    return {
      term
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
