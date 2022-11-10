<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Taxonomies' },
        { text: 'Tous les termes', to: `/admin/taxonomies/${$route.params.slug}` },
        { text: term.name }
      ]"
    />
    <div class="pb-6">
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
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormTerm, Breadcrumb },
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
