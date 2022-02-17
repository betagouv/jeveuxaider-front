<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Réseaux', link: `/admin/contenus/reseaux` },
        { label: reseau.name, link: `/admin/contenus/reseaux/${reseau.id}` }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="reseau.name">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <Button size="xl" variant="green" @click.native="$refs.form.handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormReseau
        ref="form"
        :reseau="reseau"
        class="my-8"
      />
    </div>
  </div>
</template>

<script>
import FormReseau from '~/components/form/FormReseau'

export default {
  components: { FormReseau },
  layout: 'admin',
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: reseau } = await $axios.get(`/reseaux/${params.id}`)
    if (!reseau) {
      return error({ statusCode: 404 })
    }
    return {
      reseau
    }
  },
  methods: {

  }
}
</script>
