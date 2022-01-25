<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Thématiques', link: `/admin/contenus/thematiques` },
        { label: thematique.name }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="thematique.name">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" @click.native="handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormThematique
        ref="form"
        :thematique="thematique"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormThematique from '~/components/form/FormThematique.vue'

export default {
  components: { FormThematique },
  layout: 'admin',
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: thematique } = await $axios.get(`/thematique/${params.id}`)
    if (!thematique) {
      return error({ statusCode: 404 })
    }

    return {
      thematique
    }
  },

  methods: {
    handleSubmit () {
      this.$refs.form.handleSubmit()
    }

  }
}
</script>
