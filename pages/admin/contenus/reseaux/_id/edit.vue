<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Réseaux', link: $store.getters.contextRole === 'admin' ? `/admin/contenus/reseaux` : null },
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
  async asyncData ({ $axios, params, error, store }) {
    if (
      ![
        'admin',
        'tete_de_reseau'
      ].includes(store.getters.contextRole)
    ) {
      return error({ statusCode: 403 })
    }

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
