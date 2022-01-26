<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Territoires', link: `/admin/contenus/territoires` },
        { label: territoire.name }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="territoire.name">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <Button size="xl" variant="green" @click.native="$refs.form.handleSubmit()">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormTerritoire
        ref="form"
        :territoire="territoire"
        class="my-8"
      />
    </div>
  </div>
</template>

<script>
import FormTerritoire from '~/components/form/FormTerritoire'

export default {
  components: { FormTerritoire },
  layout: 'admin',
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: territoire } = await $axios.get(`/territoires/${params.id}`)
    if (!territoire) {
      return error({ statusCode: 404 })
    }
    return {
      territoire
    }
  },
  methods: {

  }
}
</script>
