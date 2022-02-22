<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Territoires', link: $store.getters.contextRole === 'admin' ? '/admin/contenus/territoires' : null },
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
import FormTerritoire from '@/components/form/FormTerritoire'

export default {
  components: { FormTerritoire },
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'responsable_territoire'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }
    const { data: territoire } = await $axios.get(`/territoires/${params.id}`)
    if (!territoire) {
      return error({ statusCode: 404 })
    }
    if (store.getters.contextRole == 'responsable_territoire') {
      if (store.getters.contextableId != territoire.id || territoire.state != 'validated') {
        return error({ statusCode: 403 })
      }
    }
    return {
      territoire
    }
  },
  methods: {

  }
}
</script>
