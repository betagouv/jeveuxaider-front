<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Taxonomies' },
        { label: 'Compétences', link: `/admin/taxonomies/competences` },
        { label: term.name }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="term.name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" @click.native="handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormTerm
        ref="form"
        :term="term"
        class="mt-8"
        vocabulary="skills"
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

  methods: {
    handleSubmit () {
      this.$refs.form.handleSubmit()
    }

  }
}
</script>
